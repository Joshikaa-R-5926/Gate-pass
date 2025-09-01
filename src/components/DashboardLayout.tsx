import React from "react";
import ModernSidebar from "./ModernSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userName }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <ModernSidebar userName={userName} />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;