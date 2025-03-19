import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  RefreshCw,
  Camera,
  Settings,
  Bot,
  Network,
  LogOut,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="user" className="w-full">
            <div className="flex">
              <div className="mr-6 w-[200px] shrink-0">
                <TabsList className="flex h-auto w-full flex-col items-start justify-start rounded-none bg-transparent p-0">
                  <div className="flex w-full flex-col gap-1">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Settings
                    </div>
                    <TabsTrigger
                      value="user"
                      className="w-full justify-start rounded-md px-3 py-2 text-sm"
                    >
                      <User className="mr-2 h-4 w-4 text-blue-500" />
                      User Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="camera"
                      className="w-full justify-start rounded-md px-3 py-2 text-sm"
                    >
                      <Camera className="mr-2 h-4 w-4 text-green-500" />
                      Camera Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="system"
                      className="w-full justify-start rounded-md px-3 py-2 text-sm"
                    >
                      <Settings className="mr-2 h-4 w-4 text-teal-500" />
                      System Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="ai-agent"
                      className="w-full justify-start rounded-md px-3 py-2 text-sm"
                    >
                      <Bot className="mr-2 h-4 w-4 text-purple-500" />
                      AI Agent
                    </TabsTrigger>
                    <TabsTrigger
                      value="iot"
                      className="w-full justify-start rounded-md px-3 py-2 text-sm"
                    >
                      <Network className="mr-2 h-4 w-4 text-amber-500" />
                      IoT Integration
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>
              <div className="flex-1">
                {/* User Settings */}
                <TabsContent value="user" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Settings</CardTitle>
                      <CardDescription>
                        Manage your account information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage
                              src="/placeholder.svg?height=96&width=96"
                              alt="User"
                            />
                            <AvatarFallback>AD</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" defaultValue="Admin" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" defaultValue="User" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="admin@edgesurv.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              defaultValue="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Preferences</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                              <SelectTrigger id="language">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Time Zone</Label>
                            <Select defaultValue="utc-8">
                              <SelectTrigger id="timezone">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="utc-8">
                                  Pacific Time (UTC-8)
                                </SelectItem>
                                <SelectItem value="utc-5">
                                  Eastern Time (UTC-5)
                                </SelectItem>
                                <SelectItem value="utc+0">UTC</SelectItem>
                                <SelectItem value="utc+1">
                                  Central European Time (UTC+1)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select defaultValue="mm-dd-yyyy">
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm-dd-yyyy">
                                MM/DD/YYYY
                              </SelectItem>
                              <SelectItem value="dd-mm-yyyy">
                                DD/MM/YYYY
                              </SelectItem>
                              <SelectItem value="yyyy-mm-dd">
                                YYYY/MM/DD
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Camera Settings */}
                <TabsContent value="camera" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Camera Settings</CardTitle>
                      <CardDescription>
                        Configure camera details and parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="camera-name">Camera Name</Label>
                          <Input
                            id="camera-name"
                            placeholder="e.g., Front Entrance"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-location">Location</Label>
                          <Input
                            id="camera-location"
                            placeholder="e.g., Main Building"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-provider">
                            Provider/Manufacturer
                          </Label>
                          <Select>
                            <SelectTrigger id="camera-provider">
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hikvision">
                                Hikvision
                              </SelectItem>
                              <SelectItem value="dahua">Dahua</SelectItem>
                              <SelectItem value="axis">Axis</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-ip">IP Address</Label>
                          <Input
                            id="camera-ip"
                            placeholder="e.g., 192.168.1.100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-resolution">Resolution</Label>
                          <Select>
                            <SelectTrigger id="camera-resolution">
                              <SelectValue placeholder="Select resolution" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="720p">720p</SelectItem>
                              <SelectItem value="1080p">1080p</SelectItem>
                              <SelectItem value="2k">2K</SelectItem>
                              <SelectItem value="4k">4K</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-username">Username</Label>
                          <Input
                            id="camera-username"
                            placeholder="Camera username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-password">Password</Label>
                          <Input
                            id="camera-password"
                            type="password"
                            placeholder="Camera password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-port">Port</Label>
                          <Input id="camera-port" placeholder="e.g., 554" />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Camera Features</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="motion-detection">
                              Motion Detection
                            </Label>
                            <Switch id="motion-detection" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="person-detection">
                              Person Detection
                            </Label>
                            <Switch id="person-detection" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="audio-recording">
                              Audio Recording
                            </Label>
                            <Switch id="audio-recording" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="night-vision">Night Vision</Label>
                            <Switch id="night-vision" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Recording Settings
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="recording-mode">
                              Recording Mode
                            </Label>
                            <Select>
                              <SelectTrigger id="recording-mode">
                                <SelectValue placeholder="Select mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="continuous">
                                  Continuous
                                </SelectItem>
                                <SelectItem value="motion">
                                  Motion-triggered
                                </SelectItem>
                                <SelectItem value="scheduled">
                                  Scheduled
                                </SelectItem>
                                <SelectItem value="manual">Manual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="retention-period">
                              Retention Period (Days)
                            </Label>
                            <Input
                              id="retention-period"
                              type="number"
                              defaultValue="30"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Camera</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* System Settings */}
                <TabsContent value="system" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Settings</CardTitle>
                      <CardDescription>
                        Configure general system preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          System Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">
                              System Version
                            </p>
                            <p className="text-sm text-muted-foreground">
                              EdgeSurv v1.0.0
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Last Updated</p>
                            <p className="text-sm text-muted-foreground">
                              March 12, 2025
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          License Information
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="license-key">License Key</Label>
                          <div className="flex gap-2">
                            <Input
                              id="license-key"
                              placeholder="Enter your license key"
                            />
                            <Button>Activate</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Enter your license key to activate all features of
                            EdgeSurv
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">License Type</p>
                            <p className="text-sm text-muted-foreground">
                              Professional Edition
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              License Expires
                            </p>
                            <p className="text-sm text-muted-foreground">
                              December 31, 2025
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">System Updates</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-update">
                              Automatic Updates
                            </Label>
                            <Switch id="auto-update" defaultChecked />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patch-version">Patch Version</Label>
                          <div className="flex gap-2">
                            <Select>
                              <SelectTrigger id="patch-version">
                                <SelectValue placeholder="Select patch version" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="latest">
                                  Latest (v1.0.5)
                                </SelectItem>
                                <SelectItem value="1.0.4">v1.0.4</SelectItem>
                                <SelectItem value="1.0.3">v1.0.3</SelectItem>
                                <SelectItem value="1.0.2">v1.0.2</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline">Apply Patch</Button>
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <RefreshCw className="h-4 w-4 text-blue-500" />
                          Check for Updates
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          System Preferences
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="analytics">Share Analytics</Label>
                            <Switch id="analytics" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-login">Auto Login</Label>
                            <Switch id="auto-login" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="retention">
                            Default Retention Period (Days)
                          </Label>
                          <Input
                            id="retention"
                            type="number"
                            defaultValue="30"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="theme">System Theme</Label>
                          <Select defaultValue="system">
                            <SelectTrigger id="theme">
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">
                                System Default
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* AI Agent Settings */}
                <TabsContent value="ai-agent" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Agent</CardTitle>
                      <CardDescription>
                        Configure AI surveillance agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ai-agent-active">AI Agent Active</Label>
                        <Switch id="ai-agent-active" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ai-model">AI Model</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="ai-model">
                            <SelectValue placeholder="Select AI model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="detection-types">Detection Types</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="detect-person" defaultChecked />
                            <Label htmlFor="detect-person" className="text-sm">
                              Person
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="detect-vehicle" defaultChecked />
                            <Label htmlFor="detect-vehicle" className="text-sm">
                              Vehicle
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="detect-animal" />
                            <Label htmlFor="detect-animal" className="text-sm">
                              Animal
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="detect-object" />
                            <Label htmlFor="detect-object" className="text-sm">
                              Object
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply AI Settings</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* IoT Integration Settings */}
                <TabsContent value="iot" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>IoT Integration</CardTitle>
                      <CardDescription>
                        Connect with IoT devices
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="iot-enabled">
                          Enable IoT Integration
                        </Label>
                        <Switch id="iot-enabled" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="iot-protocol">Protocol</Label>
                        <Select>
                          <SelectTrigger id="iot-protocol">
                            <SelectValue placeholder="Select protocol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mqtt">MQTT</SelectItem>
                            <SelectItem value="http">HTTP/REST</SelectItem>
                            <SelectItem value="zigbee">Zigbee</SelectItem>
                            <SelectItem value="zwave">Z-Wave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="iot-server">Server Address</Label>
                        <Input
                          id="iot-server"
                          placeholder="e.g., mqtt://iot.example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="iot-auth">Authentication</Label>
                        <Select>
                          <SelectTrigger id="iot-auth">
                            <SelectValue placeholder="Select auth method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="basic">Basic Auth</SelectItem>
                            <SelectItem value="token">Token</SelectItem>
                            <SelectItem value="cert">Certificate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Connect Devices</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
