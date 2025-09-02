import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { dummyAdmins } from "@/data/admins";
import { dummyHODs } from "@/data/hods";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, UsersIcon, UserCog, ClipboardList, Building, ClockIcon, History, User } from "lucide-react";

const navItems = [
  { href: "/admin-dashboard", label: "Admin Dashboard", icon: Shield },
  { href: "/manage-students", label: "Manage Students", icon: UsersIcon },
  { href: "/manage-hods", label: "Manage HODs", icon: UserCog },
  { href: "/manage-tutors", label: "Manage Tutors", icon: ClipboardList },
  { href: "/manage-wardens", label: "Manage Wardens", icon: Building },
  { href: "/pending-requests", label: "Pending Request", icon: ClockIcon },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

const ManageHodsPage = () => {
  const currentUser = dummyAdmins[0];

  return (
    <DashboardLayout userName={currentUser.name} navItems={navItems}>
      <Card>
        <CardHeader>
          <CardTitle>Manage HODs</CardTitle>
          <CardDescription>View and manage all Heads of Department in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyHODs.map((hod) => (
                <TableRow key={hod.id}>
                  <TableCell>{hod.name}</TableCell>
                  <TableCell>{hod.email}</TableCell>
                  <TableCell>{hod.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ManageHodsPage;