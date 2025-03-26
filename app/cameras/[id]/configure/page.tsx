"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Cameras, CameraSettings } from "@/interfaces";
import { API } from "@/services";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CameraConfigPage() {
  const params = useParams();
  const { toast } = useToast();
  const [camera, setCamera] = useState<Cameras | null>(null);
  const [settings, setSettings] = useState<CameraSettings>({
    camera_id: params.id as string,
    detection_objects: [],
    enabled: false,
    minimum_confidence: 0.5,
    enable_tracking: false,
    enable_counting: false,
    enable_zone: false,
    save_footage: false,
    start_time: "00:00",
    end_time: "23:59",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cameraResponse = await API.get(`/cameras/${params.id}`);
        setCamera(cameraResponse.data.camera);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch camera details",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      }
    };
    fetchData();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await API.post(`/cameras/${params.id}/settings`, settings);
      toast({
        title: "Success",
        description: "Camera settings saved successfully",
        className: "bg-green-500 text-white",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save camera settings",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
  };

  if (!camera) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Camera Configuration</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/cameras" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4 text-blue-500" />
                  Back to Cameras
                </Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Camera Settings: {camera.name}</CardTitle>
                  <CardDescription>
                    Configure detection and recording settings for this camera
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enabled" className="text-base">
                        Enable Camera
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Turn detection on or off for this camera
                      </p>
                    </div>
                    <Switch
                      id="enabled"
                      checked={settings.enabled}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, enabled: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detection Settings</h3>
                    <div className="space-y-2">
                      <Label>Detection Objects</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["person", "car", "truck", "bicycle"].map((object) => (
                          <div
                            key={object}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`detect-${object}`}
                              checked={settings.detection_objects.includes(
                                object
                              )}
                              onCheckedChange={(checked) => {
                                const newObjects = checked
                                  ? [...settings.detection_objects, object]
                                  : settings.detection_objects.filter(
                                      (obj) => obj !== object
                                    );
                                setSettings({
                                  ...settings,
                                  detection_objects: newObjects,
                                });
                              }}
                            />
                            <Label
                              htmlFor={`detect-${object}`}
                              className="text-sm capitalize"
                            >
                              {object}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Object Tracking</Label>
                          <p className="text-xs text-muted-foreground">
                            Track objects across frames
                          </p>
                        </div>
                        <Switch
                          checked={settings.enable_tracking}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              enable_tracking: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Object Counting</Label>
                          <p className="text-xs text-muted-foreground">
                            Count objects entering and exiting
                          </p>
                        </div>
                        <Switch
                          checked={settings.enable_counting}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              enable_counting: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Zone Detection</Label>
                          <p className="text-xs text-muted-foreground">
                            Define specific detection zones
                          </p>
                        </div>
                        <Switch
                          checked={settings.enable_zone}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, enable_zone: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Save Footage</Label>
                          <p className="text-xs text-muted-foreground">
                            Store video footage when objects are detected
                          </p>
                        </div>
                        <Switch
                          checked={settings.save_footage}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, save_footage: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={settings.start_time}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              start_time: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={settings.end_time}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              end_time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="gap-2"
                    onClick={() => handleSaveSettings()}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Camera Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Camera Name</h3>
                    <p className="text-sm">{camera.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Provider</h3>
                    <p className="text-sm">{camera.provider}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Host</h3>
                    <p className="text-sm">{camera.host}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Port</h3>
                    <p className="text-sm">{camera.port}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="text-sm">{camera.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <Badge
                      variant="outline"
                      className={`gap-1 ${
                        camera.status === "online"
                          ? "border-green-500 text-green-600"
                          : "border-red-500 text-red-600"
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
