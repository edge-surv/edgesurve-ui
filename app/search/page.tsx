import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileVideo,
  Filter,
  SearchIcon,
  Upload,
  CalendarIcon,
  ClockIcon,
  Camera,
  User,
  AlertTriangle,
  Settings,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

export default function SearchPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Intelligent Search</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> AI-Powered Search
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="logs">Log Search</TabsTrigger>
              <TabsTrigger value="video">Video Query</TabsTrigger>
            </TabsList>

            {/* Log Search Tab */}
            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Search System Logs</CardTitle>
                  <CardDescription>Search through system events, alerts, and activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                      <Input placeholder="Search logs..." className="pl-10" />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4 text-purple-500" />
                      Filters
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <CalendarIcon className="h-4 w-4 text-amber-500" />
                          Start Date
                        </Button>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <CalendarIcon className="h-4 w-4 text-amber-500" />
                          End Date
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Camera</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select camera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cameras</SelectItem>
                          <SelectItem value="front-entrance">Front Entrance</SelectItem>
                          <SelectItem value="parking-lot">Parking Lot</SelectItem>
                          <SelectItem value="reception">Reception Area</SelectItem>
                          <SelectItem value="back-door">Back Door</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Search Logs</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Search Results</CardTitle>
                    <Badge>{logEntries.length} results</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {logEntries.length > 0 ? (
                      logEntries.map((entry, index) => (
                        <div key={index} className="mb-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 rounded-full p-1 ${getEventTypeColor(entry.type)}`}>
                              {getEventTypeIcon(entry.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{entry.message}</p>
                                  <p className="text-sm text-muted-foreground">{entry.camera}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm">{entry.date}</p>
                                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                                </div>
                              </div>
                              {entry.details && <p className="mt-1 text-sm text-muted-foreground">{entry.details}</p>}

                              {/* Add image preview if available */}
                              {entry.imageUrl && (
                                <div className="mt-2 rounded-md overflow-hidden border inline-block cursor-pointer hover:opacity-90 transition-opacity">
                                  <img
                                    src={entry.imageUrl || "/placeholder.svg"}
                                    alt={`Event: ${entry.message}`}
                                    className="object-cover w-full h-auto"
                                  />
                                </div>
                              )}

                              {entry.hasVideo && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                  View associated video
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground">No search results found</p>
                        <p className="text-xs text-muted-foreground mt-2">Try adjusting your search criteria</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {logEntries.length > 0
                      ? `Showing 1-${Math.min(logEntries.length, 10)} of ${logEntries.length} results`
                      : "No results"}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled={logEntries.length === 0}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={logEntries.length === 0}>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Video Query Tab */}
            <TabsContent value="video" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Search Through Video</CardTitle>
                  <CardDescription>
                    Search through video footage using AI-powered object and event detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Main search section */}
                    <div className="flex-1 space-y-4">
                      {/* AI-powered text search */}
                      <div className="space-y-2">
                        <Label>AI-Powered Video Search</Label>
                        <div className="relative">
                          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                          <Input
                            placeholder="Describe what you're looking for... (e.g., 'person wearing red jacket near entrance')"
                            className="pl-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Use natural language to describe objects, people, activities, or scenarios you want to find in
                          the video footage.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Select Camera</Label>
                          <Select defaultValue="front-entrance">
                            <SelectTrigger>
                              <SelectValue placeholder="Select camera" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="front-entrance">Front Entrance</SelectItem>
                              <SelectItem value="parking-lot">Parking Lot</SelectItem>
                              <SelectItem value="reception">Reception Area</SelectItem>
                              <SelectItem value="back-door">Back Door</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Date & Time Range</Label>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="w-full gap-2">
                                <CalendarIcon className="h-4 w-4 text-amber-500" />
                                Start Date
                              </Button>
                              <Button variant="outline" size="sm" className="w-full gap-2">
                                <ClockIcon className="h-4 w-4 text-indigo-500" />
                                Start Time
                              </Button>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="w-full gap-2">
                                <CalendarIcon className="h-4 w-4 text-amber-500" />
                                End Date
                              </Button>
                              <Button variant="outline" size="sm" className="w-full gap-2">
                                <ClockIcon className="h-4 w-4 text-indigo-500" />
                                End Time
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Search For</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="person" />
                            <Label htmlFor="person" className="text-sm">
                              Person
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="vehicle" />
                            <Label htmlFor="vehicle" className="text-sm">
                              Vehicle
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="animal" />
                            <Label htmlFor="animal" className="text-sm">
                              Animal
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="motion" />
                            <Label htmlFor="motion" className="text-sm">
                              Motion
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="draw-boxes" />
                        <Label htmlFor="draw-boxes">Highlight detected objects in results</Label>
                      </div>
                    </div>

                    {/* Upload local video section - now a smaller sidebar */}
                    <div className="md:w-64 space-y-3 p-3 border rounded-md bg-muted/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Upload Local Video</Label>
                        <Switch id="use-local-video" />
                      </div>
                      <div className="border border-dashed rounded-md p-3 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-xs font-medium">Drop video file here</p>
                            <p className="text-xs text-muted-foreground">MP4, AVI, MOV (max 500MB)</p>
                          </div>
                          <Button size="sm" variant="outline" className="mt-1 text-xs h-7 px-2">
                            Browse
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Search Video Footage</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Video Results</CardTitle>
                    <Badge>{videoResults.length} matches</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {videoResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videoResults.map((result, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="relative aspect-video bg-black">
                            <img
                              src={result.thumbnail || "/placeholder.svg"}
                              alt={result.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                              >
                                <FileVideo className="h-6 w-6 text-blue-400" />
                              </Button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="bg-black/50 text-white border-none">
                                  {result.duration}
                                </Badge>
                                <Badge variant="outline" className="bg-black/50 text-white border-none">
                                  {result.matches} matches
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <div>
                              <h3 className="font-medium">{result.title}</h3>
                              <p className="text-xs text-muted-foreground">{result.timestamp}</p>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {result.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No video results found</p>
                      <p className="text-xs text-muted-foreground mt-2">Try adjusting your search criteria</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {videoResults.length > 0 ? `Showing all ${videoResults.length} results` : "No results"}
                  </div>
                  <Button variant="outline" size="sm" disabled={videoResults.length === 0}>
                    Export Results
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Helper functions for log entries
function getEventTypeColor(type: string) {
  switch (type) {
    case "motion":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    case "person":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    case "alert":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    case "system":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "user":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  }
}

function getEventTypeIcon(type: string) {
  switch (type) {
    case "motion":
      return <Camera className="h-4 w-4 text-blue-500" />
    case "person":
      return <User className="h-4 w-4 text-purple-500" />
    case "alert":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case "system":
      return <Settings className="h-4 w-4 text-amber-500" />
    case "user":
      return <User className="h-4 w-4 text-purple-500" />
    default:
      return <Camera className="h-4 w-4 text-blue-500" />
  }
}

// Sample data for log entries
const logEntries = []

// Sample data for video results
const videoResults = []

