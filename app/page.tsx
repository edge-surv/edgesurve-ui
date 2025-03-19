"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { CameraFeed } from "@/components/camera-feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Cameras, Logs, Notifications } from "@/interfaces";
import { cn } from "@/lib/utils";
import { API } from "@/services";
import { Bot, Camera, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  const [logs, setLogs] = useState<Logs[]>([]);
  const [notifications, setNotifications] = useState([]);
  const [cameraStats, setCameraStats] = useState({ active: 0, total: 0 });
  const [cameras, setCameras] = useState<Cameras[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [agentActive, setAgentActive] = useState(false);

  useEffect(() => {
    const fetchCameras = async () => {
      setIsLoading(true);
      try {
        const response = await API.get("/cameras");
        const camerasData = response.data.cameras;

        setCameras(camerasData);

        setCameraStats({
          active: camerasData.length,
          total: camerasData.length,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch camera data",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // fetch notifications
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
      }
    };

    const fetchLogs = async () => {
      try {
        const response = await API.get("/logs");
        const logsData = response.data.logs;

        setLogs(logsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch logs",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      }
    };

    // get the agent status
    const fetchAgentStatus = async () => {
      try {
        const response = await API.get("/agents/status");
        const agentStatus = response.data.status;

        console.log(agentStatus);

        setAgentActive(agentStatus);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch agent status",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      }
    };

    // call the functions

    fetchCameras();
    fetchNotifications();
    fetchLogs();
    fetchAgentStatus();
  }, []);

  // start the agent and stop it
  const handleStartAgent = async () => {
    try {
      const response = await API.post("/agents/start");

      if (response.status === 200) {
        setAgentActive(true);
        toast({
          title: "Agent Started",
          description: "The AI surveillance agent has been started",
          className: "bg-green-500 text-white",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the agent",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleStopAgent = async () => {
    try {
      const response = await API.post("/agents/stop");
      if (response.status === 200) {
        setAgentActive(false);
        toast({
          title: "Agent Stopped",
          description: "The AI surveillance agent has been stopped",
          className: "bg-green-500 text-white",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop the agent",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="gap-1 border-green-500 text-green-600 dark:text-green-400"
              >
                <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                System Online
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "gap-1",
                  agentActive
                    ? "border-green-500 text-green-600 dark:text-green-400"
                    : "border-red-500 text-red-600 dark:text-red-400"
                )}
              >
                <Bot
                  className={`h-3 w-3 ${
                    agentActive ? "text-green-500" : "text-red-500"
                  }`}
                />
                Agent {agentActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          {/* Stats row */}
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title="Active Cameras"
              value={`${cameraStats.active}/${cameraStats.total}`}
              icon={Camera}
              trend="up"
              trendValue="2 more than yesterday"
              isLoading={isLoading}
              onClick={() => {
                router.push("/cameras");
              }}
            />
            <StatCard
              title="Agent Status"
              value={agentActive ? "Active" : "Inactive"}
              icon={Bot}
              description="AI surveillance agent"
              isLoading={isLoading}
              showToggle={true}
              isActive={agentActive}
              onToggle={() => {
                if (agentActive) {
                  handleStopAgent();
                } else {
                  handleStartAgent();
                }
              }}
            />
          </div>

          {/* Camera feeds */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Live Camera Feeds</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <CameraFeed key={index} name="Cameras" isLoading={true} />
                    ))
                : cameras
                    .slice(0, 3)
                    .map((camera) => (
                      <CameraFeed
                        key={camera.id}
                        id={camera.id}
                        name={camera.name}
                        location={camera.location}
                        status={camera.status}
                        isLoading={isLoading}
                        onViewClick={() => router.push(`/cameras/${camera.id}`)}
                        onSettingsClick={() =>
                          router.push(`/cameras/${camera.id}/settings`)
                        }
                      />
                    ))}
            </div>
          </div>

          {/* Recent Logs and Notifications */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="h-[400px] rounded-xl border bg-card shadow-subtle">
              <div className="flex items-center justify-between border-b p-4 w-full">
                <h3 className="font-semibold w-full">Recent Logs</h3>
                <div className="space-x-2 w-full flex justify-end">
                  <Badge variant="outline" className="ml-auto">
                    {isLoading ? "..." : `${logs.length} logs`}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/search")}
                  >
                    View All
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[calc(100%-56px)]">
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Objects Detected</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead> AI Snapshots</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.slice(0, 5).map((log, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {log.objects_detected.join(", ")}
                            </TableCell>
                            <TableCell>
                              {new Date(log.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                `${log.date} ${log.time}`
                              ).toLocaleTimeString()}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}{" "}
                </div>
              </ScrollArea>
            </Card>
            <Card className="h-[400px] rounded-xl border bg-card shadow-subtle">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="ml-auto">
                    {isLoading
                      ? "..."
                      : `${notifications.length} notifications`}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/notifications")}
                  >
                    View All
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[calc(100%-56px)]">
                <div className="p-4">
                  {isLoading ? (
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="mb-4 flex items-start gap-3 last:mb-0"
                        >
                          <Skeleton className="mt-1 h-2 w-2 rounded-full" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="mt-1 h-3 w-24" />
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="space-y-4">
                      {notifications
                        .slice(0, 5)
                        .map((notification: Notifications, index: number) => (
                          <Card key={index}>
                            <CardContent className="flex items-start gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base">
                                    {notification.objects.join(", ")}
                                  </CardTitle>
                                  <CardDescription>
                                    {new Date(
                                      `${notification.date} ${notification.time}`
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </CardDescription>
                                </div>
                                <CardDescription className="mt-1">
                                  {new Date(
                                    notification.date
                                  ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </CardDescription>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      {notifications.length === 0 && (
                        <Card className="py-8">
                          <CardContent className="flex flex-col items-center justify-center text-center">
                            <CardDescription>
                              No notifications available
                            </CardDescription>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
