import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { ChevronLeft, FileTextIcon, LayoutDashboard, Clock, History, User } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import GatepassRequestForm from "@/components/GatepassRequestForm";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { showError } from "@/utils/toast";

interface GatepassRequest {
  id: string;
  reason: string;
  leave_start_date: string;
  leave_end_date: string;
  status: string;
  created_at: string;
}

const navItems = [
  { href: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pending-request", label: "Pending Request", icon: Clock },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
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
      <DashboardLayout userName="Loading..." navItems={navItems}>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return null;
  }

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'warden_approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending_parent_otp':
      case 'parent_verified':
      case 'hod_approved':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout userName={userName} navItems={navItems}>
      <div className="flex flex-col gap-6">
        <Card className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <CardTitle className="text-3xl text-center">Welcome, {userName}!</CardTitle>
            <CardDescription className="text-center">Here's an overview of your academic journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Stay on top of your courses, grades, and upcoming activities.
            </p>
          </CardContent>
        </Card>

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
    </DashboardLayout>
  );
};

export default StudentDashboard;