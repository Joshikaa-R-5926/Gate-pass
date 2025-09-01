import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyAdmins, Admin } from "@/data/admins";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, ShieldCheckIcon, UsersIcon, SettingsIcon, ChevronLeft, ClockIcon } from "lucide-react";

const adminNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/admin-dashboard", label: "Dashboard", icon: ShieldCheckIcon },
  { href: "/admin-dashboard/users", label: "Manage Users", icon: UsersIcon },
  { href: "/admin-dashboard/system", label: "System Settings", icon: SettingsIcon },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = dummyAdmins[0]; // Assuming the first admin is the current user

  return (
    <Sidebar navItems={adminNavItems} title="Admin Portal" userName={currentUser.name} userEmail={currentUser.email}>
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        {/* Welcome Section */}
        <Card className="w-full">
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

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Role</CardTitle>
              <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.role}</div>
              <p className="text-xs text-muted-foreground">Your current administrative role</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date(currentUser.lastActivity).toLocaleDateString()}</div>
              <p className="text-xs text-muted-foreground">{new Date(currentUser.lastActivity).toLocaleTimeString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50+</div> {/* Dummy data */}
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </CardContent>
          </Card>
        </div>

        {/* Your Information Table */}
        <Card className="w-full">
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
    </Sidebar>
  );
};

export default AdminDashboard;