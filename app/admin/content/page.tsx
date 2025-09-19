"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Eye, Trash2, Globe, FileText, ImageIcon } from "lucide-react"

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const pages = [
    { id: 1, title: "Homepage", status: "published", lastModified: "2 hours ago", language: "en" },
    { id: 2, title: "होमपेज", status: "published", lastModified: "2 hours ago", language: "hi" },
    { id: 3, title: "About Us", status: "published", lastModified: "1 day ago", language: "en" },
    { id: 4, title: "हमारे बारे में", status: "draft", lastModified: "1 day ago", language: "hi" },
    { id: 5, title: "Team", status: "published", lastModified: "3 days ago", language: "en" },
    { id: 6, title: "Training Program", status: "published", lastModified: "1 week ago", language: "en" },
    { id: 7, title: "Get Involved", status: "published", lastModified: "2 days ago", language: "en" },
    { id: 8, title: "Contact Us", status: "published", lastModified: "1 week ago", language: "en" },
    { id: 9, title: "Media & Updates", status: "published", lastModified: "3 days ago", language: "en" },
    { id: 10, title: "Fathers for Care", status: "published", lastModified: "4 days ago", language: "en" },
    { id: 11, title: "The Problem", status: "published", lastModified: "5 days ago", language: "en" },
    { id: 12, title: "Our Solution", status: "published", lastModified: "6 days ago", language: "en" },
    { id: 13, title: "Pregnancy Booklet", status: "published", lastModified: "1 week ago", language: "en" },
    { id: 14, title: "Impact", status: "published", lastModified: "2 days ago", language: "en" },
  ]

  const components = [
    { id: 1, name: "Hero Section", type: "hero", usedIn: 4, lastModified: "2 hours ago" },
    { id: 2, name: "Impact Counters", type: "stats", usedIn: 2, lastModified: "1 day ago" },
    { id: 3, name: "Testimonials", type: "testimonial", usedIn: 3, lastModified: "3 days ago" },
    { id: 4, name: "Donation Portal", type: "form", usedIn: 1, lastModified: "1 week ago" },
    { id: 5, name: "Do's & Don'ts", type: "content", usedIn: 2, lastModified: "4 days ago" },
    { id: 6, name: "Program Snippets", type: "content", usedIn: 3, lastModified: "5 days ago" },
    { id: 7, name: "AI Chatbot", type: "interactive", usedIn: 1, lastModified: "6 days ago" },
    { id: 8, name: "Container 3D", type: "interactive", usedIn: 1, lastModified: "1 week ago" },
  ]

  const media = [
    { id: 1, name: "hero-image.jpg", type: "image", size: "2.4 MB", uploaded: "2 days ago" },
    { id: 2, name: "midwife-training.png", type: "image", size: "1.8 MB", uploaded: "1 week ago" },
    { id: 3, name: "impact-video.mp4", type: "video", size: "15.2 MB", uploaded: "2 weeks ago" },
    { id: 4, name: "testimonial-audio.mp3", type: "audio", size: "3.1 MB", uploaded: "1 month ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage your website content, components, and media</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Website Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{page.title}</h3>
                        <p className="text-sm text-muted-foreground">Last modified {page.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={page.language === "en" ? "default" : "secondary"}>
                        {page.language.toUpperCase()}
                      </Badge>
                      <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle>Reusable Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {components.map((component) => (
                  <div key={component.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{component.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Used in {component.usedIn} places • Modified {component.lastModified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{component.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {media.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • Uploaded {file.uploaded}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{file.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
