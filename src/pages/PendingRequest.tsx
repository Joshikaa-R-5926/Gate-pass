import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X, FileTextIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type GatepassRequest = {
  id: string;
  student_name: string;
  reason: string;
  leave_start_date: string;
  leave_end_date: string;
  status: 'pending_tutor_approval' | 'pending_hod_approval' | 'pending_warden_approval' | 'approved' | 'rejected' | 'cancelled';
  created_at: string;
};

const PendingRequest = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useUserProfile();
  const [requests, setRequests] = useState<GatepassRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  const fetchPendingRequests = useCallback(async () => {
    if (!profile || !profile.role) return;

    setRequestsLoading(true);
    let query = supabase.from('gatepass_requests').select('*');

    switch (profile.role) {
      case 'Tutor':
        query = query.eq('status', 'pending_tutor_approval');
        break;
      case 'HOD':
        query = query.eq('status', 'pending_hod_approval');
        break;
      case 'Warden':
        query = query.eq('status', 'pending_warden_approval');
        break;
      default:
        query = query.in('status', ['pending_tutor_approval', 'pending_hod_approval', 'pending_warden_approval']);
    }

    const { data, error } = await query.order('created_at', { ascending: true });

    if (error) {
      showError("Failed to fetch pending requests.");
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data as GatepassRequest[]);
    }
    setRequestsLoading(false);
  }, [profile]);

  useEffect(() => {
    if (profile) {
      fetchPendingRequests();
    }
  }, [profile, fetchPendingRequests]);

  const handleUpdateRequest = async (requestId: string, newStatus: GatepassRequest['status']) => {
    const toastId = showLoading("Updating request status...");
    const { error } = await supabase
      .from('gatepass_requests')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', requestId);

    dismissToast(toastId);
    if (error) {
      showError(`Failed to update request: ${error.message}`);
    } else {
      showSuccess("Request status updated successfully!");
      fetchPendingRequests();
    }
  };

  const getLeaveDurationInDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected':
      case 'cancelled': return 'destructive';
      case 'pending_tutor_approval':
      case 'pending_hod_approval':
      case 'pending_warden_approval': return 'secondary';
      default: return 'outline';
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Skeleton className="w-full max-w-4xl h-96" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <Card className="w-full max-w-5xl bg-white/80 dark:bg-black/50 backdrop-blur-sm">
        <CardHeader className="relative text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <CardTitle className="text-3xl">Pending Gatepass Requests</CardTitle>
          <CardDescription>Review and process new requests from students.</CardDescription>
        </CardHeader>
        <CardContent>
          {requestsLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : requests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Leave Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => {
                  const duration = getLeaveDurationInDays(request.leave_start_date, request.leave_end_date);
                  let approveAction: () => void = () => {};
                  let approveButtonText = "Approve";
                  let approveDialogText = "This will advance the request to the next approval stage. Are you sure?";

                  if (profile?.role === 'Tutor') {
                    if (duration > 2) {
                      approveAction = () => handleUpdateRequest(request.id, 'pending_hod_approval');
                      approveButtonText = "Forward to HOD";
                      approveDialogText = "This leave is longer than 2 days and will be forwarded to the HOD for approval.";
                    } else {
                      approveAction = () => handleUpdateRequest(request.id, 'pending_warden_approval');
                    }
                  } else if (profile?.role === 'HOD') {
                    approveAction = () => handleUpdateRequest(request.id, 'pending_warden_approval');
                  } else if (profile?.role === 'Warden') {
                    approveAction = () => handleUpdateRequest(request.id, 'approved');
                  }

                  return (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.student_name}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{new Date(request.leave_start_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(request.leave_end_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(request.status)}>
                          {request.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">
                              <Check className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Approve Request?</AlertDialogTitle>
                              <AlertDialogDescription>
                                {approveDialogText}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={approveAction}>
                                {approveButtonText}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700">
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reject Request?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone and will permanently reject the request.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleUpdateRequest(request.id, 'rejected')} className="bg-red-600 hover:bg-red-700">
                                Reject
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No Pending Requests</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">There are no requests awaiting your action.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingRequest;