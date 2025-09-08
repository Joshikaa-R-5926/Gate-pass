import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, UserCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

const Profile: React.FC<ProfileProps> = ({ userName = "User", userEmail = "user@example.com", userRole = "General" }) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <Card className="w-full max-w-md bg-white/80 dark:bg-black/50 backdrop-blur-sm">
        <CardHeader className="relative text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <CardTitle className="text-3xl">User Profile</CardTitle>
          <CardDescription>View and manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=0D8ABC&color=fff`} />
            <AvatarFallback className="text-4xl">{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userName}</h2>
            <p className="text-md text-gray-700 dark:text-gray-300">{userEmail}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Role: {userRole}</p>
          </div>
          <Button className="w-full mt-4">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;