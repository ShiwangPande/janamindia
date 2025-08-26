"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, HandHeart, Briefcase } from "lucide-react"
import { DonationPortal } from "@/components/donation-portal"
import { VolunteerSignup } from "@/components/volunteer-signup"
import { PartnershipForm } from "@/components/partnership-form"
import { DonationImpact } from "@/components/donation-impact"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function GetInvolvedPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("donate")
  const sections = [
    { value: "donate", label: t("getInvolved.donate.title") || "Donate", icon: Gift },
    { value: "volunteer", label: t("getInvolved.volunteer.title") || "Volunteer", icon: HandHeart },
    { value: "partner", label: t("getInvolved.partnership.title") || "Partner", icon: Briefcase },
  ] as const
  const current = sections.find((s) => s.value === activeTab) || sections[0]
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("getInvolved.title")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            {t("getInvolved.subtitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("getInvolved.subtitle")}
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-destructive hover:bg-destructive/90">
              <Gift className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
            <Button variant="outline" size="lg">
              <HandHeart className="mr-2 h-5 w-5" />
              Volunteer
            </Button>
            <Button variant="outline" size="lg">
              <Briefcase className="mr-2 h-5 w-5" />
              Partner
            </Button>
          </div> */}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-15">
        <div className="container mx-auto px-4">
          {/* Mobile: Select control for sections */}
          <div className="md:hidden mb-4">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full h-12 text-base rounded-[12px] border bg-white">
                <div className="flex items-center gap-2">
                  <current.icon className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{current.label}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {sections.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    <span className="flex items-center gap-2">
                      <s.icon className="h-4 w-4" />
                      {s.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Mobile title removed to avoid duplication with trigger */}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="hidden h-12  md:grid md:grid-cols-3">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.value}
                  value={section.value}
                  className="flex items-center space-x-2"
                >
                  <section.icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="donate">
              <DonationPortal />
              <div className="mt-8">
                <DonationImpact />
              </div>
            </TabsContent>

            <TabsContent value="volunteer">
              <VolunteerSignup />
            </TabsContent>

            <TabsContent value="partner">
              <PartnershipForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
