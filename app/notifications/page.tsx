"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bell,
  BellOff,
  Camera,
  Settings,
  User,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Smartphone,
  Filter,
  Trash2,
  MoreHorizontal,
  Search,
  Eye,
  EyeOff,
  Send,
  RefreshCw,
  Save,
  X,
  Monitor,
  HardDrive,
  Plus,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Add the useToast import at the top with the other imports
import { useToast } from "@/hooks/use-toast"

// Define notification types
type NotificationPriority = "high" | "medium" | "low"
type NotificationType = "alert" | "system" | "info" | "success"

interface Notification {
  id: string
  title: string
  description: string
  type: NotificationType
  priority: NotificationPriority
  time: string
  date: string
  unread: boolean
  actions?: string[]
  source?: string
  camera?: string
  relatedTo?: string
}

// Replace the NotificationsPage function with this updated version that includes button functionality
export default function NotificationsPage() {
  // Add toast functionality
  const { toast } = useToast()

  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "priority">("newest")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Add state to track if settings are being saved
  const [isSavingEmailSettings, setIsSavingEmailSettings] = useState(false)
  const [isSavingPushSettings, setIsSavingPushSettings] = useState(false)
  const [isSavingNotificationSettings, setIsSavingNotificationSettings] = useState(false)

  // Email notification settings
  const [emailSettings, setEmailSettings] = useState({
    enabled: false,
    address: "",
    frequency: "immediate",
    digest: false,
    digestTime: "08:00",
    highPriorityOnly: false,
  })

  // Push notification settings
  const [pushSettings, setPushSettings] = useState({
    enabled: false,
    devices: [],
    highPriorityOnly: false,
    quietHours: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
  })

  // Notification type settings
  const [notificationTypeSettings, setNotificationTypeSettings] = useState({
    motionDetection: { enabled: false, priority: "medium", email: false, push: false },
    personDetection: { enabled: false, priority: "high", email: false, push: false },
    cameraOffline: { enabled: false, priority: "high", email: false, push: false },
    systemUpdates: { enabled: false, priority: "low", email: false, push: false },
    storageAlerts: { enabled: false, priority: "medium", email: false, push: false },
    userLogin: { enabled: false, priority: "low", email: false, push: false },
  })

  // Sample notification data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set empty notifications array
      setNotifications([])
      setFilteredNotifications([])
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Filter and sort notifications
  useEffect(() => {
    let filtered = [...notifications]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(query) ||
          notification.description.toLowerCase().includes(query) ||
          (notification.camera && notification.camera.toLowerCase().includes(query)),
      )
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((notification) => notification.type === filterType)
    }

    // Filter by priority
    if (filterPriority !== "all") {
      filtered = filtered.filter((notification) => notification.priority === filterPriority)
    }

    // Filter by read/unread
    if (showUnreadOnly) {
      filtered = filtered.filter((notification) => notification.unread)
    }

    // Sort notifications
    switch (sortOrder) {
      case "newest":
        // Already sorted by newest in our sample data
        break
      case "oldest":
        filtered = [...filtered].reverse()
        break
      case "priority":
        filtered = [...filtered].sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        })
        break
    }

    setFilteredNotifications(filtered)
  }, [notifications, searchQuery, filterType, filterPriority, sortOrder, showUnreadOnly])

  // Handle marking notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, unread: false } : notification)),
    )
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  // Handle marking all as read
  const markAllAsRead = () => {
    if (notifications.length === 0) {
      toast({
        title: "No notifications",
        description: "There are no notifications to mark as read.",
      })
      return
    }

    setNotifications((prev) => prev.map((notification) => ({ ...notification, unread: false })))
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  // Handle deleting a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted.",
    })
  }

  // Handle clearing all notifications
  const clearAllNotifications = () => {
    if (notifications.length === 0) {
      toast({
        title: "No notifications",
        description: "There are no notifications to clear.",
      })
      return
    }

    setNotifications([])
    toast({
      title: "All notifications cleared",
      description: "All notifications have been cleared.",
    })
  }

  // Handle saving email settings
  const saveEmailSettings = async () => {
    // Validate email if enabled
    if (emailSettings.enabled && !emailSettings.address) {
      toast({
        title: "Email address required",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    setIsSavingEmailSettings(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Email settings saved",
        description: emailSettings.enabled
          ? "Email notifications have been enabled."
          : "Email notifications have been disabled.",
      })
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your email settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSavingEmailSettings(false)
    }
  }

  // Handle saving push settings
  const savePushSettings = async () => {
    setIsSavingPushSettings(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Push settings saved",
        description: pushSettings.enabled
          ? "Push notifications have been enabled."
          : "Push notifications have been disabled.",
      })
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your push settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSavingPushSettings(false)
    }
  }

  // Handle saving notification type settings
  const saveNotificationTypeSettings = async () => {
    setIsSavingNotificationSettings(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Count enabled notification types
      const enabledCount = Object.values(notificationTypeSettings).filter((setting) => setting.enabled).length

      toast({
        title: "Notification settings saved",
        description: `${enabledCount} notification types have been configured.`,
      })
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSavingNotificationSettings(false)
    }
  }

  // Handle adding a device
  const addDevice = () => {
    // Simulate adding a new device
    const newDevice = "New Device"
    setPushSettings((prev) => ({
      ...prev,
      devices: [...prev.devices, newDevice],
    }))

    toast({
      title: "Device added",
      description: "A new device has been added for push notifications.",
    })
  }

  // Handle removing a device
  const removeDevice = (index: number) => {
    setPushSettings((prev) => ({
      ...prev,
      devices: prev.devices.filter((_, i) => i !== index),
    }))

    toast({
      title: "Device removed",
      description: "The device has been removed from push notifications.",
    })
  }

  // Get unread count
  const unreadCount = notifications.filter((n) => n.unread).length

  // Get notification type color
  const getNotificationTypeColor = (type: NotificationType) => {
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

  // Get notification type icon
  const getNotificationTypeIcon = (type: NotificationType) => {
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

  // Get priority badge
  const getPriorityBadge = (priority: NotificationPriority) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  // Update notification type settings
  const updateNotificationTypeSetting = (
    type: keyof typeof notificationTypeSettings,
    field: keyof typeof notificationTypeSettings.motionDetection,
    value: any,
  ) => {
    setNotificationTypeSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  // Handle forward to email
  const forwardToEmail = () => {
    if (!emailSettings.enabled || !emailSettings.address) {
      toast({
        title: "Email not configured",
        description: "Please configure your email settings first.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Notification forwarded",
      description: `The notification has been forwarded to ${emailSettings.address}.`,
    })
  }

  // Handle view camera
  const viewCamera = (camera: string) => {
    toast({
      title: "Viewing camera",
      description: `Navigating to ${camera} camera view.`,
    })
  }

  // Handle mute all notifications
  const muteAllNotifications = () => {
    toast({
      title: "Notifications muted",
      description: "All notifications have been muted for 1 hour.",
    })
  }

  // Handle refresh notifications
  const refreshNotifications = async () => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notifications refreshed",
        description: "Your notifications have been refreshed.",
      })
    } catch (error) {
      toast({
        title: "Error refreshing",
        description: "There was an error refreshing your notifications. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
              {unreadCount > 0 && <Badge variant="primary">{unreadCount} Unread</Badge>}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1" onClick={markAllAsRead}>
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">Mark All Read</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark all as read</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1" onClick={muteAllNotifications}>
                      <BellOff className="h-4 w-4" />
                      <span className="hidden sm:inline">Mute All</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mute all notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                >
                  {showUnreadOnly ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  {showUnreadOnly ? "Show All" : "Unread Only"}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter Notifications</DialogTitle>
                      <DialogDescription>Customize which notifications you want to see.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="filter-type">Notification Type</Label>
                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger id="filter-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="alert">Alerts</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="info">Information</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="filter-priority">Priority</Label>
                        <Select value={filterPriority} onValueChange={setFilterPriority}>
                          <SelectTrigger id="filter-priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sort-order">Sort Order</Label>
                        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
                          <SelectTrigger id="sort-order">
                            <SelectValue placeholder="Select sort order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="priority">Priority (High to Low)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFilterType("all")
                          setFilterPriority("all")
                          setSortOrder("newest")
                          setShowUnreadOnly(false)
                        }}
                      >
                        Reset
                      </Button>
                      <Button type="submit">Apply Filters</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="mt-4 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>All Notifications</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                        onClick={clearAllNotifications}
                        disabled={notifications.length === 0}
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={refreshNotifications}>
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin">
                          <RefreshCw className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                    ) : filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`mb-4 rounded-lg p-4 ${notification.unread ? "bg-muted/50" : ""} ${
                            notification.id !== filteredNotifications[filteredNotifications.length - 1].id
                              ? "border-b pb-4"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                              {getNotificationTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p
                                      className={`font-medium ${
                                        notification.unread ? "text-foreground" : "text-muted-foreground"
                                      }`}
                                    >
                                      {notification.title}
                                    </p>
                                    {getPriorityBadge(notification.priority)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                                  {notification.camera && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      <span className="font-medium">Camera:</span> {notification.camera}
                                    </p>
                                  )}
                                  {notification.source && (
                                    <p className="text-xs text-muted-foreground">
                                      <span className="font-medium">Source:</span> {notification.source}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-col items-end">
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        {notification.unread && (
                                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Mark as read
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={forwardToEmail}>
                                          <Send className="mr-2 h-4 w-4" />
                                          Forward to email
                                        </DropdownMenuItem>
                                        {notification.camera && (
                                          <DropdownMenuItem onClick={() => viewCamera(notification.camera)}>
                                            <Camera className="mr-2 h-4 w-4" />
                                            View camera
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{notification.date}</p>
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
                        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No notifications found</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {searchQuery || filterType !== "all" || filterPriority !== "all" || showUnreadOnly
                            ? "Try adjusting your filters"
                            : "You're all caught up!"}
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {filteredNotifications.length > 0
                      ? `Showing ${filteredNotifications.length} of ${notifications.length} notifications`
                      : "No notifications"}
                  </div>
                  <Button variant="outline" disabled={filteredNotifications.length === 0}>
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
                    {isLoading ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin">
                          <RefreshCw className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                    ) : filteredNotifications.filter((notification) => notification.type === "alert").length > 0 ? (
                      filteredNotifications
                        .filter((notification) => notification.type === "alert")
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className={`mb-4 rounded-lg p-4 ${notification.unread ? "bg-muted/50" : ""} ${
                              notification.id !==
                              filteredNotifications.filter((n) => n.type === "alert")[
                                filteredNotifications.filter((n) => n.type === "alert").length - 1
                              ].id
                                ? "border-b pb-4"
                                : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                                {getNotificationTypeIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p
                                        className={`font-medium ${
                                          notification.unread ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                      >
                                        {notification.title}
                                      </p>
                                      {getPriorityBadge(notification.priority)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    {notification.camera && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        <span className="font-medium">Camera:</span> {notification.camera}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {notification.unread && (
                                            <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                              <Eye className="mr-2 h-4 w-4" />
                                              Mark as read
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuItem onClick={forwardToEmail}>
                                            <Send className="mr-2 h-4 w-4" />
                                            Forward to email
                                          </DropdownMenuItem>
                                          {notification.camera && (
                                            <DropdownMenuItem onClick={() => viewCamera(notification.camera)}>
                                              <Camera className="mr-2 h-4 w-4" />
                                              View camera
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{notification.date}</p>
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
                        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No alert notifications found</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {searchQuery || filterPriority !== "all" || showUnreadOnly
                            ? "Try adjusting your filters"
                            : "You're all caught up!"}
                        </p>
                      </div>
                    )}
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
                    {isLoading ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin">
                          <RefreshCw className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                    ) : filteredNotifications.filter((notification) => notification.type === "system").length > 0 ? (
                      filteredNotifications
                        .filter((notification) => notification.type === "system")
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className={`mb-4 rounded-lg p-4 ${notification.unread ? "bg-muted/50" : ""} ${
                              notification.id !==
                              filteredNotifications.filter((n) => n.type === "system")[
                                filteredNotifications.filter((n) => n.type === "system").length - 1
                              ].id
                                ? "border-b pb-4"
                                : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                                {getNotificationTypeIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p
                                        className={`font-medium ${
                                          notification.unread ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                      >
                                        {notification.title}
                                      </p>
                                      {getPriorityBadge(notification.priority)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    {notification.source && (
                                      <p className="text-xs text-muted-foreground">
                                        <span className="font-medium">Source:</span> {notification.source}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {notification.unread && (
                                            <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                              <Eye className="mr-2 h-4 w-4" />
                                              Mark as read
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuItem onClick={forwardToEmail}>
                                            <Send className="mr-2 h-4 w-4" />
                                            Forward to email
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                                    {notification.unread && (
                                      <Badge variant="primary" className="mt-1 h-2 w-2 rounded-full p-0" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No system notifications found</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {searchQuery || filterPriority !== "all" || showUnreadOnly
                            ? "Try adjusting your filters"
                            : "You're all caught up!"}
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Email Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Notifications
                    </CardTitle>
                    <CardDescription>Configure how you receive email notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                      <Switch
                        id="email-enabled"
                        checked={emailSettings.enabled}
                        onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enabled: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input
                        id="email-address"
                        type="email"
                        value={emailSettings.address}
                        onChange={(e) => setEmailSettings({ ...emailSettings, address: e.target.value })}
                        disabled={!emailSettings.enabled}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-frequency">Notification Frequency</Label>
                      <Select
                        value={emailSettings.frequency}
                        onValueChange={(value) => setEmailSettings({ ...emailSettings, frequency: value })}
                        disabled={!emailSettings.enabled}
                      >
                        <SelectTrigger id="email-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(emailSettings.frequency === "hourly" || emailSettings.frequency === "daily") && (
                      <div className="space-y-2">
                        <Label htmlFor="digest-time">Digest Time</Label>
                        <Input
                          id="digest-time"
                          type="time"
                          value={emailSettings.digestTime}
                          onChange={(e) => setEmailSettings({ ...emailSettings, digestTime: e.target.value })}
                          disabled={!emailSettings.enabled}
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="high-priority-only"
                        checked={emailSettings.highPriorityOnly}
                        onCheckedChange={(checked) =>
                          setEmailSettings({ ...emailSettings, highPriorityOnly: checked as boolean })
                        }
                        disabled={!emailSettings.enabled}
                      />
                      <Label htmlFor="high-priority-only">High priority notifications only</Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      disabled={!emailSettings.enabled}
                      onClick={saveEmailSettings}
                      isLoading={isSavingEmailSettings}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Email Settings
                    </Button>
                  </CardFooter>
                </Card>

                {/* Push Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Push Notifications
                    </CardTitle>
                    <CardDescription>Configure push notifications to your devices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                      <Switch
                        id="push-enabled"
                        checked={pushSettings.enabled}
                        onCheckedChange={(checked) => setPushSettings({ ...pushSettings, enabled: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Registered Devices</Label>
                        <Button variant="outline" size="sm" onClick={addDevice} disabled={!pushSettings.enabled}>
                          <Plus className="h-4 w-4 mr-1" /> Add Device
                        </Button>
                      </div>
                      <div className="rounded-md border p-4">
                        {pushSettings.devices.length > 0 ? (
                          <div className="space-y-2">
                            {pushSettings.devices.map((device, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {device.includes("Mobile") ? (
                                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Monitor className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span>{device}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => removeDevice(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center">No devices registered</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push-high-priority"
                        checked={pushSettings.highPriorityOnly}
                        onCheckedChange={(checked) =>
                          setPushSettings({ ...pushSettings, highPriorityOnly: checked as boolean })
                        }
                        disabled={!pushSettings.enabled}
                      />
                      <Label htmlFor="push-high-priority">High priority notifications only</Label>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                        <Switch
                          id="quiet-hours"
                          checked={pushSettings.quietHours}
                          onCheckedChange={(checked) => setPushSettings({ ...pushSettings, quietHours: checked })}
                          disabled={!pushSettings.enabled}
                        />
                      </div>

                      {pushSettings.quietHours && (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="quiet-start">Start Time</Label>
                            <Input
                              id="quiet-start"
                              type="time"
                              value={pushSettings.quietHoursStart}
                              onChange={(e) => setPushSettings({ ...pushSettings, quietHoursStart: e.target.value })}
                              disabled={!pushSettings.enabled}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quiet-end">End Time</Label>
                            <Input
                              id="quiet-end"
                              type="time"
                              value={pushSettings.quietHoursEnd}
                              onChange={(e) => setPushSettings({ ...pushSettings, quietHoursEnd: e.target.value })}
                              disabled={!pushSettings.enabled}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      disabled={!pushSettings.enabled}
                      onClick={savePushSettings}
                      isLoading={isSavingPushSettings}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Push Settings
                    </Button>
                  </CardFooter>
                </Card>

                {/* Notification Type Settings */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Notification Types & Priorities</CardTitle>
                    <CardDescription>Configure which notifications you receive and their priority</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Notification Type</th>
                            <th className="text-center py-3 px-2">Enabled</th>
                            <th className="text-center py-3 px-2">Priority</th>
                            <th className="text-center py-3 px-2">Email</th>
                            <th className="text-center py-3 px-2">Push</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <Camera className="h-4 w-4 text-blue-500" />
                                <span>Motion Detection</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Switch
                                checked={notificationTypeSettings.motionDetection.enabled}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("motionDetection", "enabled", checked)
                                }
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Select
                                value={notificationTypeSettings.motionDetection.priority}
                                onValueChange={(value) =>
                                  updateNotificationTypeSetting("motionDetection", "priority", value)
                                }
                                disabled={!notificationTypeSettings.motionDetection.enabled}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.motionDetection.email}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("motionDetection", "email", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.motionDetection.enabled}
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.motionDetection.push}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("motionDetection", "push", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.motionDetection.enabled}
                              />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-purple-500" />
                                <span>Person Detection</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Switch
                                checked={notificationTypeSettings.personDetection.enabled}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("personDetection", "enabled", checked)
                                }
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Select
                                value={notificationTypeSettings.personDetection.priority}
                                onValueChange={(value) =>
                                  updateNotificationTypeSetting("personDetection", "priority", value)
                                }
                                disabled={!notificationTypeSettings.personDetection.enabled}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.personDetection.email}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("personDetection", "email", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.personDetection.enabled}
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.personDetection.push}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("personDetection", "push", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.personDetection.enabled}
                              />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <Camera className="h-4 w-4 text-red-500" />
                                <span>Camera Offline</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Switch
                                checked={notificationTypeSettings.cameraOffline.enabled}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("cameraOffline", "enabled", checked)
                                }
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Select
                                value={notificationTypeSettings.cameraOffline.priority}
                                onValueChange={(value) =>
                                  updateNotificationTypeSetting("cameraOffline", "priority", value)
                                }
                                disabled={!notificationTypeSettings.cameraOffline.enabled}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.cameraOffline.email}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("cameraOffline", "email", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.cameraOffline.enabled}
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.cameraOffline.push}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("cameraOffline", "push", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.cameraOffline.enabled}
                              />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <Settings className="h-4 w-4 text-yellow-500" />
                                <span>System Updates</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Switch
                                checked={notificationTypeSettings.systemUpdates.enabled}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("systemUpdates", "enabled", checked)
                                }
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Select
                                value={notificationTypeSettings.systemUpdates.priority}
                                onValueChange={(value) =>
                                  updateNotificationTypeSetting("systemUpdates", "priority", value)
                                }
                                disabled={!notificationTypeSettings.systemUpdates.enabled}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.systemUpdates.email}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("systemUpdates", "email", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.systemUpdates.enabled}
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.systemUpdates.push}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("systemUpdates", "push", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.systemUpdates.enabled}
                              />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4 text-green-500" />
                                <span>Storage Alerts</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Switch
                                checked={notificationTypeSettings.storageAlerts.enabled}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("storageAlerts", "enabled", checked)
                                }
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Select
                                value={notificationTypeSettings.storageAlerts.priority}
                                onValueChange={(value) =>
                                  updateNotificationTypeSetting("storageAlerts", "priority", value)
                                }
                                disabled={!notificationTypeSettings.storageAlerts.enabled}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.storageAlerts.email}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("storageAlerts", "email", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.storageAlerts.enabled}
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.storageAlerts.push}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("storageAlerts", "push", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.storageAlerts.enabled}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-indigo-500" />
                                <span>User Login</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Switch
                                checked={notificationTypeSettings.userLogin.enabled}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("userLogin", "enabled", checked)
                                }
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Select
                                value={notificationTypeSettings.userLogin.priority}
                                onValueChange={(value) => updateNotificationTypeSetting("userLogin", "priority", value)}
                                disabled={!notificationTypeSettings.userLogin.enabled}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.userLogin.email}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("userLogin", "email", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.userLogin.enabled}
                              />
                            </td>
                            <td className="text-center py-3 px-2">
                              <Checkbox
                                checked={notificationTypeSettings.userLogin.push}
                                onCheckedChange={(checked) =>
                                  updateNotificationTypeSetting("userLogin", "push", checked as boolean)
                                }
                                disabled={!notificationTypeSettings.userLogin.enabled}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={saveNotificationTypeSettings}
                      isLoading={isSavingNotificationSettings}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Notification Settings
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

