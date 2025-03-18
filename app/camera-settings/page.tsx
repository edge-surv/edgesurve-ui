import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit, Trash2, MoreHorizontal, Settings, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample camera data
const cameras = [
  {
    id: "cam-001",
    name: "Front Entrance",
    provider: "Hikvision",
    ipAddress: "192.168.1.101",
    status: "online",
    resolution: "1080p",
    location: "Main Building",
    lastMaintenance: "2025-02-15",
  },
  {
    id: "cam-002",
    name: "Parking Lot",
    provider: "Dahua",
    ipAddress: "192.168.1.102",
    status: "online",
    resolution: "4K",
    location: "North Side",
    lastMaintenance: "2025-01-20",
  },
  {
    id: "cam-003",
    name: "Reception Area",
    provider: "Axis",
    ipAddress: "192.168.1.103",
    status: "online",
    resolution: "1080p",
    location: "Main Building",
    lastMaintenance: "2025-03-01",
  },
  {
    id: "cam-004",
    name: "Back Door",
    provider: "Hikvision",
    ipAddress: "192.168.1.104",
    status: "online",
    resolution: "1080p",
    location: "Warehouse",
    lastMaintenance: "2025-02-10",
  },
  {
    id: "cam-005",
    name: "Loading Dock",
    provider: "Dahua",
    ipAddress: "192.168.1.105",
    status: "offline",
    resolution: "1080p",
    location: "Warehouse",
    lastMaintenance: "2025-01-15",
  },
  {
    id: "cam-006",
    name: "Server Room",
    provider: "Axis",
    ipAddress: "192.168.1.106",
    status: "online",
    resolution: "1080p",
    location: "IT Department",
    lastMaintenance: "2025-02-28",
  },
]

export default function CameraSettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Camera</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> 12 Cameras Configured
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Camera Management</CardTitle>
                <CardDescription>View and manage all connected cameras</CardDescription>
              </div>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Camera
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Camera Name</th>
                        <th className="p-3 text-left font-medium hidden md:table-cell">Provider</th>
                        <th className="p-3 text-left font-medium">IP Address</th>
                        <th className="p-3 text-left font-medium hidden md:table-cell">Resolution</th>
                        <th className="p-3 text-left font-medium hidden lg:table-cell">Location</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cameras.map((camera) => (
                        <tr key={camera.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">{camera.name}</td>
                          <td className="p-3 hidden md:table-cell">{camera.provider}</td>
                          <td className="p-3">{camera.ipAddress}</td>
                          <td className="p-3 hidden md:table-cell">{camera.resolution}</td>
                          <td className="p-3 hidden lg:table-cell">{camera.location}</td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={`gap-1 ${
                                camera.status === "online"
                                  ? "border-green-500 text-green-600 dark:text-green-400"
                                  : "border-red-500 text-red-600 dark:text-red-400"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  camera.status === "online" ? "bg-green-500" : "bg-red-500"
                                }`}
                              ></span>
                              {camera.status === "online" ? "Online" : "Offline"}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Camera Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configure
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Livestream
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

