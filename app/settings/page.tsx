import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Lock,
  Database,
  Monitor,
  Bell,
  HardDrive,
  Globe,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  Trash2,
  LogOut,
  UserPlus,
  Key,
  Fingerprint,
} from "lucide-react"

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
          <Tabs defaultValue="account" className="w-full">
            <div className="flex">
              <div className="mr-6 w-[200px] shrink-0">
                <TabsList className="flex h-auto w-full flex-col items-start justify-start rounded-none bg-transparent p-0">
                  <div className="flex w-full flex-col gap-1">
                    <div className="text-sm font-medium text-muted-foreground mb-2">User Settings</div>
                    <TabsTrigger value="account" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </TabsTrigger>
                    <TabsTrigger value="security" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex w-full flex-col gap-1">
                    <div className="text-sm font-medium text-muted-foreground mb-2">System Settings</div>
                    <TabsTrigger value="general" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Monitor className="mr-2 h-4 w-4" />
                      General
                    </TabsTrigger>
                    <TabsTrigger value="storage" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <HardDrive className="mr-2 h-4 w-4" />
                      Storage
                    </TabsTrigger>
                    <TabsTrigger value="network" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Globe className="mr-2 h-4 w-4" />
                      Network
                    </TabsTrigger>
                    <TabsTrigger value="users" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Users & Permissions
                    </TabsTrigger>
                    <TabsTrigger value="backup" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Database className="mr-2 h-4 w-4" />
                      Backup & Restore
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>
              <div className="flex-1">
                {/* Account Settings */}
                <TabsContent value="account" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
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
                            <Input id="email" type="email" defaultValue="admin@edgesurv.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
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
                                <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                                <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                                <SelectItem value="utc+0">UTC</SelectItem>
                                <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
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
                              <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
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

                {/* Security Settings */}
                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Fingerprint className="h-4 w-4 text-primary" />
                              <Label htmlFor="2fa">Two-Factor Authentication</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch id="2fa" />
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Key className="h-4 w-4" />
                          Setup 2FA
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Session Management</h3>
                        <div className="rounded-md border p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-muted-foreground">Windows 11 • Chrome • 192.168.1.5</p>
                              <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            >
                              Active
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <LogOut className="h-4 w-4" />
                          Log Out All Other Sessions
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Account Deletion</h3>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Channels</h3>
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
                              <Label htmlFor="email-notif">Email Notifications</Label>
                            </div>
                            <Switch id="email-notif" defaultChecked />
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

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Types</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="motion-alerts">Motion Detection Alerts</Label>
                            <Switch id="motion-alerts" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="person-alerts">Person Detection Alerts</Label>
                            <Switch id="person-alerts" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="camera-offline">Camera Offline Alerts</Label>
                            <Switch id="camera-offline" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="system-updates">System Updates</Label>
                            <Switch id="system-updates" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="storage-alerts">Storage Alerts</Label>
                            <Switch id="storage-alerts" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="user-login">User Login Notifications</Label>
                            <Switch id="user-login" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Schedule</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                            <Switch id="quiet-hours" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="start-time">Start Time</Label>
                              <Select>
                                <SelectTrigger id="start-time">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <SelectItem key={i} value={`${i}:00`}>
                                      {`${i}:00`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="end-time">End Time</Label>
                              <Select>
                                <SelectTrigger id="end-time">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <SelectItem key={i} value={`${i}:00`}>
                                      {`${i}:00`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* General System Settings */}
                <TabsContent value="general" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>General System Settings</CardTitle>
                      <CardDescription>Configure general system preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">System Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">System Version</p>
                            <p className="text-sm text-muted-foreground">EdgeSurv v1.0.0</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Last Updated</p>
                            <p className="text-sm text-muted-foreground">March 12, 2025</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">License</p>
                            <p className="text-sm text-muted-foreground">Professional Edition</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">License Expires</p>
                            <p className="text-sm text-muted-foreground">December 31, 2025</p>
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Check for Updates
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">System Preferences</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-update">Automatic Updates</Label>
                            <Switch id="auto-update" defaultChecked />
                          </div>
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
                          <Label htmlFor="retention">Default Retention Period (Days)</Label>
                          <Input id="retention" type="number" defaultValue="30" />
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
                              <SelectItem value="system">System Default</SelectItem>
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

                {/* Storage Settings */}
                <TabsContent value="storage" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Storage Settings</CardTitle>
                      <CardDescription>Manage storage and recording preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Storage Overview</h3>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Total Storage</p>
                                <p className="text-sm text-muted-foreground">2 TB</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">Available</p>
                                <p className="text-sm text-muted-foreground">640 GB (32%)</p>
                              </div>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-primary" style={{ width: "68%" }}></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center text-sm">
                              <div>
                                <p className="font-medium">Used</p>
                                <p className="text-muted-foreground">1.36 TB</p>
                              </div>
                              <div>
                                <p className="font-medium">Recordings</p>
                                <p className="text-muted-foreground">1.2 TB</p>
                              </div>
                              <div>
                                <p className="font-medium">System</p>
                                <p className="text-muted-foreground">160 GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Storage Locations</h3>
                        <div className="space-y-2">
                          <Label htmlFor="primary-storage">Primary Storage Location</Label>
                          <Select defaultValue="local">
                            <SelectTrigger id="primary-storage">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="local">Local Storage</SelectItem>
                              <SelectItem value="nas">Network Attached Storage</SelectItem>
                              <SelectItem value="cloud">Cloud Storage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="backup-storage">Enable Backup Storage</Label>
                            <Switch id="backup-storage" />
                          </div>
                          <Select disabled>
                            <SelectTrigger id="backup-location">
                              <SelectValue placeholder="Select backup location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nas">Network Attached Storage</SelectItem>
                              <SelectItem value="cloud">Cloud Storage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Recording Settings</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="overwrite">Overwrite Oldest Recordings When Full</Label>
                            <Switch id="overwrite" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="low-storage-alert">Low Storage Alert</Label>
                            <Switch id="low-storage-alert" defaultChecked />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                          <Input id="alert-threshold" type="number" defaultValue="90" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cleanup">Auto Cleanup</Label>
                          <Select defaultValue="30">
                            <SelectTrigger id="cleanup">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">After 7 days</SelectItem>
                              <SelectItem value="14">After 14 days</SelectItem>
                              <SelectItem value="30">After 30 days</SelectItem>
                              <SelectItem value="60">After 60 days</SelectItem>
                              <SelectItem value="90">After 90 days</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button variant="outline" className="gap-2 w-full">
                        <Trash2 className="h-4 w-4" />
                        Clean Up Old Recordings
                      </Button>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Network Settings */}
                <TabsContent value="network" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Network Settings</CardTitle>
                      <CardDescription>Configure network and connectivity settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Network Configuration</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ip-address">IP Address</Label>
                            <Input id="ip-address" defaultValue="192.168.1.100" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subnet-mask">Subnet Mask</Label>
                            <Input id="subnet-mask" defaultValue="255.255.255.0" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gateway">Default Gateway</Label>
                            <Input id="gateway" defaultValue="192.168.1.1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dns">DNS Server</Label>
                            <Input id="dns" defaultValue="8.8.8.8" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="dhcp">Use DHCP</Label>
                          <Switch id="dhcp" />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Remote Access</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="remote-access">Enable Remote Access</Label>
                          <Switch id="remote-access" defaultChecked />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="port">Remote Access Port</Label>
                          <Input id="port" defaultValue="8080" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="https">Use HTTPS</Label>
                          <Switch id="https" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="upnp">Enable UPnP</Label>
                          <Switch id="upnp" defaultChecked />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Bandwidth Management</h3>
                        <div className="space-y-2">
                          <Label htmlFor="bandwidth-limit">Bandwidth Limit</Label>
                          <Select defaultValue="unlimited">
                            <SelectTrigger id="bandwidth-limit">
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unlimited">Unlimited</SelectItem>
                              <SelectItem value="10">10 Mbps</SelectItem>
                              <SelectItem value="20">20 Mbps</SelectItem>
                              <SelectItem value="50">50 Mbps</SelectItem>
                              <SelectItem value="100">100 Mbps</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="quality-adjust">Auto-adjust Quality Based on Bandwidth</Label>
                          <Switch id="quality-adjust" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Users & Permissions */}
                <TabsContent value="users" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Users & Permissions</CardTitle>
                      <CardDescription>Manage system users and their access rights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">System Users</h3>
                        <Button size="sm" className="gap-2">
                          <UserPlus className="h-4 w-4" />
                          Add User
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            name: "Admin User",
                            email: "admin@edgesurv.com",
                            role: "Administrator",
                            lastLogin: "Today, 08:30",
                          },
                          {
                            name: "Security Officer",
                            email: "security@edgesurv.com",
                            role: "Security",
                            lastLogin: "Yesterday, 17:45",
                          },
                          {
                            name: "Front Desk",
                            email: "frontdesk@edgesurv.com",
                            role: "Viewer",
                            lastLogin: "3 days ago",
                          },
                        ].map((user, index) => (
                          <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{user.role}</Badge>
                                  <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              {user.role !== "Administrator" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Role Permissions</h3>
                        <div className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-4">
                              <p className="font-medium">Administrator</p>
                              <Badge>Full Access</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Administrators have full access to all system features and settings.
                            </p>
                          </div>

                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-4">
                              <p className="font-medium">Security</p>
                              <Badge variant="outline">Limited Access</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Security officers can view all cameras, search recordings, and receive alerts.
                            </p>
                            <Button variant="outline" size="sm">
                              Edit Permissions
                            </Button>
                          </div>

                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-4">
                              <p className="font-medium">Viewer</p>
                              <Badge variant="outline">View Only</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Viewers can only view assigned cameras and cannot change settings.
                            </p>
                            <Button variant="outline" size="sm">
                              Edit Permissions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Backup & Restore */}
                <TabsContent value="backup" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup & Restore</CardTitle>
                      <CardDescription>Manage system backups and restoration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Automatic Backups</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-backup">Enable Automatic Backups</Label>
                          <Switch id="auto-backup" defaultChecked />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="backup-frequency">Backup Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="backup-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="backup-time">Backup Time</Label>
                          <Select defaultValue="3">
                            <SelectTrigger id="backup-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {`${i}:00`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="backup-location">Backup Location</Label>
                          <Select defaultValue="local">
                            <SelectTrigger id="backup-location">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="local">Local Storage</SelectItem>
                              <SelectItem value="nas">Network Storage</SelectItem>
                              <SelectItem value="cloud">Cloud Storage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="retention-count">Number of Backups to Keep</Label>
                          <Input id="retention-count" type="number" defaultValue="5" />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Manual Backup</h3>
                        <div className="space-y-2">
                          <Label htmlFor="backup-items">Items to Include</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="backup-config" defaultChecked />
                              <Label htmlFor="backup-config" className="text-sm">
                                System Configuration
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="backup-users" defaultChecked />
                              <Label htmlFor="backup-users" className="text-sm">
                                User Accounts
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="backup-logs" defaultChecked />
                              <Label htmlFor="backup-logs" className="text-sm">
                                System Logs
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="backup-recordings" />
                              <Label htmlFor="backup-recordings" className="text-sm">
                                Video Recordings
                              </Label>
                            </div>
                          </div>
                        </div>
                        <Button className="gap-2">
                          <Save className="h-4 w-4" />
                          Create Backup Now
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Restore System</h3>
                        <div className="space-y-2">
                          <Label htmlFor="restore-file">Select Backup File</Label>
                          <div className="flex gap-2">
                            <Input id="restore-file" type="file" className="flex-1" />
                            <Button variant="outline">Browse</Button>
                          </div>
                        </div>
                        <Button variant="destructive" className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Restore System
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Missing import
import { Checkbox } from "@/components/ui/checkbox"

