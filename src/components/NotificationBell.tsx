import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const NotificationBell = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center" variant="destructive">
            3
          </Badge>
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have 3 unread messages.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  New Gatepass Request
                </p>
                <p className="text-sm text-muted-foreground">
                  Alice Smith has requested a gatepass for this weekend.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Request Approved
                </p>
                <p className="text-sm text-muted-foreground">
                  Your request for the library visit has been approved.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  System Maintenance
                </p>
                <p className="text-sm text-muted-foreground">
                  The portal will be down for maintenance tonight at 11 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;