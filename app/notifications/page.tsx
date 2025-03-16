import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  BellOff,
  Camera,
  FileVideo,
  Settings,
  User,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Smartphone,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NotificationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Notifications</h1>
            <div className="flex items-center gap-2">
              <Badge variant="primary">3 Unread</Badge>
              <Button variant="outline" size="sm" className="gap-1">
                <BellOff className="h-4 w-4" />
                Mute All
              </Button>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>

            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>All Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {allNotifications.length > 0 ? (
                      allNotifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`mb-4 rounded-lg p-4 ${notification.unread ? "bg-muted/50" : ""} ${index !== allNotifications.length - 1 ? "border-b pb-4" : ""}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                              {getNotificationTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p
                                    className={`font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                                  >
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                                  {notification.unread && (
                                    <Badge variant="primary" className="mt-1 h-2 w-2 rounded-full p-0" />
                                  )}
                                </div>
                              </div>
                              {notification.actions && (
                                <div className="mt-2 flex gap-2">
                                  {notification.actions.map((action, actionIndex) => (
                                    <Button key={actionIndex} variant="outline" size="sm">
                                      {action}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground">No notifications</p>
                        <p className="text-xs text-muted-foreground mt-2">You're all caught up!</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" disabled={allNotifications.length === 0}>
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Alert Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {allNotifications
                      .filter((notification) => notification.type === "alert")
                      .map((notification, index) => (
                        <div
                          key={index}
                          className={`mb-4 rounded-lg p-4 ${notification.unread ? "bg-muted/50" : ""} ${index !== allNotifications.filter((n) => n.type === "alert").length - 1 ? "border-b pb-4" : ""}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                              {getNotificationTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p
                                    className={`font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                                  >
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                                  {notification.unread && (
                                    <Badge variant="primary" className="mt-1 h-2 w-2 rounded-full p-0" />
                                  )}
                                </div>
                              </div>
                              {notification.actions && (
                                <div className="mt-2 flex gap-2">
                                  {notification.actions.map((action, actionIndex) => (
                                    <Button key={actionIndex} variant="outline" size="sm">
                                      {action}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>System Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {allNotifications
                      .filter((notification) => notification.type === "system")
                      .map((notification, index) => (
                        <div
                          key={index}
                          className={`mb-4 rounded-lg p-4 ${notification.unread ? "bg-muted/50" : ""} ${index !== allNotifications.filter((n) => n.type === "system").length - 1 ? "border-b pb-4" : ""}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                              {getNotificationTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p
                                    className={`font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                                  >
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                                  {notification.unread && (
                                    <Badge variant="primary" className="mt-1 h-2 w-2 rounded-full p-0" />
                                  )}
                                </div>
                              </div>
                              {notification.actions && (
                                <div className="mt-2 flex gap-2">
                                  {notification.actions.map((action, actionIndex) => (
                                    <Button key={actionIndex} variant="outline" size="sm">
                                      {action}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <Label htmlFor="motion-alerts">Motion Detection Alerts</Label>
                        </div>
                        <Switch id="motion-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-500" />
                          <Label htmlFor="person-alerts">Person Detection Alerts</Label>
                        </div>
                        <Switch id="person-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-blue-500" />
                          <Label htmlFor="camera-offline">Camera Offline Alerts</Label>
                        </div>
                        <Switch id="camera-offline" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-yellow-500" />
                          <Label htmlFor="system-updates">System Updates</Label>
                        </div>
                        <Switch id="system-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileVideo className="h-4 w-4 text-green-500" />
                          <Label htmlFor="storage-alerts">Storage Alerts</Label>
                        </div>
                        <Switch id="storage-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-indigo-500" />
                          <Label htmlFor="user-login">User Login Notifications</Label>
                        </div>
                        <Switch id="user-login" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Delivery</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <Label htmlFor="in-app">In-App Notifications</Label>
                        </div>
                        <Switch id="in-app" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <Label htmlFor="email">Email Notifications</Label>
                        </div>
                        <Switch id="email" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <Label htmlFor="push">Push Notifications</Label>
                        </div>
                        <Switch id="push" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Helper functions for notifications
function getNotificationTypeColor(type: string) {
  switch (type) {
    case "alert":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    case "system":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "info":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    case "success":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  }
}

function getNotificationTypeIcon(type: string) {
  switch (type) {
    case "alert":
      return <AlertTriangle className="h-4 w-4" />
    case "system":
      return <Settings className="h-4 w-4" />
    case "info":
      return <Bell className="h-4 w-4" />
    case "success":
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

// Sample data for notifications
const allNotifications = []

