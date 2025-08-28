import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyHODs, HOD } from "@/data/hods";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, Building2Icon, UsersIcon, SettingsIcon, ChevronLeft, UserCogIcon } from "lucide-react";

const hodNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/hod-dashboard", label: "Dashboard", icon: Building2Icon },
  { href: "/hod-dashboard/students", label: "Manage Students", icon: UsersIcon },
  { href: "/hod-dashboard/settings", label: "Settings", icon: SettingsIcon },
];

const HodDashboard = () => {
  const navigate = useNavigate();
  const currentUser = dummyHODs[0]; // Assuming the first HOD is the current user

  return (
    <Sidebar navItems={hodNavItems} title="HOD Portal" userName={currentUser.name} userEmail={currentUser.email}>
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
            <CardDescription className="text-center">Overview of your department's performance and management.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Effectively manage students, faculty, and departmental settings.
            </p>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department</CardTitle>
              <Building2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.department}</div>
              <p className="text-xs text-muted-foreground">Your assigned department</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Managed</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.studentsManaged}</div>
              <p className="text-xs text-muted-foreground">Total students in your department</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tutors Supervised</CardTitle>
              <UserCogIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div> {/* Dummy data */}
              <p className="text-xs text-muted-foreground">Active tutors under your supervision</p>
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
                  <TableHead>Department</TableHead>
                  <TableHead>Students Managed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={currentUser.id}>
                  <TableCell className="font-medium">{currentUser.name}</TableCell>
                  <TableCell>{currentUser.email}</TableCell>
                  <TableCell>{currentUser.department}</TableCell>
                  <TableCell>{currentUser.studentsManaged}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
};

export default HodDashboard;