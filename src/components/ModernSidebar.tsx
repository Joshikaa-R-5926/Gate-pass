import React, { useState, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronFirst, ChevronLast, MoreVertical, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface ModernSidebarProps {
  navItems: NavItem[];
  userName: string;
  userEmail: string;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ navItems, userName, userEmail }) => {
  const [expanded, setExpanded] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="h-screen sticky top-0">
      <nav className="h-full flex flex-col bg-gray-900 border-r border-gray-700 shadow-sm rounded-r-2xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: expanded ? 1 : 0, width: expanded ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden transition-all font-bold text-xl text-white ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Dashboard
          </motion.span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <div className={`relative flex items-center py-2 px-3 my-2 font-medium rounded-md cursor-pointer transition-colors group bg-gray-800 border border-gray-700 mx-4`}>
            <Search className="text-gray-400" size={20} />
            <AnimatePresence>
              {expanded && (
                <motion.input
                  initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                  animate={{ width: "100%", opacity: 1, marginLeft: 8 }}
                  exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
                />
              )}
            </AnimatePresence>
          </div>

          <ul className="flex-1 px-3">
            {navItems.map((item, index) => (
              <SidebarItem key={index} icon={<item.icon size={20} />} text={item.label} href={item.href} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t border-gray-700 flex p-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=0D8ABC&color=fff`} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white">{userName}</h4>
              <span className="text-xs text-gray-400">{userEmail}</span>
            </div>
            <MoreVertical size={20} className="text-white" />
          </div>
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

function SidebarItem({ icon, text, href }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext)!;
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-700 text-gray-400 hover:text-white"
          }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-gray-800 text-white text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

export default ModernSidebar;