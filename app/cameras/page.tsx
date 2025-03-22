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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Settings,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { API } from "@/services";
import { Cameras } from "@/interfaces";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CameraSettingsPage() {
  const { toast } = useToast();
  const [cameras, setCameras] = useState<Cameras[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

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

  const handleDelete = async (cameraId: string) => {
    try {
      await API.delete(`/cameras/${cameraId}`);
      setCameras(cameras.filter((camera) => camera.id !== cameraId));
      toast({
        title: "Success",
        description: "Camera deleted successfully",
        className: "bg-green-500 text-white",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete camera",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
    setShowDeleteDialog(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Camera</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                {cameras.length > 1
                  ? `${cameras.length} Cameras `
                  : `${cameras.length} Camera`}{" "}
                Configured
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Camera Management</CardTitle>
                <CardDescription>
                  View and manage all connected cameras
                </CardDescription>
              </div>
              <Link href="/cameras/new">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4 text-green-500" />
                  Add Camera
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">
                          Camera Name
                        </th>
                        <th className="p-3 text-left font-medium hidden md:table-cell">
                          Provider
                        </th>
                        <th className="p-3 text-left font-medium">Host</th>
                        <th className="p-3 text-left font-medium hidden md:table-cell">
                          Port
                        </th>
                        <th className="p-3 text-left font-medium hidden lg:table-cell">
                          Location
                        </th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cameras.map((camera) => (
                        <tr
                          key={camera.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="p-3">{camera.name}</td>
                          <td className="p-3 hidden md:table-cell">
                            {camera.provider}
                          </td>
                          <td className="p-3">{camera.host}</td>
                          <td className="p-3 hidden md:table-cell">
                            {camera.port}
                          </td>
                          <td className="p-3 hidden lg:table-cell">
                            {camera.location}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={`gap-1 ${
                                camera.status === "online"
                                  ? "border-green-500 text-green-600 dark:text-green-400"
                                  : "border-red-500 text-red-600 dark:text-red-400"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  camera.status === "online"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              {camera.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={`/cameras/${camera.id}/edit`}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Edit className="h-4 w-4 text-amber-500" />
                                </Button>
                              </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>
                                    Camera Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Link
                                      href={`/cameras/${camera.id}/configure`}
                                      className="flex items-center"
                                    >
                                      <Settings className="mr-2 h-4 w-4 text-teal-500" />
                                      Configure
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Link
                                      href={`/livestream/${camera.id}`}
                                      className="flex items-center"
                                    >
                                      <Eye className="mr-2 h-4 w-4 text-blue-500" />
                                      View Livestream
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => {
                                      setSelectedCamera(camera.id);
                                      setShowDeleteDialog(true);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </div>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              camera from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedCamera && handleDelete(selectedCamera)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
