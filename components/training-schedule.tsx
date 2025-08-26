import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from "lucide-react"

export function TrainingSchedule() {
  const upcomingBatches = [
    {
      id: 1,
      batchName: "Batch 2024-Q2",
      startDate: "April 15, 2024",
      endDate: "October 15, 2024",
      location: "Mumbai Training Center",
      capacity: 25,
      enrolled: 18,
      status: "Open for Applications",
      applicationDeadline: "March 30, 2024",
      languages: ["हिंदी", "मराठी", "अंग्रेजी"],
      coordinator: "Dr. Priya Sharma",
    },
    {
      id: 2,
      batchName: "Batch 2024-Q3",
      startDate: "July 20, 2024",
      endDate: "January 20, 2025",
      location: "Jaipur Training Center",
      capacity: 30,
      enrolled: 12,
      status: "Open for Applications",
      applicationDeadline: "June 30, 2024",
      languages: ["हिंदी", "राजस्थानी", "अंग्रेजी"],
      coordinator: "Dr. Meera Patel",
    },
    {
      id: 3,
      batchName: "Batch 2024-Q4",
      startDate: "October 10, 2024",
      endDate: "April 10, 2025",
      location: "Bhubaneswar Training Center",
      capacity: 20,
      enrolled: 5,
      status: "Open for Applications",
      applicationDeadline: "September 25, 2024",
      languages: ["हिंदी", "ओड़िया", "अंग्रेजी"],
      coordinator: "Dr. Sunita Das",
    },
  ]

  const weeklySchedule = [
    {
      day: "Monday",
      sessions: [
        { time: "9:00 AM - 12:00 PM", topic: "Theory Classes", type: "Classroom" },
        { time: "2:00 PM - 5:00 PM", topic: "Practical Training", type: "Lab" },
      ],
    },
    {
      day: "Tuesday",
      sessions: [
        { time: "9:00 AM - 12:00 PM", topic: "Clinical Skills", type: "Hands-on" },
        { time: "2:00 PM - 4:00 PM", topic: "Case Studies", type: "Discussion" },
      ],
    },
    {
      day: "Wednesday",
      sessions: [
        { time: "9:00 AM - 11:00 AM", topic: "Community Health", type: "Classroom" },
        { time: "11:30 AM - 5:00 PM", topic: "Field Visit", type: "Practical" },
      ],
    },
    {
      day: "Thursday",
      sessions: [
        { time: "9:00 AM - 12:00 PM", topic: "Emergency Procedures", type: "Simulation" },
        { time: "2:00 PM - 5:00 PM", topic: "Supervised Practice", type: "Clinical" },
      ],
    },
    {
      day: "Friday",
      sessions: [
        { time: "9:00 AM - 11:00 AM", topic: "Assessment & Review", type: "Evaluation" },
        { time: "11:30 AM - 1:00 PM", topic: "Peer Learning", type: "Group Work" },
      ],
    },
  ]

  const trainingCenters = [
    {
      name: "Mumbai Training Center",
      address: "Janam Healthcare Campus, Andheri East, Mumbai - 400069",
      facilities: [
        "Modern Delivery Simulation Lab",
        "Library & Study Rooms",
        "Hostel Accommodation",
        "24/7 Medical Support",
      ],
      coordinator: "Dr. Priya Sharma",
      phone: "+91 98765 43210",
    },
    {
      name: "Jaipur Training Center",
      address: "Janam Rural Health Institute, Malviya Nagar, Jaipur - 302017",
      facilities: [
        "Traditional & Modern Birth Practices Lab",
        "Community Health Center",
        "Local Accommodation",
        "Transport Facility",
      ],
      coordinator: "Dr. Meera Patel",
      phone: "+91 98765 43211",
    },
    {
      name: "Bhubaneswar Training Center",
      address: "Janam Maternal Care Institute, Patia, Bhubaneswar - 751024",
      facilities: ["Integrated Clinical Training", "Digital Learning Center", "Guest House", "Nutritious Meals"],
      coordinator: "Dr. Sunita Das",
      phone: "+91 98765 43212",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
          Training Schedule & Batches
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from our upcoming training batches across different locations. Each batch is limited to ensure
          personalized attention and quality training.
        </p>
      </div>

      {/* Upcoming Batches */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">Upcoming Training Batches</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {upcomingBatches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{batch.batchName}</CardTitle>
                  <Badge variant={batch.status === "Open for Applications" ? "default" : "secondary"}>
                    {batch.status}
                  </Badge>
                </div>
                <CardDescription>{batch.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {batch.startDate} - {batch.endDate}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {batch.enrolled}/{batch.capacity} enrolled
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Apply by {batch.applicationDeadline}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {batch.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium">Coordinator:</p>
                  <p className="text-muted-foreground">{batch.coordinator}</p>
                </div>

                <Button className="w-full" disabled={batch.status !== "Open for Applications"}>
                  {batch.status === "Open for Applications" ? "Apply Now" : "Applications Closed"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">Typical Weekly Schedule</h3>
        <Card>
          <CardHeader>
            <CardTitle>Monday to Friday Training Schedule</CardTitle>
            <CardDescription>
              Each week combines theoretical learning with hands-on practice and community engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">{day.day}</h4>
                  <div className="space-y-2">
                    {day.sessions.map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{session.time}</span>
                          <span className="text-sm">{session.topic}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {session.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Centers */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">Training Centers</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {trainingCenters.map((center, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{center.name}</CardTitle>
                <CardDescription className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span className="text-sm">{center.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Facilities:</p>
                  <div className="space-y-1">
                    {center.facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium">Center Coordinator:</p>
                  <p className="text-muted-foreground">{center.coordinator}</p>
                  <p className="text-muted-foreground">{center.phone}</p>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Visit Center
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Dates */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Important Dates & Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Application Deadlines</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Batch 2024-Q2 (Mumbai)</span>
                  <span className="font-medium">March 30, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Batch 2024-Q3 (Jaipur)</span>
                  <span className="font-medium">June 30, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Batch 2024-Q4 (Bhubaneswar)</span>
                  <span className="font-medium">September 25, 2024</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Selection Process Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Application Review</span>
                  <span className="font-medium">5-7 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Interview Scheduling</span>
                  <span className="font-medium">1-2 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Selection</span>
                  <span className="font-medium">2-3 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
