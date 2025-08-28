import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyStudents, Student } from "@/data/students";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, BookOpenIcon, GraduationCapIcon, CalendarIcon, UsersIcon, CalendarDaysIcon, ChevronLeft } from "lucide-react"; // Import ChevronLeft

const studentNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/student-dashboard", label: "Dashboard", icon: GraduationCapIcon },
  { href: "/student-dashboard/courses", label: "My Courses", icon: BookOpenIcon },
  { href: "/student-dashboard/grades", label: "Grades", icon: CalendarIcon },
  { href: "/student-dashboard/schedule", label: "Schedule", icon: CalendarIcon },
  { href: "/student-dashboard/tutors", label: "Find Tutors", icon: UsersIcon },
];

const StudentDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const currentUser = dummyStudents[0]; // Assuming the first student is the current user

  return (
    <Sidebar navItems={studentNavItems} title="Student Portal" userName={currentUser.name} userEmail={currentUser.email}>
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        {/* Welcome Section */}
        <Card className="w-full">
          <CardHeader className="relative"> {/* Add relative positioning */}
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
            <CardDescription className="text-center">Here's an overview of your academic journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Stay on top of your courses, grades, and upcoming activities.
            </p>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Grade</CardTitle>
              <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.grade}</div>
              <p className="text-xs text-muted-foreground">Based on your latest assessments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.courses.length}</div>
              <p className="text-xs text-muted-foreground">Total active courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
              <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date(currentUser.lastLogin).toLocaleDateString()}</div>
              <p className="text-xs text-muted-foreground">{new Date(currentUser.lastLogin).toLocaleTimeString()}</p>
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
                  <TableHead>Grade</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={currentUser.id}>
                  <TableCell className="font-medium">{currentUser.name}</TableCell>
                  <TableCell>{currentUser.email}</TableCell>
                  <TableCell>{currentUser.grade}</TableCell>
                  <TableCell>{currentUser.courses.join(", ")}</TableCell>
                  <TableCell>{new Date(currentUser.lastLogin).toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
};

export default StudentDashboard;