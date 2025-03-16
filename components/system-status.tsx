"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

interface SystemStatusProps {
  className?: string
  isLoading?: boolean
  onStatusClick?: (status: string) => void
}

export function SystemStatus({ className, isLoading = false, onStatusClick }: SystemStatusProps) {
  // Update the system data to have empty/default values
  const [systemData, setSystemData] = useState({
    storage: { used: 0, status: "normal" },
    cpu: { used: 0, status: "normal" },
    memory: { used: 0, status: "normal" },
    network: { used: 0, status: "normal" },
  })

  return (
    <div className={cn("rounded-xl border bg-card shadow-subtle", className)}>
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">System Status</h3>
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Healthy
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-6">
          <div
            className="space-y-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
            onClick={() => onStatusClick?.("Storage")}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Storage</span>
              {isLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span className="text-sm text-muted-foreground">{systemData.storage.used}% used</span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Progress value={systemData.storage.used} className="h-2" />
            )}
          </div>

          <div
            className="space-y-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
            onClick={() => onStatusClick?.("CPU")}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CPU</span>
              {isLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span className="text-sm text-muted-foreground">{systemData.cpu.used}%</span>
              )}
            </div>
            {isLoading ? <Skeleton className="h-2 w-full" /> : <Progress value={systemData.cpu.used} className="h-2" />}
          </div>

          <div
            className="space-y-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
            onClick={() => onStatusClick?.("Memory")}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Memory</span>
              {isLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span className="text-sm text-muted-foreground">{systemData.memory.used}%</span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Progress value={systemData.memory.used} className="h-2" />
            )}
          </div>

          <div
            className="space-y-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
            onClick={() => onStatusClick?.("Network")}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network</span>
              {isLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span className="text-sm text-muted-foreground">{systemData.network.used}%</span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Progress value={systemData.network.used} className="h-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

