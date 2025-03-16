"use client"

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
import { Checkbox } from "@/components/ui/checkbox"
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
  RefreshCw,
  Trash2,
  LogOut,
  UserPlus,
  Key,
  Fingerprint,
  UserCog,
  Cpu,
  Plus,
  Wifi,
  Speaker,
  Webhook,
  ClipboardList,
  Filter,
  Download,
  CalendarIcon,
  SearchIcon,
  AlertTriangle,
  Camera,
  Settings,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("account")

  // Set the active tab based on URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (
      tabParam &&
      [
        "account",
        "security",
        "notifications",
        "profile",
        "general",
        "storage",
        "network",
        "iot",
        "users",
        "backup",
        "api",
        "audit",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Settings</h1>
              <Badge variant="outline" className="ml-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <Button
              variant={
                activeTab === "account" ||
                activeTab === "security" ||
                activeTab === "notifications" ||
                activeTab === "profile"
                  ? "default"
                  : "outline"
              }
              className="justify-start gap-2"
              onClick={() => setActiveTab("account")}
            >
              <User className="h-4 w-4" />
              <span>User</span>
            </Button>
            <Button
              variant={
                activeTab === "general" || activeTab === "storage" || activeTab === "network" ? "default" : "outline"
              }
              className="justify-start gap-2"
              onClick={() => setActiveTab("general")}
            >
              <Monitor className="h-4 w-4" />
              <span>System</span>
            </Button>
            <Button
              variant={activeTab === "iot" ? "default" : "outline"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("iot")}
            >
              <Cpu className="h-4 w-4" />
              <span>IoT Devices</span>
            </Button>
            <Button
              variant={
                activeTab === "users" || activeTab === "backup" || activeTab === "api" || activeTab === "audit"
                  ? "default"
                  : "outline"
              }
              className="justify-start gap-2"
              onClick={() => setActiveTab("users")}
            >
              <UserPlus className="h-4 w-4" />
              <span>Advanced</span>
            </Button>
          </div>
          <Separator className="my-4" />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    <TabsTrigger value="profile" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <UserCog className="mr-2 h-4 w-4" />
                      Profile
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
                    <TabsTrigger value="iot" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Cpu className="mr-2 h-4 w-4" />
                      IoT Devices
                    </TabsTrigger>
                    <TabsTrigger value="users" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Users & Permissions
                    </TabsTrigger>
                    <TabsTrigger value="backup" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Database className="mr-2 h-4 w-4" />
                      Backup & Restore
                    </TabsTrigger>
                    <TabsTrigger value="api" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <Webhook className="mr-2 h-4 w-4" />
                      API & Integrations
                    </TabsTrigger>
                    <TabsTrigger value="audit" className="w-full justify-start rounded-md px-3 py-2 text-sm">
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Audit Log
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

                {/* User Profile Settings */}
                <TabsContent value="profile" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Manage your user profile information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                            <AvatarFallback>AD</AvatarFallback>
                          </Avatar>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Change Avatar
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="display-name">Display Name</Label>
                              <Input id="display-name" defaultValue="" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="job-title">Job Title</Label>
                              <Input id="job-title" defaultValue="" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                              id="bio"
                              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Brief description about yourself"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="contact-email">Contact Email</Label>
                              <Input id="contact-email" type="email" defaultValue="" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone-number">Phone Number</Label>
                              <Input id="phone-number" type="tel" defaultValue="" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Login Information</h3>
                        <div className="rounded-md border p-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="font-medium">Last Login</p>
                              <p className="text-muted-foreground">Today, 09:42 AM</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-medium">Login Location</p>
                              <p className="text-muted-foreground">New York, USA</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-medium">IP Address</p>
                              <p className="text-muted-foreground">192.168.1.1</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Login Sessions</h4>
                          <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4 border-b">
                              <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Windows PC</p>
                                  <p className="text-xs text-muted-foreground">Chrome • New York, USA</p>
                                </div>
                              </div>
                              <Badge>Current</Badge>
                            </div>
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">iPhone 13</p>
                                  <p className="text-xs text-muted-foreground">Safari • New York, USA</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Log Out
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
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

                {/* IoT Devices Settings */}
                <TabsContent value="iot" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>IoT Device Management</CardTitle>
                      <CardDescription>Connect and manage IoT devices in your surveillance network</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Connected Devices</h3>
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Add Device
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* Connected Devices list */}
                        <div className="rounded-md border">
                          <div className="p-4 border-b">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                                  <Camera className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Smart Camera HC200</p>
                                  <p className="text-xs text-muted-foreground">
                                    IP: 192.168.1.45 • MAC: 00:1B:44:11:3A:B7
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="gap-1 border-green-500 text-green-600 dark:text-green-400"
                              >
                                <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                              </Badge>
                            </div>
                            <div className="mt-3 flex gap-2 justify-end">
                              <Button variant="outline" size="sm">
                                Configure
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                Disconnect
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 border-b">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                                  <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Motion Sensor MS100</p>
                                  <p className="text-xs text-muted-foreground">
                                    IP: 192.168.1.46 • MAC: 00:1B:44:11:3A:C8
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="gap-1 border-green-500 text-green-600 dark:text-green-400"
                              >
                                <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                              </Badge>
                            </div>
                            <div className="mt-3 flex gap-2 justify-end">
                              <Button variant="outline" size="sm">
                                Configure
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                Disconnect
                              </Button>
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                                  <Speaker className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium">Smart Alarm SA50</p>
                                  <p className="text-xs text-muted-foreground">
                                    IP: 192.168.1.47 • MAC: 00:1B:44:11:3A:D9
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="gap-1 border-gray-500 text-gray-600 dark:text-gray-400"
                              >
                                <span className="h-2 w-2 rounded-full bg-gray-500"></span> Offline
                              </Badge>
                            </div>
                            <div className="mt-3 flex gap-2 justify-end">
                              <Button variant="outline" size="sm">
                                Configure
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                Disconnect
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Discover New Devices</h3>
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Scan Network
                          </Button>
                        </div>

                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                    <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Motion Sensor MS101</p>
                                    <p className="text-xs text-muted-foreground">
                                      IP: 192.168.1.50 • MAC: 00:1B:44:11:3A:E0
                                    </p>
                                  </div>
                                </div>
                                <Button size="sm">Connect</Button>
                              </div>

                              <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                    <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Smart Camera HC201</p>
                                    <p className="text-xs text-muted-foreground">
                                      IP: 192.168.1.51 • MAC: 00:1B:44:11:3A:F1
                                    </p>
                                  </div>
                                </div>
                                <Button size="sm">Connect</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Device Settings</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-discover">Auto-discover new devices</Label>
                            <Switch id="auto-discover" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="secure-connect">Secure Connection (TLS)</Label>
                            <Switch id="secure-connect" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="device-alerts">Device Status Alerts</Label>
                            <Switch id="device-alerts" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* API & Integrations Settings */}
                <TabsContent value="api" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>API & Integrations</CardTitle>
                      <CardDescription>Connect with third-party services and manage API access</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">API Access</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="api-enabled">Enable API Access</Label>
                            <Switch id="api-enabled" defaultChecked />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="api-key">API Key</Label>
                            <div className="flex gap-2">
                              <Input
                                id="api-key"
                                type="password"
                                value="●●●●●●●●●●●●●●●●●●●●"
                                readOnly
                                className="flex-1"
                              />
                              <Button variant="outline">Regenerate</Button>
                              <Button variant="outline">Copy</Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Your API key provides full access to your account. Keep it secure and never share it
                              publicly.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>API Access Permissions</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="read-access" defaultChecked />
                              <Label htmlFor="read-access" className="text-sm">
                                Read Access
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="write-access" defaultChecked />
                              <Label htmlFor="write-access" className="text-sm">
                                Write Access
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="camera-access" defaultChecked />
                              <Label htmlFor="camera-access" className="text-sm">
                                Camera Access
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="user-access" />
                              <Label htmlFor="user-access" className="text-sm">
                                User Management
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Connected Services</h3>
                          <Button size="sm">Add Service</Button>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-md border p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="rounded-md bg-blue-100 p-1 dark:bg-blue-900/30">
                                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" fill="#1976D2" />
                                    <path
                                      d="M20 12H17V19H15V12H12V10H20V12ZM9 8H11V19H9V8ZM4 8H6V19H4V8Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium">Slack Integration</p>
                                  <p className="text-xs text-muted-foreground">Connected on Mar 15, 2023</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Configure
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                  Disconnect
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-md border p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="rounded-md bg-blue-100 p-1 dark:bg-blue-900/30">
                                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" fill="#03A9F4" />
                                    <path
                                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium">Google Home</p>
                                  <p className="text-xs text-muted-foreground">Connected on Feb 22, 2023</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Configure
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                  Disconnect
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Webhooks</h3>

                        <div className="space-y-2">
                          <Label htmlFor="webhook-url">Webhook URL</Label>
                          <div className="flex gap-2">
                            <Input id="webhook-url" placeholder="https://example.com/webhook" className="flex-1" />
                            <Button>Save</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Webhook will receive notifications for all events in your account.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Webhook Events</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="motion-events" defaultChecked />
                              <Label htmlFor="motion-events" className="text-sm">
                                Motion Detection
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="person-events" defaultChecked />
                              <Label htmlFor="person-events" className="text-sm">
                                Person Detection
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="camera-events" defaultChecked />
                              <Label htmlFor="camera-events" className="text-sm">
                                Camera Status
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="system-events" />
                              <Label htmlFor="system-events" className="text-sm">
                                System Events
                              </Label>
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

                {/* Audit Log Settings */}
                <TabsContent value="audit" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audit Log</CardTitle>
                      <CardDescription>
                        Track user actions and system events for compliance and security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex gap-4 items-center justify-between">
                        <div className="relative flex-1">
                          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search audit logs..." className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Start Date
                          </Button>
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            End Date
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4 border-b">
                          <div className="flex flex-1 items-center gap-3">
                            <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <p className="font-medium">User Login</p>
                                <p className="text-xs text-muted-foreground">Today, 09:42 AM</p>
                              </div>
                              <p className="text-sm text-muted-foreground">Admin user logged in from 192.168.1.100</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border-b">
                          <div className="flex flex-1 items-center gap-3">
                            <div className="rounded-full bg-yellow-100 p-1 dark:bg-yellow-900/30">
                              <Settings className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <p className="font-medium">Settings Changed</p>
                                <p className="text-xs text-muted-foreground">Today, 09:30 AM</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Camera settings updated for Front Entrance Camera
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border-b">
                          <div className="flex flex-1 items-center gap-3">
                            <div className="rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                              <Cpu className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <p className="font-medium">Device Connected</p>
                                <p className="text-xs text-muted-foreground">Today, 09:15 AM</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                New IoT device connected: Motion Sensor MS100
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4">
                          <div className="flex flex-1 items-center gap-3">
                            <div className="rounded-full bg-red-100 p-1 dark:bg-red-900/30">
                              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <p className="font-medium">Failed Login Attempt</p>
                                <p className="text-xs text-muted-foreground">Today, 08:55 AM</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Failed login attempt from IP: 192.168.1.105
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Showing 4 of 120 entries</div>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" disabled>
                            Previous
                          </Button>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="retention">Audit Log Retention (Days)</Label>
                          <Input id="retention" type="number" defaultValue="90" className="w-20" />
                        </div>
                        <Button className="ml-auto">Save Settings</Button>
                      </div>
                    </CardFooter>
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

