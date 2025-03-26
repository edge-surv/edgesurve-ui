"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { API } from "@/services";
import { useEffect, useState } from "react";
import { Notifications } from "@/interfaces";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await API.get("/notifications");
        const notificationsData = response.data.notifications;
        setNotifications(notificationsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch notifications",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">Notifications</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {notifications.length} Notifications
              </Badge>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <BellOff className="h-3 w-3 text-red-500" />
                Mute All
              </Button>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="w-full">
                  <CardContent className="flex items-start gap-2 p-3">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-2 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : notifications.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-8 text-center bg-muted/20 rounded-lg border border-dashed">
                <Bell className="h-10 w-10 text-amber-500 mb-3" />
                <h3 className="text-base font-medium mb-1">No Notifications</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  You don't have any notifications at the moment. When you
                  receive notifications, they will appear here.
                </p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <Card
                  key={notification.id}
                  className="w-full hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {notification.objects.join(", ")}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(
                          `${notification.date} ${notification.time}`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground">
                      {new Date(notification.date).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
