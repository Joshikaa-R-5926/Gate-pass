import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyStudents, Student } from "@/data/students";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, BookOpenIcon, GraduationCapIcon, CalendarIcon, UsersIcon } from "lucide-react";

const studentNavItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/student-dashboard", label: "Dashboard", icon: GraduationCapIcon },
  { href: "/student-dashboard/courses", label: "My Courses", icon: BookOpenIcon },
  { href: "/student-dashboard/grades", label: "Grades", icon: CalendarIcon },
  { href: "/student-dashboard/schedule", label: "Schedule", icon: CalendarIcon },
  { href: "/student-dashboard/tutors", label: "Find Tutors", icon: UsersIcon },
];

const StudentDashboard = () => {
  const currentUser = dummyStudents[0]; // Assuming the first student is the current user

  return (
    <Sidebar navItems={studentNavItems} title="Student Portal" userName={currentUser.name} userEmail={currentUser.email}>
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Student Dashboard</CardTitle>
            <CardDescription className="text-center">Overview of student information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Welcome, Student! Here you can view your academic progress, upcoming assignments, and other student-specific information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">Your Information</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>My Request</TableHead> {/* Changed from Grade to My Request */}
                  <TableHead>Courses</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyStudents.map((student: Student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.grade}</TableCell> {/* The data displayed remains the student's grade */}
                    <TableCell>{student.courses.join(", ")}</TableCell>
                    <TableCell>{new Date(student.lastLogin).toLocaleString()}</TableCell>
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

export default StudentDashboard;