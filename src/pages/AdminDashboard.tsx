import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <Card className="w-full bg-white/30 backdrop-blur-sm border-none">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-900 dark:text-white">Admin Dashboard</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">
              Welcome to the new administrative dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              This is the main content area. You can add your dashboard widgets and components here.
              The sidebar is now collapsible and styled according to the new design.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;