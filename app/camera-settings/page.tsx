import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CameraSettingsPage() {
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
                <span className="h-2 w-2 rounded-full bg-green-500"></span> 12 Cameras Configured
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="recording">Recording</TabsTrigger>
              <TabsTrigger value="motion">Motion Detection</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Camera Selection</CardTitle>
                  <CardDescription>Select a camera to configure its settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="camera">Camera</Label>
                        <Select defaultValue="front-entrance">
                          <SelectTrigger id="camera">
                            <SelectValue placeholder="Select camera" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="front-entrance">Front Entrance</SelectItem>
                            <SelectItem value="parking-lot">Parking Lot</SelectItem>
                            <SelectItem value="reception">Reception Area</SelectItem>
                            <SelectItem value="back-door">Back Door</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue="enabled">
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resolution">Resolution</Label>
                        <Select defaultValue="1080p">
                          <SelectTrigger id="resolution">
                            <SelectValue placeholder="Select resolution" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="720p">720p</SelectItem>
                            <SelectItem value="1080p">1080p</SelectItem>
                            <SelectItem value="4k">4K</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fps">Frame Rate (FPS)</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="fps">
                            <SelectValue placeholder="Select FPS" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 FPS</SelectItem>
                            <SelectItem value="30">30 FPS</SelectItem>
                            <SelectItem value="60">60 FPS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Camera Name</Label>
                      <Input id="name" defaultValue="Front Entrance Camera" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="Main Building" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="audio" defaultChecked />
                        <Label htmlFor="audio">Enable Audio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="night-vision" defaultChecked />
                        <Label htmlFor="night-vision">Night Vision</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="recording" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recording Settings</CardTitle>
                  <CardDescription>Configure how your cameras record footage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recording-mode">Recording Mode</Label>
                      <Select defaultValue="continuous">
                        <SelectTrigger id="recording-mode">
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="continuous">Continuous</SelectItem>
                          <SelectItem value="motion">Motion Triggered</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storage-location">Storage Location</Label>
                      <Select defaultValue="local">
                        <SelectTrigger id="storage-location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="nas">NAS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retention">Retention Period (Days)</Label>
                    <Input id="retention" type="number" defaultValue="30" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="overwrite" defaultChecked />
                    <Label htmlFor="overwrite">Overwrite oldest recordings when storage is full</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="motion" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Motion Detection</CardTitle>
                  <CardDescription>Configure motion detection sensitivity and zones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sensitivity">Sensitivity</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Low</span>
                      <Input id="sensitivity" type="range" className="w-full" />
                      <span className="text-sm text-muted-foreground">High</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">Send notifications on motion detection</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="record-motion" defaultChecked />
                    <Label htmlFor="record-motion">Record on motion detection</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Motion Detection Zones</Label>
                    <div className="aspect-video rounded-md border bg-muted p-2 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Motion zone editor would appear here</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure advanced camera settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bitrate">Bitrate (Mbps)</Label>
                      <Input id="bitrate" type="number" defaultValue="4" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codec">Video Codec</Label>
                      <Select defaultValue="h264">
                        <SelectTrigger id="codec">
                          <SelectValue placeholder="Select codec" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="h264">H.264</SelectItem>
                          <SelectItem value="h265">H.265</SelectItem>
                          <SelectItem value="mjpeg">MJPEG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brightness">Brightness</Label>
                      <Input id="brightness" type="range" className="w-full" defaultValue="50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contrast">Contrast</Label>
                      <Input id="contrast" type="range" className="w-full" defaultValue="50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saturation">Saturation</Label>
                      <Input id="saturation" type="range" className="w-full" defaultValue="50" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="wdr" defaultChecked />
                    <Label htmlFor="wdr">Wide Dynamic Range (WDR)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="dnr" defaultChecked />
                    <Label htmlFor="dnr">Digital Noise Reduction</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

