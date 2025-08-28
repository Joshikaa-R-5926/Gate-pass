import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyTutors, Tutor } from "@/data/tutors";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, UsersIcon, CalendarIcon, MessageSquareIcon, BookIcon, StarIcon } from "lucide-react";

const tutorNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/tutor-dashboard", label: "Dashboard", icon: UsersIcon },
  { href: "/tutor-dashboard/students", label: "My Students", icon: UsersIcon },
  { href: "/tutor-dashboard/schedule", label: "Schedule", icon: CalendarIcon },
  { href: "/tutor-dashboard/messages", label: "Messages", icon: MessageSquareIcon },
  { href: "/tutor-dashboard/resources", label: "Resources", icon: BookIcon },
];

const TutorDashboard = () => {
  const currentUser = dummyTutors[0]; // Assuming the first tutor is the current user

  return (
    <Sidebar navItems={tutorNavItems} title="Tutor Portal" userName={currentUser.name} userEmail={currentUser.email}>
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        {/* Welcome Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">Welcome, {currentUser.name}!</CardTitle>
            <CardDescription>Here's an overview of your tutoring activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Manage your students, schedule, and resources efficiently.
            </p>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.studentsCount}</div>
              <p className="text-xs text-muted-foreground">Currently assigned students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <StarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.rating} / 5.0</div>
              <p className="text-xs text-muted-foreground">Based on student feedback</p>
            </CardContent>
          </Card>
          <Card>
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
    </Sidebar>
  );
};

export default TutorDashboard;