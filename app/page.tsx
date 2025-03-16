"use client"

import { useState, useEffect } from "react"
import { Camera, Clock, Eye, Users } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/ui/stat-card"
import { CameraFeed } from "@/components/camera-feed"
import { ActivityLog } from "@/components/activity-log"
import { SystemStatus } from "@/components/system-status"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { toast } = useToast()
  const [lastUpdated, setLastUpdated] = useState("Just now")
  const [activityItems, setActivityItems] = useState([])
  const [cameraStats, setCameraStats] = useState({ active: 0, total: 0 })
  const [viewerStats, setViewerStats] = useState(0)
  const [peopleStats, setPeopleStats] = useState({ count: 0, trend: "neutral", trendValue: "Same as average" })
  const [recordingHours, setRecordingHours] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Replace the entire useEffect block with this simplified version that just sets loading state
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set empty/default data
      setCameraStats({ active: 0, total: 0 })
      setViewerStats(0)
      setPeopleStats({ count: 0, trend: "neutral", trendValue: "" })
      setRecordingHours(0)
      setActivityItems([])

      setIsLoading(false)
    }

    loadData()

    // Set up auto-refresh interval
    const refreshInterval = setInterval(() => {
      setLastUpdated("Just now")

      // Update last updated time after 30 seconds
      setTimeout(() => {
        setLastUpdated("30 seconds ago")
      }, 30000)
    }, 60000) // Refresh every minute

    return () => clearInterval(refreshInterval)
  }, [])

  const handleRefresh = () => {
    setLastUpdated("Just now")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 border-green-500 text-green-600 dark:text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> System Online
              </Badge>
              <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-muted/50" onClick={handleRefresh}>
                <Clock className="h-3 w-3" /> Last updated: {lastUpdated}
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          {/* Stats row */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Cameras"
              value={`${cameraStats.active}/${cameraStats.total}`}
              icon={Camera}
              trend="up"
              trendValue="2 more than yesterday"
              isLoading={isLoading}
            />
            <StatCard
              title="Current Viewers"
              value={viewerStats.toString()}
              icon={Eye}
              trend="neutral"
              trendValue="Same as average"
              isLoading={isLoading}
            />
            <StatCard
              title="People Detected"
              value={peopleStats.count.toString()}
              icon={Users}
              trend={peopleStats.trend as "up" | "down" | "neutral"}
              trendValue={peopleStats.trendValue}
              isLoading={isLoading}
            />
            <StatCard
              title="Recording Hours"
              value={recordingHours.toString()}
              icon={Clock}
              description="Total hours recorded today"
              isLoading={isLoading}
            />
          </div>

          {/* Camera feeds */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Live Camera Feeds</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <CameraFeed title="Front Entrance" location="Main Building" status="recording" isLoading={isLoading} />
              <CameraFeed title="Parking Lot" location="North Side" status="online" isLoading={isLoading} />
              <CameraFeed title="Reception Area" location="Main Building" status="online" isLoading={isLoading} />
            </div>
          </div>

          {/* Activity and System Status */}
          <div className="grid gap-6 md:grid-cols-2">
            <ActivityLog items={activityItems} className="h-[400px]" isLoading={isLoading} />
            <SystemStatus className="h-[400px]" isLoading={isLoading} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

