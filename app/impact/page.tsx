"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, MapPin, Calendar, Play, ArrowRight } from "lucide-react"
import { InteractiveDashboard } from "@/components/interactive-dashboard"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TimelineMilestones } from "@/components/timeline-milestones"
import { ContainerWalkthrough } from "@/components/container-walkthrough"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"

export default function ImpactPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("impactPage.title")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            {t("impactPage.subtitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("impactPage.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <BarChart3 className="mr-2 h-5 w-5" />
              {t("impactPage.dashboard")}
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-5 w-5" />
              {t("impactPage.stories")}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>{t("impactPage.dashboard")}</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{t("impactPage.stories")}</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{t("impactPage.timeline")}</span>
              </TabsTrigger>
              <TabsTrigger value="container" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{t("impactPage.container") || "Container Tour"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <InteractiveDashboard />
            </TabsContent>

            <TabsContent value="stories">
              <TestimonialsSection />
            </TabsContent>

            <TabsContent value="timeline">
              <TimelineMilestones />
            </TabsContent>

            <TabsContent value="container">
              <ContainerWalkthrough />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            Be Part of Our Growing Impact
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of supporters who are making safe births and stronger families a reality across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Donate Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Volunteer With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
