"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, HandHeart, Briefcase } from "lucide-react"
import { DonationPortal } from "@/components/donation-portal"
import { VolunteerSignup } from "@/components/volunteer-signup"
import { PartnershipForm } from "@/components/partnership-form"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"

export default function GetInvolvedPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("getInvolved.title")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            {t("getInvolved.subtitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("getInvolved.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="donate" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="donate" className="flex items-center space-x-2">
                <Gift className="h-4 w-4" />
                <span>{t("getInvolved.donate.title") || "Donate"}</span>
              </TabsTrigger>
              <TabsTrigger value="volunteer" className="flex items-center space-x-2">
                <HandHeart className="h-4 w-4" />
                <span>{t("getInvolved.volunteer.title") || "Volunteer"}</span>
              </TabsTrigger>
              <TabsTrigger value="partner" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>{t("getInvolved.partnership.title") || "Partner"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="donate">
              <DonationPortal />
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
