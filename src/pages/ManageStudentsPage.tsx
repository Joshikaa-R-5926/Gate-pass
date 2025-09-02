import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { dummyAdmins } from "@/data/admins";
import { dummyStudents } from "@/data/students";
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

const ManageStudentsPage = () => {
  const currentUser = dummyAdmins[0];

  return (
    <DashboardLayout userName={currentUser.name} navItems={navItems}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Students</CardTitle>
          <CardDescription>View and manage all students in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Courses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.courses.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ManageStudentsPage;