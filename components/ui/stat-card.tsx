"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  showToggle?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
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
  showToggle = false,
  isActive = false,
  onToggle,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-6 shadow-subtle transition-all hover:shadow-elevated",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {showToggle && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle?.();
                }}
                className={cn(
                  "ml-2 rounded-full w-12 h-6 flex items-center transition-colors",
                  isActive
                    ? "bg-green-500 justify-end"
                    : "bg-gray-300 justify-start"
                )}
              >
                <span
                  className={cn(
                    "h-5 w-5 rounded-full transform transition-transform",
                    isActive
                      ? "bg-white translate-x-[-4px]"
                      : "bg-white translate-x-[4px]"
                  )}
                ></span>
              </button>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="mt-2 h-8 w-16" />
          ) : (
            <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          )}
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
          {trend &&
            trendValue &&
            (isLoading ? (
              <Skeleton className="mt-3 h-6 w-24" />
            ) : (
              <div className="mt-3 flex items-center">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    trend === "up" &&
                      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  )}
                >
                  All Cameras Active
                </span>
              </div>
            ))}
        </div>
        {Icon &&
          (isLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <div className="rounded-full bg-primary/10 p-3 text-primary dark:bg-primary/20">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          ))}
      </div>
    </div>
  );
}
