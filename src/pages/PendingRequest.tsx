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
  status: 'pending_parent_otp' | 'parent_verified' | 'hod_approved' | 'warden_approved' | 'rejected';
  created_at: string;
};

const PendingRequest = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useUserProfile();
  const [requests, setRequests] = useState<GatepassRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  const fetchPendingRequests = useCallback(async () => {
    setRequestsLoading(true);
    const { data, error } = await supabase
      .from('gatepass_requests')
      .select('*')
      .in('status', ['pending_parent_otp', 'parent_verified', 'hod_approved'])
      .order('created_at', { ascending: true });

    if (error) {
      showError("Failed to fetch pending requests.");
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data as GatepassRequest[]);
    }
    setRequestsLoading(false);
  }, []);

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
      fetchPendingRequests(); // Refresh the list
    }
  };

  const getNextApprovalStatus = (currentStatus: GatepassRequest['status']): GatepassRequest['status'] => {
    if (currentStatus === 'pending_parent_otp' || currentStatus === 'parent_verified') {
      return 'hod_approved';
    }
    if (currentStatus === 'hod_approved') {
      return 'warden_approved';
    }
    return currentStatus;
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'warden_approved': return 'default';
      case 'rejected': return 'destructive';
      case 'pending_parent_otp':
      case 'parent_verified':
      case 'hod_approved': return 'secondary';
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
                {requests.map((request) => (
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
                              This will advance the request to the next approval stage. Are you sure?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleUpdateRequest(request.id, getNextApprovalStatus(request.status))}>
                              Approve
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
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No Pending Requests</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">All student requests have been processed.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingRequest;