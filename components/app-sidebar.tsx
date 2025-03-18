"use client";

import type React from "react";

import {
  Bell,
  Camera,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logo from "@/public/logo.png";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const handleLogout = () => {
    // Simulate logout process
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleProfileClick = () => {
    router.push("/settings");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
    },
    {
      title: "Livestream",
      icon: Video,
      url: "/livestream",
    },
    {
      title: "Camera",
      icon: Camera,
      url: "/cameras",
    },
    {
      title: "Intelligent Search",
      icon: Search,
      url: "/search",
    },
    {
      title: "Notifications",
      icon: Bell,
      url: "/notifications",
      badge: unreadNotifications.toString(),
    },
    {
      title: "Help Center",
      icon: HelpCircle,
      url: "/help",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
    },
  ];

  return (
    <Sidebar className="border-r" {...props}>
      <div className="px-3 py-2">
        <Image
          src={logo}
          alt="EdgeSurv Logo"
          width={200}
          height={30}
          className="w-auto object-contain"
          priority
        />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    onClick={() => {
                      if (
                        item.title === "Notifications" &&
                        unreadNotifications > 0
                      ) {
                        setUnreadNotifications(0);
                      }
                    }}
                  >
                    <Link href={item.url} className="group">
                      <item.icon className="transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.title}</span>
                      {item.badge && Number.parseInt(item.badge) > 0 && (
                        <Badge className="ml-auto bg-primary text-primary-foreground">
                          {item.badge}
                        </Badge>
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

          <Separator className="mx-2 mb-4 bg-sidebar-border" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full mb-2 border-none ring-0"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleLogout} className="w-full mb-2">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            EdgeSurv © {new Date().getFullYear()}
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
