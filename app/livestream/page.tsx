import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CameraFeed } from "@/components/camera-feed"

// Define cameras array for dynamic rendering
const cameras = [
  { title: "Front Entrance", location: "Main Building", status: "recording" },
  { title: "Parking Lot", location: "North Side", status: "online" },
  { title: "Reception Area", location: "Main Building", status: "online" },
  { title: "Back Door", location: "Warehouse", status: "online" },
  { title: "Loading Dock", location: "Warehouse", status: "online" },
  { title: "Server Room", location: "IT Department", status: "online" },
]

const outdoorCameras = cameras.filter((camera) => ["Front Entrance", "Parking Lot", "Back Door"].includes(camera.title))

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
        <main className="animate-fade-in flex flex-1 flex-col h-[calc(100vh-64px)]">
          <div className="flex flex-wrap gap-6 p-6 h-full">
            {cameras.map((camera, index) => (
              <div
                key={index}
                className={`${
                  cameras.length === 1
                    ? "w-full h-full"
                    : "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[calc(33.333vh-32px)]"
                }`}
              >
                <CameraFeed title={camera.title} location={camera.location} status={camera.status} className="h-full" />
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

