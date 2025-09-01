import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Search, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface ModernSidebarProps {
  userName: string;
  navItems: NavItem[];
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ userName, navItems }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      animate={{ width: isExpanded ? "280px" : "80px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-screen bg-gray-900 text-white p-4 rounded-r-2xl shadow-lg z-20"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 z-10 transition-transform duration-300 hover:scale-110"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Shield size={24} />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-xl whitespace-nowrap"
            >
              Dashboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder={isExpanded ? "Search..." : ""}
          className={cn(
            "bg-gray-800 border-gray-700 rounded-lg text-white focus:ring-blue-500 transition-all duration-300",
            isExpanded ? "pl-10" : "pl-2 text-center w-full"
          )}
        />
      </div>

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
                isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white",
                !isExpanded && "justify-center"
              )}
              title={isExpanded ? "" : item.label}
            >
              <item.icon size={20} />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="font-semibold whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=0D8ABC&color=fff`} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap"
              >
                <p className="font-semibold text-sm">{userName}</p>
                <p className="text-xs text-gray-400">Welcome back!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernSidebar;