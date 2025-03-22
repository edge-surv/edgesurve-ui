import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// This would normally come from a database or API
const getCameraSettings = (id: string) => {
  // Sample data based on the schema
  return {
    id: "settings-001",
    camera_id: id,
    detection_objects: ["person", "vehicle", "animal"],
    enabled: true,
    minimum_confidence: 0.6,
    enable_tracking: true,
    enable_counting: true,
    enable_zone: false,
    save_footage: true,
  }
}

// This would normally come from a database or API
const getCamera = (id: string) => {
  return {
    id,
    name: "Front Entrance",
    provider: "Hikvision",
    ipAddress: "192.168.1.101",
    resolution: "1080p",
    location: "Main Building",
    status: "online",
  }
}

export default function CameraConfigPage({ params }: { params: { id: string } }) {
  const cameraId = params.id
  const camera = getCamera(cameraId)
  const settings = getCameraSettings(cameraId)

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
              <Badge variant="outline" className="gap-1">
                <span className={`h-2 w-2 rounded-full ${settings.enabled ? "bg-green-500" : "bg-red-500"}`}></span>
                {settings.enabled ? "Enabled" : "Disabled"}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link href="/camera-settings" className="flex items-center gap-2">
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
                  <CardDescription>Configure detection and recording settings for this camera</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enabled" className="text-base">
                        Enable Camera
                      </Label>
                      <p className="text-sm text-muted-foreground">Turn detection on or off for this camera</p>
                    </div>
                    <Switch id="enabled" defaultChecked={settings.enabled} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detection Settings</h3>

                    <div className="space-y-2">
                      <Label htmlFor="detection-objects">Detection Objects</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="detect-person" defaultChecked={settings.detection_objects.includes("person")} />
                          <Label htmlFor="detect-person" className="text-sm">
                            Person
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="detect-vehicle"
                            defaultChecked={settings.detection_objects.includes("vehicle")}
                          />
                          <Label htmlFor="detect-vehicle" className="text-sm">
                            Vehicle
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="detect-animal" defaultChecked={settings.detection_objects.includes("animal")} />
                          <Label htmlFor="detect-animal" className="text-sm">
                            Animal
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="detect-package"
                            defaultChecked={settings.detection_objects.includes("package")}
                          />
                          <Label htmlFor="detect-package" className="text-sm">
                            Package
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="minimum-confidence">
                          Minimum Confidence: {settings.minimum_confidence * 100}%
                        </Label>
                      </div>
                      <Slider
                        id="minimum-confidence"
                        defaultValue={[settings.minimum_confidence * 100]}
                        max={100}
                        step={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        Higher values reduce false positives but may miss some objects
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Advanced Features</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="enable-tracking" className="text-sm">
                            Object Tracking
                          </Label>
                          <p className="text-xs text-muted-foreground">Track objects across frames</p>
                        </div>
                        <Switch id="enable-tracking" defaultChecked={settings.enable_tracking} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="enable-counting" className="text-sm">
                            Object Counting
                          </Label>
                          <p className="text-xs text-muted-foreground">Count objects entering and exiting</p>
                        </div>
                        <Switch id="enable-counting" defaultChecked={settings.enable_counting} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="enable-zone" className="text-sm">
                            Zone Detection
                          </Label>
                          <p className="text-xs text-muted-foreground">Define specific detection zones</p>
                        </div>
                        <Switch id="enable-zone" defaultChecked={settings.enable_zone} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recording Settings</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="save-footage" className="text-sm">
                          Save Footage
                        </Label>
                        <p className="text-xs text-muted-foreground">Store video footage when objects are detected</p>
                      </div>
                      <Switch id="save-footage" defaultChecked={settings.save_footage} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="retention-period">Retention Period</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="retention-period">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        How long to keep recorded footage before automatic deletion
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="text-red-600 gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Configuration
                  </Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4 text-green-500" />
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
                    <h3 className="text-sm font-medium">IP Address</h3>
                    <p className="text-sm">{camera.ipAddress}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Resolution</h3>
                    <p className="text-sm">{camera.resolution}</p>
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
                          ? "border-green-500 text-green-600 dark:text-green-400"
                          : "border-red-500 text-red-600 dark:text-red-400"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${camera.status === "online" ? "bg-green-500" : "bg-red-500"}`}
                      ></span>
                      {camera.status === "online" ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/camera-settings/edit/${camera.id}`}>Edit Camera Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
