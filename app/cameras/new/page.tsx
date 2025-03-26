"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Cameras } from "@/interfaces";
import { API } from "@/services";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCameraPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<Cameras>({
    name: "",
    provider: "",
    host: "",
    port: 554,
    location: "",
    username: "",
    password: "",
    status: "online",
  });

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.provider ||
      !formData.host ||
      !formData.port ||
      !formData.location ||
      !formData.username ||
      !formData.password
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }

    try {
      const response = await API.post("/cameras", formData);

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Camera added successfully",
          className: "bg-green-500 text-white",
          variant: "default",
        });
        const cameraId = response.data.camera_id;

        router.push(`/cameras/${cameraId}/configure`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add camera",
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
            <h1 className="text-xl font-semibold">Add New Camera</h1>
            <Button variant="outline" size="sm" asChild>
              <Link href="/cameras" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 text-blue-500" />
                Back To Cameras
              </Link>
            </Button>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Configuration</CardTitle>
              <CardDescription>
                Enter the details of the camera you want to add to the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="camera-name">
                      Camera Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="camera-name"
                      placeholder="e.g., Front Entrance"
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive name for this camera
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="camera-provider">
                      Provider <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, provider: value }))
                      }
                    >
                      <SelectTrigger id="camera-provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hikvision">Hikvision</SelectItem>
                        <SelectItem value="Dahua">Dahua</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Manufacturer of the camera
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="camera-host">
                      Host <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="camera-host"
                      placeholder="e.g., 192.168.1.100"
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          host: e.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      IP address or hostname of the camera
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="camera-port">
                      Port <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="camera-port"
                      placeholder="e.g., 554"
                      defaultValue="554"
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          port: Number(e.target.value),
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      RTSP port for video streaming
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="camera-location">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="camera-location"
                      placeholder="e.g., Main Building"
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Physical location of the camera
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="camera-username">Username</Label>
                    <Input
                      id="camera-username"
                      placeholder="Camera username"
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="camera-password">Password</Label>
                    <Input
                      id="camera-password"
                      type="password"
                      placeholder="Camera password"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/cameras">Cancel</Link>
              </Button>
              <Button className="gap-2" onClick={() => handleSubmit()}>
                <Save className="h-4 w-4 text-green-500" />
                Save Camera
              </Button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
