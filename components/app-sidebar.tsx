"use client"

import type React from "react"

import { useState } from "react"
import {
  Camera,
  LayoutDashboard,
  Search,
  Settings,
  Video,
  Bell,
  User,
  LogOut,
  ChevronDown,
  HelpCircle,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

import { Logo } from "@/components/logo"
import { useTheme } from "@/components/theme-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  const handleLogout = () => {
    // Simulate logout process
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  const handleProfileClick = () => {
    router.push("/settings")
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
      color: "text-blue-500",
    },
    {
      title: "Livestream",
      icon: Video,
      url: "/livestream",
      color: "text-red-500",
    },
    {
      title: "Camera",
      icon: Camera,
      url: "/camera-settings",
      color: "text-green-500",
    },
    {
      title: "Intelligent Search",
      icon: Search,
      url: "/search",
      color: "text-purple-500",
    },
    {
      title: "Notifications",
      icon: Bell,
      url: "/notifications",
      badge: unreadNotifications.toString(),
      color: "text-yellow-500",
    },
    {
      title: "Help Center",
      icon: HelpCircle,
      url: "/help",
      color: "text-teal-500",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
      color: "text-gray-500",
    },
  ]

  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader className="pt-2 pb-4">
        <div className="px-3 py-2">
          <Logo className="w-full h-auto transition-all duration-300 hover:scale-105" />
        </div>
        <Separator className="mx-2 bg-sidebar-border" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    onClick={() => {
                      if (item.title === "Notifications" && unreadNotifications > 0) {
                        setUnreadNotifications(0)
                      }
                    }}
                  >
                    <Link href={item.url} className="group">
                      <item.icon className={`transition-transform duration-300 group-hover:scale-110 ${item.color}`} />
                      <span>{item.title}</span>
                      {item.badge && Number.parseInt(item.badge) > 0 && (
                        <Badge className="ml-auto bg-primary text-primary-foreground">{item.badge}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          {/* User profile section */}
          <div className="px-3 py-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userInfo.avatar} alt="User" />
                    <AvatarFallback>
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col items-start text-left">
                    <span className="text-sm font-medium">{userInfo.name}</span>
                    <span className="text-xs text-muted-foreground">{userInfo.email}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="mx-2 mb-4 bg-sidebar-border" />
          <div className="mt-4 text-center text-xs text-muted-foreground">EdgeSurve v1.0.0</div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

