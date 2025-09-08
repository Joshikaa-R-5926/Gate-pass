import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ManageWardens = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <Card className="w-full max-w-2xl bg-white/80 dark:bg-black/50 backdrop-blur-sm">
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
          <CardTitle className="text-3xl">Manage Wardens</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            This page will allow administrators to manage warden accounts and data.
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400">
            (Content for warden management will be added here.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageWardens;