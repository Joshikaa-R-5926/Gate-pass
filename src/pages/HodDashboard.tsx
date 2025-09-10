import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2Icon, UsersIcon, ChevronLeft, UserCogIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";

const HodDashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useUserProfile();

  const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "HOD";

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
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
          <CardDescription className="text-center">Overview of your department's performance and management.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Effectively manage students, faculty, and departmental settings.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <Building2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Your assigned department</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Managed</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Total students in your department</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutors Supervised</CardTitle>
            <UserCogIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Active tutors under your supervision</p>
          </CardContent>
        </Card>
      </div>

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

export default HodDashboard;