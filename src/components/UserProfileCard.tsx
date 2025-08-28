import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface UserProfileCardProps {
  name: string;
  email: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, email }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="mx-2 my-4 bg-sidebar-accent dark:bg-sidebar-accent-foreground border-sidebar-border">
      <CardContent className="flex items-center p-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-semibold text-sidebar-foreground text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;