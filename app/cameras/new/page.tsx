import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const ConfigureCameraPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="camera-name">
            Camera Name <span className="text-red-500">*</span>
          </Label>
          <Input id="camera-name" placeholder="e.g., Front Entrance" required />
          <p className="text-xs text-muted-foreground">A descriptive name for this camera</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-provider">
            Provider <span className="text-red-500">*</span>
          </Label>
          <Select>
            <SelectTrigger id="camera-provider">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hikvision">Hikvision</SelectItem>
              <SelectItem value="dahua">Dahua</SelectItem>
              <SelectItem value="axis">Axis</SelectItem>
              <SelectItem value="bosch">Bosch</SelectItem>
              <SelectItem value="samsung">Samsung</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Manufacturer of the camera</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-host">
            Host <span className="text-red-500">*</span>
          </Label>
          <Input id="camera-host" placeholder="e.g., 192.168.1.100" required />
          <p className="text-xs text-muted-foreground">IP address or hostname of the camera</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-port">
            Port <span className="text-red-500">*</span>
          </Label>
          <Input id="camera-port" placeholder="e.g., 554" defaultValue="554" required />
          <p className="text-xs text-muted-foreground">RTSP port for video streaming</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-location">
            Location <span className="text-red-500">*</span>
          </Label>
          <Input id="camera-location" placeholder="e.g., Main Building" required />
          <p className="text-xs text-muted-foreground">Physical location of the camera</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-username">Username</Label>
          <Input id="camera-username" placeholder="Camera username" />
          <p className="text-xs text-muted-foreground">Authentication username (if required)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-password">Password</Label>
          <Input id="camera-password" type="password" placeholder="Camera password" />
          <p className="text-xs text-muted-foreground">Authentication password (if required)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-model">Model</Label>
          <Input id="camera-model" placeholder="e.g., DS-2CD2385G1" />
          <p className="text-xs text-muted-foreground">Model number of the camera</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="camera-notes">Notes</Label>
        <textarea
          id="camera-notes"
          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Additional notes about this camera..."
        />
      </div>
    </div>
  );
};

export default function AddCameraPage() {
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
              <Link href="/camera-settings" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 text-blue-500" />
                Back to Camera Management
              </Link>
            </Button>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Configuration</CardTitle>
              <CardDescription>Enter the details of the camera you want to add to the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ConfigureCameraPage />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/camera-settings">Cancel</Link>
              </Button>
              <Button className="gap-2">
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