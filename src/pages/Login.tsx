import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { showError } from "@/utils/toast";
import { dummyStudents } from "@/data/students";
import { dummyTutors } from "@/data/tutors";
import { dummyHODs } from "@/data/hods";
import { dummyWardens } from "@/data/wardens";
import { dummyAdmins } from "@/data/admins";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dummyStudents.some((user) => user.email === email)) {
      navigate("/student-dashboard");
    } else if (dummyTutors.some((user) => user.email === email)) {
      navigate("/tutor-dashboard");
    } else if (dummyHODs.some((user) => user.email === email)) {
      navigate("/hod-dashboard");
    } else if (dummyWardens.some((user) => user.email === email)) {
      navigate("/warden-dashboard");
    } else if (dummyAdmins.some((user) => user.email === email)) {
      navigate("/admin-dashboard");
    } else {
      showError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;