import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyHODs, HOD } from "@/data/hods";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, Building2Icon, UsersIcon, SettingsIcon, ChevronLeft } from "lucide-react"; // Import ChevronLeft icon

const hodNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/hod-dashboard", label: "Dashboard", icon: Building2Icon },
  { href: "/hod-dashboard/students", label: "Manage Students", icon: UsersIcon },
  { href: "/hod-dashboard/settings", label: "Settings", icon: SettingsIcon },
];

const HodDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Sidebar navItems={hodNavItems} title="HOD Portal">
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader className="relative text-center"> {/* Added relative for positioning */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)} // Go back on click
              className="absolute left-4 top-4" // Position top-left
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <CardTitle className="text-3xl">HOD Dashboard</CardTitle>
            <CardDescription>Overview of Head of Department information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Welcome, Head of Department! Here you can manage your department's students and settings.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">Your Information</h2>
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
                {dummyHODs.map((hod: HOD) => (
                  <TableRow key={hod.id}>
                    <TableCell className="font-medium">{hod.name}</TableCell>
                    <TableCell>{hod.email}</TableCell>
                    <TableCell>{hod.department}</TableCell>
                    <TableCell>{hod.studentsManaged}</TableCell>
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

export default HodDashboard;