import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyWardens } from "@/data/wardens";
import DashboardLayout from "@/components/DashboardLayout";
import { BuildingIcon, ChevronLeft, MaximizeIcon, BedIcon, LayoutDashboard, Clock, History, User } from "lucide-react";

const navItems = [
  { href: "/warden-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pending-requests", label: "Pending Request", icon: Clock },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

const WardenDashboard = () => {
  const navigate = useNavigate();
  const currentUser = dummyWardens[0];

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
            <CardDescription className="text-center">Overview of your hostel management.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Efficiently manage hostel residents, gatepass requests, and facilities.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hostel</CardTitle>
              <BuildingIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.hostel}</div>
              <p className="text-xs text-muted-foreground">Your assigned hostel</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <MaximizeIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.capacity}</div>
              <p className="text-xs text-muted-foreground">Maximum residents</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
              <BedIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.capacity - currentUser.currentOccupancy}</div>
              <p className="text-xs text-muted-foreground">Current vacant spots</p>
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
                  <TableHead>Hostel</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Occupancy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={currentUser.id}>
                  <TableCell className="font-medium">{currentUser.name}</TableCell>
                  <TableCell>{currentUser.email}</TableCell>
                  <TableCell>{currentUser.hostel}</TableCell>
                  <TableCell>{currentUser.capacity}</TableCell>
                  <TableCell>{currentUser.currentOccupancy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WardenDashboard;