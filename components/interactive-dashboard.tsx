"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Baby, Users, MapPin, Award, TrendingUp, Download } from "lucide-react"
import { ImpactMap } from "@/components/impact-map"
import { useLanguage } from "@/lib/language-context"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function InteractiveDashboard() {
  const { t, language } = useLanguage()
  const [timeRange, setTimeRange] = useState("2024")
  const [selectedMetric, setSelectedMetric] = useState("deliveries")

  const keyMetrics = [
    {
      title: t("impact.safeDeliveries"),
      value: 12500,
      change: "+23%",
      icon: Baby,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: t("impact.midwivesTrained"),
      value: 450,
      change: "+18%",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      title: t("impact.communitiesServed"),
      value: 150,
      change: "+35%",
      icon: MapPin,
      color: "text-accent",
      bgColor: "bg-accent/20",
    },
    {
      title: language === "hi" ? "कंटेनर क्लिनिक" : "Container Clinics",
      value: 25,
      change: "+67%",
      icon: Award,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ]

  const monthlyData = [
    { month: language === "hi" ? "जनवरी" : "Jan", deliveries: 850, midwives: 32, villages: 12 },
    { month: language === "hi" ? "फ़रवरी" : "Feb", deliveries: 920, midwives: 38, villages: 14 },
    { month: language === "hi" ? "मार्च" : "Mar", deliveries: 1100, midwives: 45, villages: 16 },
    { month: language === "hi" ? "अप्रैल" : "Apr", deliveries: 1250, midwives: 52, villages: 18 },
    { month: language === "hi" ? "मई" : "May", deliveries: 1180, midwives: 48, villages: 15 },
    { month: language === "hi" ? "जून" : "Jun", deliveries: 1350, midwives: 55, villages: 20 },
    { month: language === "hi" ? "जुलाई" : "Jul", deliveries: 1420, midwives: 58, villages: 22 },
    { month: language === "hi" ? "अगस्त" : "Aug", deliveries: 1380, midwives: 62, villages: 19 },
    { month: language === "hi" ? "सितंबर" : "Sep", deliveries: 1500, midwives: 65, villages: 24 },
    { month: language === "hi" ? "अक्टूबर" : "Oct", deliveries: 1650, midwives: 68, villages: 26 },
    { month: language === "hi" ? "नवंबर" : "Nov", deliveries: 1580, midwives: 72, villages: 23 },
    { month: language === "hi" ? "दिसंबर" : "Dec", deliveries: 1720, midwives: 75, villages: 28 },
  ]

  const stateData = [
    { name: language === "hi" ? "महाराष्ट्र" : "Maharashtra", value: 3200, color: "#2E7D32" },
    { name: language === "hi" ? "राजस्थान" : "Rajasthan", value: 2800, color: "#FFB5A7" },
    { name: language === "hi" ? "ओडिशा" : "Odisha", value: 2400, color: "#1B5E20" },
    { name: language === "hi" ? "बिहार" : "Bihar", value: 2100, color: "#A5D6A7" },
    { name: language === "hi" ? "अन्य" : "Others", value: 2000, color: "#FFF3E6" },
  ]

  const programData = [
    { program: language === "hi" ? "दाई प्रशिक्षण" : "Midwifery Training", impact: 85, budget: 45 },
    { program: language === "hi" ? "कंटेनर क्लिनिक" : "Container Clinics", impact: 92, budget: 35 },
    { program: language === "hi" ? "डिजिटल आउटरीच" : "Digital Outreach", impact: 78, budget: 15 },
    { program: language === "hi" ? "कंगारू केयर" : "Kangaroo Care", impact: 88, budget: 5 },
  ]

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{t("dashboard.title")}</h2>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="all">{t("dashboard.allTime")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("dashboard.export")}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-full flex items-center justify-center`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </Badge>
              </div>
              <div className="mt-4">
                <div className={`text-2xl font-bold ${metric.color} font-[family-name:var(--font-space-grotesk)]`}>
                  <AnimatedCounter end={metric.value} suffix={metric.title === t("impact.safeDeliveries") ? "+" : ""} />
                </div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.monthlyTrends")}</CardTitle>
            <CardDescription>{t("dashboard.monthlyTrendsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deliveries">{t("impact.safeDeliveries")}</SelectItem>
                  <SelectItem value="midwives">{t("impact.midwivesTrained")}</SelectItem>
                  <SelectItem value="villages">{t("impact.communitiesServed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={selectedMetric} stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* State-wise Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.statewiseImpact")}</CardTitle>
            <CardDescription>{t("dashboard.statewiseImpactDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stateData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {stateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Program Effectiveness */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.programEffectiveness")}</CardTitle>
            <CardDescription>{t("dashboard.programEffectivenessDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={programData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impact" fill="#2E7D32" name={t("dashboard.impactScore")}/>
                <Bar dataKey="budget" fill="#FFB5A7" name={t("dashboard.budgetPerc")}/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Reach */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.geographicReach")}</CardTitle>
            <CardDescription>{t("dashboard.geographicReachDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ImpactMap />
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-[family-name:var(--font-space-grotesk)]">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-sm text-muted-foreground">{t("dashboard.successfulDeliveries")}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-[family-name:var(--font-space-grotesk)]">
                <AnimatedCounter end={24} suffix=" hrs" />
              </div>
              <p className="text-sm text-muted-foreground">{t("dashboard.avgResponseTime")}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-[family-name:var(--font-space-grotesk)]">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <p className="text-sm text-muted-foreground">{t("dashboard.motherSatisfaction")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
