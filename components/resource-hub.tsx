import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Play, BookOpen, FileText, Video, Headphones, Lock, Calendar, Users } from "lucide-react"

export function ResourceHub() {
  const publicResources = [
    {
      title: "Pregnancy Care Guide",
      description:
        "Comprehensive guide for expectant mothers covering prenatal care, nutrition, and preparation for delivery",
      type: "PDF",
      size: "2.5 MB",
      language: "हिंदी और अंग्रेजी",
      downloads: 15420,
      icon: FileText,
    },
    {
      title: "Safe Delivery Practices",
      description: "Essential practices for safe delivery including hygiene, positioning, and emergency procedures",
      type: "PDF",
      size: "1.8 MB",
      language: "कई भाषाएं",
      downloads: 12350,
      icon: FileText,
    },
    {
      title: "Newborn Care Basics",
      description: "Complete guide to newborn care including feeding, hygiene, and recognizing danger signs",
      type: "PDF",
      size: "2.1 MB",
      language: "हिंदी और अंग्रेजी",
      downloads: 9870,
      icon: FileText,
    },
    {
      title: "Kangaroo Care Method",
      description: "Step-by-step guide to kangaroo care for premature and low birth weight babies",
      type: "Video",
      duration: "15 min",
      language: "हिंदी उपशीर्षक के साथ",
      views: 25600,
      icon: Video,
    },
  ]

  const trainingMaterials = [
    {
      title: "Midwifery Fundamentals Course",
      description: "Complete video course covering anatomy, physiology, and basic midwifery principles",
      type: "Video Series",
      duration: "8 hours",
      modules: 12,
      access: "Enrolled Students",
      icon: Video,
    },
    {
      title: "Clinical Skills Manual",
      description: "Detailed manual with step-by-step procedures for all clinical skills taught in the program",
      type: "PDF",
      size: "15.2 MB",
      pages: 180,
      access: "Enrolled Students",
      icon: BookOpen,
    },
    {
      title: "Emergency Procedures Audio Guide",
      description: "Audio guide for emergency procedures that can be accessed during practice sessions",
      type: "Audio",
      duration: "45 min",
      episodes: 8,
      access: "Enrolled Students",
      icon: Headphones,
    },
    {
      title: "Case Study Collection",
      description: "Real case studies from experienced midwives with detailed analysis and learning points",
      type: "Interactive",
      cases: 25,
      difficulty: "Beginner to Advanced",
      access: "Enrolled Students",
      icon: Users,
    },
  ]

  const webinars = [
    {
      title: "Modern Midwifery Practices",
      presenter: "Dr. Priya Sharma",
      date: "March 15, 2024",
      time: "3:00 PM IST",
      duration: "60 min",
      status: "Upcoming",
      registrations: 245,
    },
    {
      title: "Handling Birth Complications",
      presenter: "Dr. Meera Patel",
      date: "February 28, 2024",
      time: "2:00 PM IST",
      duration: "90 min",
      status: "Completed",
      views: 1250,
    },
    {
      title: "Community Health Integration",
      presenter: "Dr. Sunita Das",
      date: "February 10, 2024",
      time: "4:00 PM IST",
      duration: "75 min",
      status: "Completed",
      views: 980,
    },
  ]

  const practiceSchedules = [
    {
      center: "Mumbai Training Center",
      nextSession: "March 20, 2024",
      time: "10:00 AM - 4:00 PM",
      focus: "Normal Delivery Practice",
      instructor: "Dr. Priya Sharma",
      spotsAvailable: 8,
    },
    {
      center: "Jaipur Training Center",
      nextSession: "March 22, 2024",
      time: "9:00 AM - 3:00 PM",
      focus: "Emergency Procedures",
      instructor: "Dr. Meera Patel",
      spotsAvailable: 5,
    },
    {
      center: "Bhubaneswar Training Center",
      nextSession: "March 25, 2024",
      time: "11:00 AM - 5:00 PM",
      focus: "Postnatal Care",
      instructor: "Dr. Sunita Das",
      spotsAvailable: 12,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
          Training Resources & Materials
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access comprehensive training materials, practice sessions, and educational resources to support your
          midwifery learning journey.
        </p>
      </div>

      <Tabs defaultValue="public" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="public">Public Resources</TabsTrigger>
          <TabsTrigger value="training">Training Materials</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="practice">Practice Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Free Educational Resources
            </h3>
            <p className="text-muted-foreground mb-6">
              Download our free resources to learn about maternal health, safe delivery practices, and newborn care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {publicResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <resource.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{resource.language}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{resource.description}</CardDescription>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {resource.size && `${resource.size} • `}
                      {resource.duration && `${resource.duration} • `}
                      {resource.downloads && `${resource.downloads.toLocaleString()} downloads`}
                      {resource.views && `${resource.views.toLocaleString()} views`}
                    </span>
                  </div>

                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    {resource.type === "Video" ? "Watch Now" : "Download"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">Training Materials</h3>
            <p className="text-muted-foreground mb-6">
              Exclusive resources for enrolled students including video courses, manuals, and interactive materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {trainingMaterials.map((material, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <material.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {material.type}
                          </Badge>
                          <Lock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{material.access}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{material.description}</CardDescription>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {material.duration && `${material.duration} • `}
                      {material.modules && `${material.modules} modules`}
                      {material.pages && `${material.pages} pages`}
                      {material.episodes && `${material.episodes} episodes`}
                      {material.cases && `${material.cases} cases`}
                    </span>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Requires Enrollment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Educational Webinars
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our expert-led webinars covering advanced topics in midwifery and maternal health.
            </p>
          </div>

          <div className="space-y-4">
            {webinars.map((webinar, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{webinar.title}</h4>
                        <p className="text-sm text-muted-foreground">by {webinar.presenter}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {webinar.date} at {webinar.time}
                          </span>
                          <span>{webinar.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={webinar.status === "Upcoming" ? "default" : "secondary"}>{webinar.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {webinar.status === "Upcoming"
                          ? `${webinar.registrations} registered`
                          : `${webinar.views} views`}
                      </p>
                      <Button
                        size="sm"
                        className="mt-2"
                        variant={webinar.status === "Upcoming" ? "default" : "outline"}
                      >
                        {webinar.status === "Upcoming" ? "Register" : "Watch Recording"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">Practice Sessions</h3>
            <p className="text-muted-foreground mb-6">
              Book hands-on practice sessions at our training centers to refine your skills under expert supervision.
            </p>
          </div>

          <div className="space-y-4">
            {practiceSchedules.map((session, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{session.center}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{session.focus}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {session.nextSession}
                        </span>
                        <span>{session.time}</span>
                        <span>with {session.instructor}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.spotsAvailable} spots available</p>
                      <Button size="sm" className="mt-2">
                        Book Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Access */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Quick Access</CardTitle>
          <CardDescription>Frequently accessed resources and important links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Training Manual</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Video className="h-6 w-6" />
              <span className="text-sm">Video Library</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Session</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span className="text-sm">Student Portal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
