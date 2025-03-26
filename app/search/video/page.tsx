"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { API, API_BASE_URL } from "@/services";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface VideoResult {
  search: boolean;
  timestamps: string[];
  total_detections: number;
  output_files: string[];
}

export default function VideoSearchPage() {
  const { toast } = useToast();
  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [searchPrompt, setSearchPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoSearch = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a video file",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }

    if (!searchPrompt) {
      toast({
        title: "Error",
        description: "Please enter a search prompt",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("prompt", searchPrompt);
    formData.append("confidence", "0.25");
    formData.append("save_output", "true");

    setIsLoading(true);
    try {
      const response = await API.post("/upload-search", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.search) {
        setVideoResults([response.data]);
        toast({
          title: "Success",
          description: "Video search completed successfully",
          variant: "default",
          className: "bg-green-500 text-white",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search video",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const LoadingSkeleton = () => (
    <Card className="mb-4">
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-video w-full rounded-md" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Video Search</h1>
            <div className="flex items-center gap-4">
              <Link href="/search">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Log Search
                </Button>
              </Link>
              <Badge variant="outline" className="gap-1">
                AI-Powered Search
              </Badge>
            </div>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Search</CardTitle>
              <CardDescription>
                Search through video footage using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Upload Video</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <Label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2" />
                      <p>Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">
                        MP4, AVI, MOV supported
                      </p>
                      {selectedFile && (
                        <p className="mt-2 text-sm font-medium text-green-600">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </Label>
                  </div>
                </div>
                <div>
                  <Label>Search Prompt</Label>
                  <Input
                    placeholder="Enter what to search for..."
                    value={searchPrompt}
                    onChange={(e) => setSearchPrompt(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleVideoSearch}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Search Video"}
                </Button>
              </div>
            </CardContent>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 gap-4">
                  {isLoading ? (
                    <LoadingSkeleton />
                  ) : (
                    videoResults.map((result, index) => (
                      <Card key={index} className="mb-4">
                        <CardHeader>
                          <CardTitle>Detection #{index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="font-semibold">
                              Total Detections: {result.total_detections}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Timestamps: {result.timestamps.join(", ")}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                              {result.output_files.map((file, fileIndex) => (
                                <div
                                  key={fileIndex}
                                  className="relative aspect-video w-full"
                                >
                                  <img
                                    src={`${API_BASE_URL}/${file}`}
                                    alt={`Detection ${fileIndex + 1}`}
                                    className="object-cover rounded-md w-full h-full"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
