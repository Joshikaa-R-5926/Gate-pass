import {
  Shield,
  UsersIcon,
  UserCog,
  ClipboardList,
  Building,
  Clock,
  History,
  User,
  LayoutDashboard,
  Home,
  LucideIcon,
  PlusCircle,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const getNavItemsByRole = (role: string): NavItem[] => {
  const baseItems: NavItem[] = [
    { href: "/profile", label: "Profile", icon: User },
  ];

  const studentItems: NavItem[] = [
    { href: "/new-request", label: "New Request", icon: PlusCircle },
    { href: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/request-history", label: "Request History", icon: History },
    ...baseItems,
  ];

  const tutorItems: NavItem[] = [
    { href: "/tutor-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/hostellers", label: "Hostellers", icon: Home },
    { href: "/pending-request", label: "Pending Request", icon: Clock },
    { href: "/request-history", label: "Request History", icon: History },
    ...baseItems,
  ];

  const hodItems: NavItem[] = [
    { href: "/hod-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/hostellers", label: "Hostellers", icon: Home },
    { href: "/pending-request", label: "Pending Request", icon: Clock },
    { href: "/request-history", label: "Request History", icon: History },
    ...baseItems,
  ];

  const wardenItems: NavItem[] = [
    { href: "/warden-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/pending-request", label: "Pending Request", icon: Clock },
    { href: "/request-history", label: "Request History", icon: History },
    ...baseItems,
  ];

  const adminItems: NavItem[] = [
    { href: "/admin-dashboard", label: "Admin Dashboard", icon: Shield },
    { href: "/manage-students", label: "Manage Students", icon: UsersIcon },
    { href: "/manage-hods", label: "Manage HODs", icon: UserCog },
    { href: "/manage-tutors", label: "Manage Tutors", icon: ClipboardList },
    { href: "/manage-wardens", label: "Manage Wardens", icon: Building },
    { href: "/pending-request", label: "Pending Request", icon: Clock },
    { href: "/request-history", label: "Request History", icon: History },
    ...baseItems,
  ];

  switch (role?.toLowerCase()) {
    case "student":
      return studentItems;
    case "tutor":
      return tutorItems;
    case "hod":
      return hodItems;
    case "warden":
      return wardenItems;
    case "admin":
      return adminItems;
    default:
      return [];
  }
};