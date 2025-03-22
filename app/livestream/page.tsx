"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CameraFeed } from "@/components/camera-feed";
import { useToast } from "@/hooks/use-toast";
import { API } from "@/services";
import { useState, useEffect } from "react";
import { Cameras } from "@/interfaces";

export default function LivestreamPage() {
  const { toast } = useToast();
  const [cameras, setCameras] = useState<Cameras[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCameras = async () => {
      setIsLoading(true);
      try {
        const response = await API.get("/cameras");
        const camerasData = response.data.cameras;
        setCameras(camerasData);
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

    fetchCameras();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Livestream</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                {cameras.length > 1
                  ? `${cameras.length} Cameras`
                  : `${cameras.length} Camera`}
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col h-[calc(100vh-64px)]">
          <div className="grid gap-6 md:grid-cols-2 px-3 py-2 ">
            {cameras.map((camera, index) => (
              <CameraFeed
                key={index}
                id={camera.id}
                name={camera.name}
                location={camera.location}
                status={camera.status}
                isLoading={isLoading}
                className="h-full"
              />
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
