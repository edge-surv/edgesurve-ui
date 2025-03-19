"use client";

import type React from "react";

import {
  Bell,
  Camera,
  HelpCircle,
  LayoutDashboard,
  Search,
  Settings,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import logo from "@/public/logo.png";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const handleLogout = () => {
    // Simulate logout process
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

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
      color: "text-purple-500",
    },
    {
      title: "Cameras",
      icon: Camera,
      url: "/cameras",
      color: "text-green-500",
    },
    {
      title: "Intelligent Search",
      icon: Search,
      url: "/search",
      color: "text-amber-500",
    },
    {
      title: "Notifications",
      icon: Bell,
      url: "/notifications",
      color: "text-red-500",
      badge: unreadNotifications.toString(),
    },
    {
      title: "Help Center",
      icon: HelpCircle,
      url: "/help",
      color: "text-indigo-500",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
      color: "text-teal-500",
    },
  ];

  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader className="pt-2 pb-4">
        <div className="px-3 py-2">
          <Image
            src={logo}
            alt="EdgeSurv logo"
            height={40}
            width={120}
            className="object-contain"
            priority
          />
        </div>
        <Separator className="mx-2 bg-sidebar-border" />
      </SidebarHeader>
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
                      <item.icon
                        className={`transition-transform duration-300 group-hover:scale-110 ${item.color}`}
                      />
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

      <SidebarRail />
    </Sidebar>
  );
}
