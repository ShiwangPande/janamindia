"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
// import { ImpactCounters } from "@/components/impact-counters"
import { TimelineMilestones } from "@/components/timeline-milestones"
import { ContainerWalkthrough } from "@/components/container-walkthrough"
import { TestimonialsSection } from "@/components/testimonials-section"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import {
  Baby,
  ClipboardList,
  Apple,
  HeartPulse,
  HeartHandshake,
  ShowerHead,
  AlertTriangle,
  Syringe,
  Landmark,
  HelpCircle,
  CheckCircle2,
  Bot
} from "lucide-react"
import { Info, ShieldCheck, Briefcase } from "lucide-react"
import Gallery from "@/components/gallery"

export default function HomePage() {
  const { t, language } = useLanguage()
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {/* 1) Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-rose-50 via-white to-emerald-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            {t("homePage.hero.title")}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in-50 slide-in-from-bottom-2 duration-700">
            {t("homePage.hero.subtitle")}
          </p>
          <div className="mt-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-700 delay-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              <Button asChild size="lg" className="h-12 rounded-full">
                <a href="#info" aria-label={t("homePage.hero.information")} className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  <span>{t("homePage.hero.information")}</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-12 rounded-full">
                <a href="#tools" aria-label={t("homePage.hero.safetyTools")} className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  <span>{t("homePage.hero.safetyTools")}</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full">
                <a href="#work" aria-label={t("homePage.hero.ourWork")} className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span>{t("homePage.hero.ourWork")}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Safe Birthing Information Hub */}
      <section id="info" className="py-16 bg-white scroll-mt-24 md:scroll-mt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-3">{t("homePage.hero.information")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("homePage.information.title")}</h2>
            <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{t("homePage.information.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("homePage.information.kangarooCare"), icon: Baby, href: "/solution#kangaroo" },
              { title: t("homePage.information.antenatalChecklist"), icon: ClipboardList, href: "/solution#antenatal" },
              { title: t("homePage.information.nutritionBreastfeeding"), icon: Apple, href: "/solution#nutrition" },
              { title: t("homePage.information.postpartumCare"), icon: HeartPulse, href: "/solution#postpartum" },
              { title: t("homePage.information.familyPlanning"), icon: HeartHandshake, href: "/solution#family-planning" },
              { title: t("homePage.information.hygienePrevention"), icon: ShowerHead, href: "/solution#hygiene" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="block rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div className="text-xl font-semibold">{item.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Safety & Awareness Tools */}
      <section id="tools" className="py-16 bg-muted/30 scroll-mt-24 md:scroll-mt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-3">{t("homePage.hero.safetyTools")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("homePage.safetyTools.title")}</h2>
            <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{t("homePage.safetyTools.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("homePage.safetyTools.dangerSigns"), icon: AlertTriangle, href: "/solution#danger-signs" },
              { title: t("homePage.safetyTools.immunizationSchedule"), icon: Syringe, href: "/solution#immunization" },
              { title: t("homePage.safetyTools.rightsEntitlements"), icon: Landmark, href: "/solution#rights" },
              { title: t("homePage.safetyTools.mythsFacts"), icon: HelpCircle, href: "/solution#myths" },
              { title: t("homePage.safetyTools.quickGuides"), icon: CheckCircle2, href: "/solution#quick-guides" },
              { title: t("homePage.safetyTools.aiChatbot"), icon: Bot, href: "/solution#quick-guides" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="block rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div className="text-xl font-semibold">{item.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4) Our Work (Impact + Resources) */}
      <section id="work" className="py-16 bg-white scroll-mt-24 md:scroll-mt-32">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3">{t("homePage.hero.ourWork")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("homePage.ourWork.title")}</h2>
            <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{t("homePage.ourWork.subtitle")}</p>
          </div>
          {/* <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-muted-foreground space-y-3">
                <p>Problem → Programs → Outcomes. How we address maternal and newborn health.</p>
                <Button asChild>
                  <a href="/solution">Explore Solution</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Pregnancy Booklet</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-muted-foreground space-y-3">
                <p>Preview and download our practical pregnancy booklet.</p>
                <Button asChild>
                  <a href="/pregnancy-booklet">View & Download</a>
                </Button>
              </CardContent>
            </Card>
          </div> */}
        <Gallery/>

          {/* Container cost info */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t("homePage.ourWork.containerCost")}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-muted-foreground">
              {t("homePage.ourWork.containerCostDesc")}
            </CardContent>
          </Card>

          <TestimonialsSection />
          <ContainerWalkthrough />
            
          {/* Problem section */}
          <section className="py-8">
            <div className="rounded-2xl border bg-muted/30 p-6">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-2">{t("homePage.ourWork.problem")}</Badge>
                <h3 className="text-2xl font-bold tracking-tight">{t("homePage.ourWork.problemTitle")}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                {/* The Problem */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">{t("homePage.ourWork.problemTitle1")}</h4>
                  <div className="space-y-5 text-base text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <span className="inline-block mt-1 text-primary font-bold text-2xl">{t("homePage.ourWork.problemFigure1")}</span>
                      <span>
                      {t("homePage.ourWork.problemDescription1")}
                        <span className="block text-xs text-gray-500 mt-1">{t("homePage.ourWork.problemTitle2")}</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="inline-block mt-1 text-primary font-bold text-2xl">{t("homePage.ourWork.problemFigure2")}</span>
                      <span>
                      {t("homePage.ourWork.problemDescription2")} 
                        <span className="block text-xs text-gray-500 mt-1">{t("homePage.ourWork.problemTitle3")}</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="inline-block mt-1 text-primary font-bold text-2xl">{t("homePage.ourWork.problemFigure3")}</span>
                      <span>
                      {t("homePage.ourWork.problemDescription3")}
                        <span className="block text-xs text-gray-500 mt-1">{t("homePage.ourWork.problemTitle4")}</span>
                      </span>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>
                        <span className="font-medium"> {t("homePage.ourWork.problemDescription4")}</span>
                      </li>
                      <li>
                        <span className="font-medium"> {t("homePage.ourWork.problemDescription5")} </span>
                      </li>
                      <li>
                        <span className="font-medium"> {t("homePage.ourWork.problemDescription6")} </span>
                        <span className="block text-xs text-gray-500">{t("homePage.ourWork.problemTitle5")}</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <span className="font-medium text-primary">{t("homePage.ourWork.problemTitle6")} </span> {t("homePage.ourWork.problemDescription7")}
                    </div>
                  </div>
                </div>
                {/* Our Approach */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">   {t("homePage.ourWork.approachtitle1")} </h4>
                  <div className="space-y-5 text-base text-muted-foreground">
                    <div className="rounded-lg bg-white/80 border p-4 shadow-sm">
                      <span className="font-semibold text-primary">{t("homePage.ourWork.approachtitle2")}</span>
                      <p className="mt-1">
                      {t("homePage.ourWork.approach1")}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/80 border p-4 shadow-sm">
                      <span className="font-semibold text-primary">{t("homePage.ourWork.approachtitle3")}</span>
                      <p className="mt-1">
                      {t("homePage.ourWork.approach2")}  
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/80 border p-4 shadow-sm">
                      <span className="font-semibold text-primary">{t("homePage.ourWork.approachtitle4")}</span>
                      <p className="mt-1">
                      {t("homePage.ourWork.approach3")}  
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <TimelineMilestones />

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t("homePage.ourWork.fundraisingHighlight")}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-muted-foreground">
              {t("homePage.ourWork.fundraisingDesc")}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-10">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">© 2024 Janam</div>
      </footer>
    </div>
  )
}




