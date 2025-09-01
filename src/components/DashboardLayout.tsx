import React from "react";
import ModernSidebar from "./ModernSidebar";
import { Admin, dummyAdmins } from "@/data/admins";
import { LayoutGrid, Clock, History, User, Shield } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const adminNavItems: NavItem[] = [
  { href: "/admin-dashboard", label: "Admin Dashboard", icon: Shield },
  { href: "/admin-dashboard/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin-dashboard/pending", label: "Pending Request", icon: Clock },
  { href: "/admin-dashboard/history", label: "Request History", icon: History },
  { href: "/admin-dashboard/profile", label: "Profile", icon: User },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const currentUser: Admin = dummyAdmins[0];

  return (
    <div className="flex bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 min-h-screen">
      <ModernSidebar navItems={adminNavItems} userName={currentUser.name} userEmail={currentUser.email} />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;