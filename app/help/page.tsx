import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, MessageCircle, Phone, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Help Center</h1>
          </div>
        </header>
        <main className="animate-fade-in flex flex-1 flex-col gap-6 p-6">
          <div className="max-w-3xl mx-auto w-full">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>How can we help you?</CardTitle>
                <CardDescription>Search for answers or browse our help topics below</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for help..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="guides" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="mt-6 space-y-4">
                {[
                  {
                    title: "Getting Started with EdgeSurv",
                    description: "Learn the basics of setting up your surveillance system",
                  },
                  { title: "Camera Configuration Guide", description: "How to set up and optimize your cameras" },
                  {
                    title: "Intelligent Search Features",
                    description: "Make the most of our AI-powered search capabilities",
                  },
                  { title: "System Maintenance", description: "Keep your system running smoothly with these tips" },
                ].map((guide, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="py-4">
                      <div className="flex items-start gap-4">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-base">{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="faq" className="mt-6 space-y-4">
                {[
                  {
                    question: "How do I add a new camera?",
                    answer: "Navigate to Camera in the sidebar, then click 'Add Camera' and follow the setup wizard.",
                  },
                  {
                    question: "What video formats are supported?",
                    answer: "EdgeSurv supports H.264, H.265, and MJPEG video formats from compatible IP cameras.",
                  },
                  {
                    question: "How long is footage stored?",
                    answer:
                      "By default, footage is stored for 30 days, but this can be configured in Settings > Storage.",
                  },
                  {
                    question: "Can I access my cameras remotely?",
                    answer: "Yes, you can access your cameras from anywhere using our mobile app or web interface.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">{faq.question}</CardTitle>
                      <CardDescription className="text-sm text-foreground/80">{faq.answer}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tutorials" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Setting Up Motion Detection", duration: "5:32" },
                    { title: "Configuring Alert Notifications", duration: "4:17" },
                    { title: "Using the Intelligent Search", duration: "7:45" },
                    { title: "Managing Multiple Camera Feeds", duration: "6:20" },
                  ].map((tutorial, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                          <MessageCircle className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <p className="text-xs text-muted-foreground">{tutorial.duration}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Get in touch with our support team for personalized assistance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-muted/50">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <Phone className="h-10 w-10 text-primary mb-4" />
                          <h3 className="font-medium mb-1">Phone Support</h3>
                          <p className="text-sm text-muted-foreground mb-4">Available 24/7 for urgent issues</p>
                          <Button variant="outline">+1 (800) 555-0123</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <Mail className="h-10 w-10 text-primary mb-4" />
                          <h3 className="font-medium mb-1">Email Support</h3>
                          <p className="text-sm text-muted-foreground mb-4">Response within 24 hours</p>
                          <Button variant="outline">support@edgesurv.com</Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Send us a message</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Name" />
                        <Input placeholder="Email" type="email" />
                      </div>
                      <Input placeholder="Subject" />
                      <textarea
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe your issue..."
                      />
                      <Button className="w-full">Submit Request</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

