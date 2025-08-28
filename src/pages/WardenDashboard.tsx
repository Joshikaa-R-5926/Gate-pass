import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyWardens, Warden } from "@/data/wardens";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, BuildingIcon, UsersIcon, DoorOpenIcon, ChevronLeft } from "lucide-react"; // Import ChevronLeft icon

const wardenNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/warden-dashboard", label: "Dashboard", icon: BuildingIcon },
  { href: "/warden-dashboard/gatepass", label: "Gatepass Requests", icon: DoorOpenIcon },
  { href: "/warden-dashboard/residents", label: "Manage Residents", icon: UsersIcon },
];

const WardenDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Sidebar navItems={wardenNavItems} title="Warden Portal">
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
            <CardTitle className="text-3xl">Warden Dashboard</CardTitle>
            <CardDescription className="text-center">Overview of Warden information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Welcome, Warden! Here you can manage hostel gatepass requests and residents.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">Your Information</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Occupancy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyWardens.map((warden: Warden) => (
                  <TableRow key={warden.id}>
                    <TableCell className="font-medium">{warden.name}</TableCell>
                    <TableCell>{warden.email}</TableCell>
                    <TableCell>{warden.hostel}</TableCell>
                    <TableCell>{warden.capacity}</TableCell>
                    <TableCell>{warden.currentOccupancy}</TableCell>
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

export default WardenDashboard;