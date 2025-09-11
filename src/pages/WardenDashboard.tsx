import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BuildingIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeaderCard from "@/components/DashboardHeaderCard";

const WardenDashboard = () => {
  const { profile, loading } = useUserProfile();

  const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Warden";

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        description="Overview of your hostel management."
        content="Efficiently manage hostel residents, gatepass requests, and facilities."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hostel</CardTitle>
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Your assigned hostel</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WardenDashboard;