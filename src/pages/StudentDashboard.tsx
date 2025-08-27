import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Student Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Welcome, Student! Here you can view your academic progress, upcoming assignments, and other student-specific information.
          </p>
          <div className="flex justify-center space-x-4">
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

export default StudentDashboard;