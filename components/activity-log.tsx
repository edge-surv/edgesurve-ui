"use client"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface ActivityItem {
  id: string
  type: "motion" | "person" | "alert" | "system" | "info"
  message: string
  camera?: string
  timestamp: string
  details?: string
  hasVideo?: boolean
}

interface ActivityLogProps {
  items: ActivityItem[]
  className?: string
  isLoading?: boolean
  onItemClick?: (item: ActivityItem) => void
  onViewAllClick?: () => void
}

export function ActivityLog({
  items = [],
  className,
  isLoading = false,
  onItemClick,
  onViewAllClick,
}: ActivityLogProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-subtle", className)}>
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">Activity Log</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="ml-auto">
            {isLoading ? "..." : `${items.length} events`}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onViewAllClick}>
            View All
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-56px)]">
        <div className="p-4">
          {isLoading ? (
            // Loading skeletons
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="mb-4 flex items-start gap-3 last:mb-0">
                  <Skeleton className="mt-1 h-2 w-2 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
              ))
          ) : items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-start gap-3 last:mb-0 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => onItemClick?.(item)}
              >
                <div
                  className={cn(
                    "mt-1 h-2 w-2 rounded-full",
                    item.type === "motion" && "bg-blue-500",
                    item.type === "person" && "bg-purple-500",
                    item.type === "alert" && "bg-red-500",
                    item.type === "system" && "bg-yellow-500",
                    item.type === "info" && "bg-gray-500",
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.message}</p>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  {item.camera && <p className="text-xs text-muted-foreground">{item.camera}</p>}
                  {item.details && <p className="mt-1 text-xs text-muted-foreground">{item.details}</p>}
                  {item.hasVideo && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      View associated video
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No activity logs available</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

