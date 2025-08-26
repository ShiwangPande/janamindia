import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, ImageIcon, MessageSquare, TrendingUp, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Pages",
      value: "12",
      change: "+2 this month",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Media Files",
      value: "156",
      change: "+23 this week",
      icon: ImageIcon,
      color: "text-green-600",
    },
    {
      title: "Form Submissions",
      value: "89",
      change: "+12 today",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Active Users",
      value: "4",
      change: "All online",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    { action: "Updated homepage hero section", user: "Admin", time: "2 hours ago" },
    { action: "Added new testimonial", user: "Content Editor", time: "4 hours ago" },
    { action: "Modified training schedule", user: "Program Manager", time: "1 day ago" },
    { action: "Uploaded impact photos", user: "Media Manager", time: "2 days ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Edit Homepage</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Media Library</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">View Forms</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-medium">Manage Users</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
