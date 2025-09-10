import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import DashboardLayout from '@/components/DashboardLayout';
import { getNavItemsByRole } from '@/lib/navItems';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardRoutes = () => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email || 'User';
  const navItems = getNavItemsByRole(profile.role || '');

  return (
    <DashboardLayout userName={userName} navItems={navItems}>
      <Outlet />
    </DashboardLayout>
  );
};

export default DashboardRoutes;