"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
  isLoading?: boolean
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  isLoading = false,
  onClick,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-6 shadow-subtle transition-all hover:shadow-elevated",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {isLoading ? <Skeleton className="mt-2 h-8 w-16" /> : <h3 className="mt-2 text-3xl font-bold">{value}</h3>}
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          {trend &&
            trendValue &&
            (isLoading ? (
              <Skeleton className="mt-3 h-6 w-24" />
            ) : (
              <div className="mt-3 flex items-center">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    trend === "up" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                    trend === "down" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                    trend === "neutral" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                  )}
                >
                  {trend === "up" && "↑"}
                  {trend === "down" && "↓"}
                  {trend === "neutral" && "→"} {trendValue}
                </span>
              </div>
            ))}
        </div>
        {Icon &&
          (isLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <div className="rounded-full bg-primary/10 p-3 text-primary dark:bg-primary/20">
              <Icon className="h-6 w-6" />
            </div>
          ))}
      </div>
    </div>
  )
}

