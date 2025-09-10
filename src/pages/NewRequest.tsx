import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import GatepassRequestForm from "@/components/GatepassRequestForm";

const NewRequest = () => {
  const navigate = useNavigate();
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <GatepassRequestForm profile={profile} onFormSubmit={() => navigate('/student-dashboard')} />
    </div>
  );
};

export default NewRequest;