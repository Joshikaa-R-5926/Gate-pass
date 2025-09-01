import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PendingRequests = () => {
  return (
    <DashboardLayout>
      <Card className="bg-white/30 backdrop-blur-sm border-none">
        <CardHeader>
          <CardTitle className="text-3xl text-gray-900 dark:text-white">Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            This page will display all pending requests.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PendingRequests;