"use client"

import { useState, useEffect } from "react"
import { Camera, Clock, Bot } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/ui/stat-card"
import { CameraFeed } from "@/components/camera-feed"
import { ActivityLog } from "@/components/activity-log"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export default function Home() {
  const { toast } = useToast()
  const router = useRouter()
  const [lastUpdated, setLastUpdated] = useState("Just now")
  const [activityItems, setActivityItems] = useState([])
  const [cameraStats, setCameraStats] = useState({ active: 0, total: 0 })
  const [viewerStats, setViewerStats] = useState(0)
  const [peopleStats, setPeopleStats] = useState({ count: 0, trend: "neutral", trendValue: "Same as average" })
  const [recordingHours, setRecordingHours] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [agentActive, setAgentActive] = useState(true)

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
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title="Active Cameras"
              value={`${cameraStats.active}/${cameraStats.total}`}
              icon={Camera}
              trend="up"
              trendValue="2 more than yesterday"
              isLoading={isLoading}
              onClick={() => {
                router.push("/camera-settings")
              }}
            />
            <StatCard
              title="Agent Status"
              value={agentActive ? "Active" : "Inactive"}
              icon={Bot}
              description="AI surveillance agent"
              isLoading={isLoading}
              showToggle={true}
              isActive={agentActive}
              onToggle={() => {
                setAgentActive(!agentActive)
                toast({
                  title: `AI Agent ${!agentActive ? "Activated" : "Deactivated"}`,
                  description: `The AI surveillance agent is now ${!agentActive ? "active" : "inactive"}`,
                })
              }}
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

          {/* Recent Logs and Notifications */}
          <div className="grid gap-6 md:grid-cols-2">
            <ActivityLog items={activityItems} className="h-[400px]" isLoading={isLoading} />
            <Card className="h-[400px] rounded-xl border bg-card shadow-subtle">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="ml-auto">
                    {isLoading ? "..." : "0 unread"}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/notifications")}>
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
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No notifications available</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

