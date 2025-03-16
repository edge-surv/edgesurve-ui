import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CameraFeed } from "@/components/camera-feed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LivestreamPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Livestream</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> 8 Cameras Online
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Cameras</TabsTrigger>
                <TabsTrigger value="indoor">Indoor</TabsTrigger>
                <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Grid View
                </Button>
                <Button variant="outline" size="sm">
                  List View
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CameraFeed title="Front Entrance" location="Main Building" status="recording" />
                <CameraFeed title="Parking Lot" location="North Side" status="online" />
                <CameraFeed title="Reception Area" location="Main Building" status="online" />
                <CameraFeed title="Back Door" location="Warehouse" status="online" />
                <CameraFeed title="Loading Dock" location="Warehouse" status="online" />
                <CameraFeed title="Server Room" location="IT Department" status="online" />
              </div>
            </TabsContent>

            <TabsContent value="indoor" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CameraFeed title="Reception Area" location="Main Building" status="online" />
                <CameraFeed title="Server Room" location="IT Department" status="online" />
                <CameraFeed title="Conference Room" location="Main Building" status="offline" />
              </div>
            </TabsContent>

            <TabsContent value="outdoor" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CameraFeed title="Front Entrance" location="Main Building" status="recording" />
                <CameraFeed title="Parking Lot" location="North Side" status="online" />
                <CameraFeed title="Back Door" location="Warehouse" status="online" />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

