import React from "react";
import ModernSidebar, { NavItem } from "./ModernSidebar";
import { ThemeToggle } from "./ThemeToggle";
import NotificationBell from "./NotificationBell";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  navItems: NavItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userName, navItems }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950">
      <ModernSidebar userName={userName} navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-end items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <NotificationBell />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;