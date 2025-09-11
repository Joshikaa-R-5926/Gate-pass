import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2Icon, UsersIcon, UserCogIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeaderCard from "@/components/DashboardHeaderCard";

const HodDashboard = () => {
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
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeaderCard
        userName={userName}
        description="Overview of your department's performance and management."
        content="Effectively manage students, faculty, and departmental settings."
      />

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
    </div>
  );
};

export default HodDashboard;