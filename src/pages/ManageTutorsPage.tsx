import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { dummyAdmins } from "@/data/admins";
import { dummyTutors } from "@/data/tutors";
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

const ManageTutorsPage = () => {
  const currentUser = dummyAdmins[0];

  return (
    <DashboardLayout userName={currentUser.name} navItems={navItems}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Tutors</CardTitle>
          <CardDescription>View and manage all tutors in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyTutors.map((tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell>{tutor.name}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>{tutor.subjects.join(", ")}</TableCell>
                  <TableCell>{tutor.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ManageTutorsPage;