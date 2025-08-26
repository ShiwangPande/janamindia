"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, Award, Calendar, Download, Play, ArrowRight } from "lucide-react"
import { TrainingOverview } from "@/components/training-overview"
import { ApplicationForm } from "@/components/application-form"
import { ResourceHub } from "@/components/resource-hub"
import { TrainingSchedule } from "@/components/training-schedule"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"

export default function TrainingPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("training.title")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            {t("training.subtitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("training.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <BookOpen className="mr-2 h-5 w-5" />
              Apply Now
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-5 w-5" />
              Watch Training Video
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Mobile: select control */}
          <div className="md:hidden mb-4">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full h-12 text-base rounded-[12px] border bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">{t("training.overview")}</SelectItem>
                <SelectItem value="apply">{t("training.apply")}</SelectItem>
                <SelectItem value="schedule">{t("training.schedule")}</SelectItem>
                <SelectItem value="resources">{t("training.resources")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="mb-8 hidden h-12  md:grid md:grid-cols-4">
              <TabsTrigger
                value="overview"
                className="flex items-center space-x-2 font-semibold rounded-md transition-colors data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#2E7D32] shadow-sm border border-[#2E7D32]/20 py-3"
              >
                <BookOpen className="h-4 w-4" />
                <span>{t("training.overview")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="apply"
                className="flex items-center space-x-2 font-semibold rounded-md transition-colors data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#2E7D32] shadow-sm border border-[#2E7D32]/20 py-3"
              >
                <Users className="h-4 w-4" />
                <span>{t("training.apply")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="flex items-center space-x-2 font-semibold rounded-md transition-colors data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#2E7D32] shadow-sm border border-[#2E7D32]/20 py-3"
              >
                <Calendar className="h-4 w-4" />
                <span>{t("training.schedule")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex items-center space-x-2 font-semibold rounded-md transition-colors data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-[#2E7D32] shadow-sm border border-[#2E7D32]/20 py-3"
              >
                <Award className="h-4 w-4" />
                <span>{t("training.resources")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <TrainingOverview />
            </TabsContent>

            <TabsContent value="apply">
              <ApplicationForm />
            </TabsContent>

            <TabsContent value="schedule">
              <TrainingSchedule />
            </TabsContent>

            <TabsContent value="resources">
              <ResourceHub />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            Ready to Save Lives?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our next training batch and become a certified community midwife. Transform your community's maternal
            health outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Apply for Training
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Contact Training Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
