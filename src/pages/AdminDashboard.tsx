import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyAdmins } from "@/data/admins";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  ShieldCheckIcon, 
  UsersIcon, 
  ChevronLeft, 
  ClockIcon, 
  Shield, 
  History, 
  User,
  GraduationCap,
  UserCog,
  UserSquare,
  Building
} from "lucide-react";

const navItems = [
  { href: "/admin-dashboard", label: "Admin Dashboard", icon: Shield },
  { href: "#", label: "Manage Students", icon: GraduationCap },
  { href: "#", label: "Manage HODs", icon: UserCog },
  { href: "#", label: "Manage Tutors", icon: UserSquare },
  { href: "#", label: "Manage Wardens", icon: Building },
  { href: "#", label: "Pending Request", icon: ClockIcon },
  { href: "#", label: "Request History", icon: History },
  { href: "#", label: "Profile", icon: User },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = dummyAdmins[0];

  return (
    <DashboardLayout userName={currentUser.name} navItems={navItems}>
      <div className="flex flex-col gap-6">
        <Card className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <CardTitle className="text-3xl text-center">Welcome, {currentUser.name}!</CardTitle>
            <CardDescription className="text-center">Overview of system administration and user management.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Manage users, roles, and system configurations with ease.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Role</CardTitle>
              <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.role}</div>
              <p className="text-xs text-muted-foreground">Your current administrative role</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date(currentUser.lastActivity).toLocaleDateString()}</div>
              <p className="text-xs text-muted-foreground">{new Date(currentUser.lastActivity).toLocaleTimeString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50+</div>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Your Detailed Information</CardTitle>
            <CardDescription>A comprehensive look at your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={currentUser.id}>
                  <TableCell className="font-medium">{currentUser.name}</TableCell>
                  <TableCell>{currentUser.email}</TableCell>
                  <TableCell>{currentUser.role}</TableCell>
                  <TableCell>{new Date(currentUser.lastActivity).toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;