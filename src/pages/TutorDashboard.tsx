import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyTutors, Tutor } from "@/data/tutors";

const TutorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Tutor Dashboard</CardTitle>
          <CardDescription className="text-center">Overview of tutor information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Welcome, Tutor! This is your dedicated space to manage your students, view schedules, and access teaching resources.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">Your Information</h2>
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
              {dummyTutors.map((tutor: Tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell className="font-medium">{tutor.name}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>{tutor.subjects.join(", ")}</TableCell>
                  <TableCell>{tutor.rating}</TableCell>
                  <TableCell>{tutor.studentsCount}</TableCell>
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
  );
};

export default TutorDashboard;