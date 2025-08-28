import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyAdmins, Admin } from "@/data/admins";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, ShieldCheckIcon, UsersIcon, SettingsIcon } from "lucide-react";

const adminNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/admin-dashboard", label: "Dashboard", icon: ShieldCheckIcon },
  { href: "/admin-dashboard/users", label: "Manage Users", icon: UsersIcon },
  { href: "/admin-dashboard/system", label: "System Settings", icon: SettingsIcon },
];

const AdminDashboard = () => {
  return (
    <Sidebar navItems={adminNavItems} title="Admin Portal">
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Admin Dashboard</CardTitle>
            <CardDescription className="text-center">Overview of Admin information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Welcome, Admin! Here you can manage users and system settings.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">Your Information</h2>
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
                {dummyAdmins.map((admin: Admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.role}</TableCell>
                    <TableCell>{new Date(admin.lastActivity).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-center space-x-4 mt-8">
              <Button asChild>
                <Link to="/">Go to Home</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/login">Go to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
};

export default AdminDashboard;