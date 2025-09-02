import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyTutors } from "@/data/tutors";
import DashboardLayout from "@/components/DashboardLayout";
import { UsersIcon, BookIcon, StarIcon, ChevronLeft, LayoutDashboard, Clock, History, User, Home } from "lucide-react";

const navItems = [
  { href: "/tutor-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hostellers", label: "Hostellers", icon: Home },
  { href: "/pending-request", label: "Pending Request", icon: Clock },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

const TutorDashboard = () => {
  const navigate = useNavigate();
  const currentUser = dummyTutors[0];

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
            <CardDescription className="text-center">Here's an overview of your tutoring activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Manage your students, schedule, and resources efficiently.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.studentsCount}</div>
              <p className="text-xs text-muted-foreground">Currently assigned students</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <StarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.rating} / 5.0</div>
              <p className="text-xs text-muted-foreground">Based on student feedback</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects Taught</CardTitle>
              <BookIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.subjects.length}</div>
              <p className="text-xs text-muted-foreground">{currentUser.subjects.join(", ")}</p>
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
                  <TableHead>Subjects</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={currentUser.id}>
                  <TableCell className="font-medium">{currentUser.name}</TableCell>
                  <TableCell>{currentUser.email}</TableCell>
                  <TableCell>{currentUser.subjects.join(", ")}</TableCell>
                  <TableCell>{currentUser.rating}</TableCell>
                  <TableCell>{currentUser.studentsCount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TutorDashboard;