import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
}

interface SidebarProps {
  navItems: NavItem[];
  children: React.ReactNode;
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, children, title }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const NavLinks = (
    <nav className="grid items-start gap-2 px-2 py-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary",
            "hover:bg-sidebar-accent dark:hover:bg-sidebar-accent"
          )}
          onClick={() => setIsOpen(false)} // Close sidebar on link click
        >
          {item.icon && React.createElement(item.icon, { className: "h-4 w-4" })}
          {item.label}
        </Link>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <h2 className="text-xl font-semibold p-4">{title}</h2>
              <ScrollArea className="h-[calc(100vh-80px)]">
                {NavLinks}
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-sidebar md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="text-sidebar-primary text-lg">{title}</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            {NavLinks}
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;