import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, BellOff } from "lucide-react"

export default function NotificationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Notifications</h1>
            <div className="flex items-center gap-2">
              <Badge variant="primary">3 Unread</Badge>
              <Button variant="outline" size="sm" className="gap-1">
                <BellOff className="h-4 w-4 text-red-500" />
                Mute All
              </Button>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">All Notifications</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <BellOff className="h-4 w-4 text-red-500" />
                Mute All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Empty state when no notifications are available */}
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed">
              <Bell className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Notifications</h3>
              <p className="text-muted-foreground max-w-md">
                You don't have any notifications at the moment. When you receive notifications, they will appear here.
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

