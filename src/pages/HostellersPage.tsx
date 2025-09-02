import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { dummyHODs } from "@/data/hods";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Home, Clock, History, User } from "lucide-react";

const navItems = [
  { href: "/hod-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hostellers", label: "Hostellers", icon: Home },
  { href: "/pending-requests", label: "Pending Request", icon: Clock },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

const HostellersPage = () => {
  const currentUser = dummyHODs[0];
  return (
    <DashboardLayout userName={currentUser.name} navItems={navItems}>
      <Card>
        <CardHeader>
          <CardTitle>Hostellers</CardTitle>
          <CardDescription>View and manage all hostellers.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hosteller management content will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default HostellersPage;