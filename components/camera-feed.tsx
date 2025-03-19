"use client";

import { useState } from "react";
import {
  Play,
  Volume2,
  Maximize,
  MoreVertical,
  Pause,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface CameraFeedProps {
  id?: string;
  host?: string;
  port?: number;
  name: string;
  username?: string;
  password?: string;
  provider?: string;
  status?: "online" | "offline" | "recording";
  stream_url?: string;
  location?: string;
  className?: string;
  isLoading?: boolean;
  onViewClick?: () => void;
  onSettingsClick?: () => void;
}

export function CameraFeed({
  id,
  name,
  location,
  status = "online",
  stream_url = "/placeholder.svg?height=300&width=500",
  className,
  isLoading = false,
  onViewClick,
  onSettingsClick,
}: CameraFeedProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    onViewClick?.();
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card shadow-subtle transition-all hover:shadow-elevated h-full",
        className
      )}
    >
      {isLoading ? (
        <div className="aspect-video w-full">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={stream_url || "/placeholder.svg"}
            alt={`Camera feed: ${name}`}
            className="h-full w-full object-cover opacity-80"
          />

          {/* Status indicator */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full",
                  status === "online" && "bg-green-500",
                  status === "offline" && "bg-gray-500",
                  status === "recording" && "bg-red-500"
                )}
              />
              {status === "online" && (
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              )}
              {status === "recording" && (
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              )}
            </div>
            <Badge
              variant="outline"
              className={cn(
                "bg-black/50 text-white backdrop-blur-sm",
                status === "online" && "border-green-500",
                status === "offline" && "border-gray-500",
                status === "recording" && "border-red-500"
              )}
            >
              {status === "online" && "Live"}
              {status === "offline" && "Offline"}
              {status === "recording" && "Recording"}
            </Badge>
          </div>

          {/* Camera info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white opacity-100 transition-opacity">
            <h3 className="font-medium">{name}</h3>
            {location && <p className="text-xs text-gray-300">{location}</p>}
          </div>

          {/* Controls - visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/70 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handlePlayToggle}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-red-400" />
                ) : (
                  <Play className="h-4 w-4 text-green-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-green-400" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleFullscreenToggle}
              >
                <Maximize className="h-4 w-4 text-blue-400" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    <MoreVertical className="h-4 w-4 text-amber-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => alert("Screenshot taken")}>
                    Take Screenshot
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert("Recording started")}>
                    Start Recording
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettingsClick}>
                    Camera Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
