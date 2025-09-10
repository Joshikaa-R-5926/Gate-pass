import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, LucideIcon, LogOut, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface ModernSidebarProps {
  userName: string;
  navItems: NavItem[];
  role: string;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ userName, navItems, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-[280px] flex flex-col h-screen bg-gray-900 text-white p-4 rounded-r-2xl shadow-lg z-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Shield size={24} />
        </div>
        <span className="font-bold text-xl whitespace-nowrap">
          Dashboard
        </span>
      </div>

      {role.toLowerCase() === 'student' && (
        <div className="mb-4">
          <Link to="/student-dashboard">
            <Button className="w-full justify-start gap-3 text-lg py-6">
              <PlusCircle size={22} />
              New Request
            </Button>
          </Link>
        </div>
      )}

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-colors",
                "hover:bg-gray-800",
                isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span className="font-semibold whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-700 pt-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=0D8ABC&color=fff`} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-xs text-gray-400">Welcome back!</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-4 p-3 rounded-lg transition-colors w-full",
            "text-red-400 hover:bg-red-900/50 hover:text-red-300"
          )}
        >
          <LogOut size={20} />
          <span className="font-semibold whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default ModernSidebar;