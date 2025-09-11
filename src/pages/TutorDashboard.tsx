import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeaderCard from "@/components/DashboardHeaderCard";

const TutorDashboard = () => {
  const { profile, loading } = useUserProfile();

  const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Tutor";

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
      <DashboardHeaderCard
        userName={userName}
        description="Here's an overview of your tutoring activities."
        content="Manage your students, schedule, and resources efficiently."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Currently assigned students</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Number of Boys</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Total male students</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Number of Girls</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Total female students</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorDashboard;