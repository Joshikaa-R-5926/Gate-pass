import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const NotificationBell = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have no new notifications.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="text-center text-sm text-muted-foreground py-4">
              No new notifications
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;