import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface DashboardHeaderCardProps {
  userName: string;
  description: string;
  content: string;
}

const DashboardHeaderCard: React.FC<DashboardHeaderCardProps> = ({ userName, description, content }) => {
  const navigate = useNavigate();

  return (
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
        <CardTitle className="text-3xl text-center">Welcome, {userName}!</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardHeaderCard;