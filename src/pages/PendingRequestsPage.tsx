import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { dummyStudents } from "@/data/students";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Clock, History, User } from "lucide-react";

const navItems = [
  { href: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pending-requests", label: "Pending Request", icon: Clock },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

const PendingRequestsPage = () => {
  const currentUser = dummyStudents[0];
  return (
    <DashboardLayout userName={currentUser.name} navItems={navItems}>
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>View and manage your pending requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A list of pending requests will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PendingRequestsPage;