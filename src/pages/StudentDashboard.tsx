import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileTextIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import GatepassRequestForm from "@/components/GatepassRequestForm";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { showError } from "@/utils/toast";
import DashboardHeaderCard from "@/components/DashboardHeaderCard";

interface GatepassRequest {
  id: string;
  reason: string;
  leave_start_date: string;
  leave_end_date: string;
  status: string;
  created_at: string;
}

const StudentDashboard = () => {
  const { profile, loading: profileLoading } = useUserProfile();
  const [requests, setRequests] = useState<GatepassRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Student";

  const fetchRequests = useCallback(async () => {
    if (!profile) return;
    setRequestsLoading(true);
    const { data, error } = await supabase
      .from('gatepass_requests')
      .select('*')
      .eq('student_id', profile.id)
      .order('created_at', { ascending: false });

    if (error) {
      showError("Failed to fetch your requests.");
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data as GatepassRequest[]);
    }
    setRequestsLoading(false);
  }, [profile]);

  useEffect(() => {
    if (profile) {
      fetchRequests();
    }
  }, [profile, fetchRequests]);

  if (profileLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
      case 'cancelled':
        return 'destructive';
      case 'pending_tutor_approval':
      case 'pending_hod_approval':
      case 'pending_warden_approval':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeaderCard
        userName={userName}
        description="Here's an overview of your academic journey."
        content="Stay on top of your courses, grades, and upcoming activities."
      />

      <GatepassRequestForm profile={profile} onFormSubmit={fetchRequests} />

      <Card className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
          <CardDescription>Here is a list of your recent gatepass requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {requestsLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : requests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reason</TableHead>
                  <TableHead>Leave Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.reason}</TableCell>
                    <TableCell>{new Date(request.leave_start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(request.leave_end_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No requests found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Submit a new request using the form above.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Detailed Information</CardTitle>
          <CardDescription>A comprehensive look at your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{userName}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;