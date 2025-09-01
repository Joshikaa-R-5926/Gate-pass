import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GenericDashboard = () => {
  return (
    <DashboardLayout>
      <Card className="bg-white/30 backdrop-blur-sm border-none">
        <CardHeader>
          <CardTitle className="text-3xl text-gray-900 dark:text-white">Generic Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            This is a generic dashboard overview page.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default GenericDashboard;