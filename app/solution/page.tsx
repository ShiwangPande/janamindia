"use client"

import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/lib/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ClipboardList,
  AlertTriangle,
  Apple,
  CalendarDays,
  Baby,
  HeartPulse,
  Syringe,
  HeartHandshake,
  ShowerHead,
  Landmark,
  HelpCircle,
  Download,
  CheckCircle2,
  ArrowUp,
} from "lucide-react"
import React from "react"

type NavItem = { id: string; title: string; icon: React.ReactNode }

export default function SolutionPage() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = React.useState<string>("")
  const [open, setOpen] = React.useState(false)



  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    )
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as Element[]
    els.forEach((el) => observer.observe(el))
    const onHash = () => setActiveId(window.location.hash.replace('#', ''))
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => {
      window.removeEventListener('hashchange', onHash)
      els.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [])

  const sections: Array<NavItem> = [
    { id: "antenatal", title: t("solutionPage.sections.antenatal"), icon: <ClipboardList className="w-4 h-4" /> },
    { id: "danger-signs", title: t("solutionPage.sections.dangerSigns"), icon: <AlertTriangle className="w-4 h-4" /> },
    { id: "nutrition", title: t("solutionPage.sections.nutrition"), icon: <Apple className="w-4 h-4" /> },
    { id: "birth-preparedness", title: t("solutionPage.sections.birthPreparedness"), icon: <CalendarDays className="w-4 h-4" /> },
    { id: "newborn-care", title: t("solutionPage.sections.newbornCare"), icon: <Baby className="w-4 h-4" /> },
    { id: "kangaroo", title: t("solutionPage.sections.kangaroo"), icon: <Baby className="w-4 h-4" /> },
    { id: "postpartum", title: t("solutionPage.sections.postpartum"), icon: <HeartPulse className="w-4 h-4" /> },
    { id: "immunization", title: t("solutionPage.sections.immunization"), icon: <Syringe className="w-4 h-4" /> },
    { id: "family-planning", title: t("solutionPage.sections.familyPlanning"), icon: <HeartHandshake className="w-4 h-4" /> },
    { id: "hygiene", title: t("solutionPage.sections.hygiene"), icon: <ShowerHead className="w-4 h-4" /> },
    { id: "rights", title: t("solutionPage.sections.rights"), icon: <Landmark className="w-4 h-4" /> },
    { id: "myths", title: t("solutionPage.sections.myths"), icon: <HelpCircle className="w-4 h-4" /> },
    { id: "quick-guides", title: t("solutionPage.sections.quickGuides"), icon: <Download className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-18 md:py-28 bg-gradient-to-br from-rose-50 via-white to-emerald-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>
        <div className="container mx-auto max-w-6xl text-center relative">
          <Badge variant="secondary" className="mb-4">{t("solutionPage.hero.badge")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-primary">{t("solutionPage.hero.title")}</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t("solutionPage.hero.subtitle")}</p>
         
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>{t("solutionPage.hero.features")}</span>
          </div>
        </div>
      </section>

      {/* Compact in-page nav (mobile) removed to force left sidebar always visible */}

      {/* Sections with sticky table of contents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <aside className="block md:col-span-3 md:sticky md:top-24 md:self-start md:max-h-[70vh] md:overflow-auto pr-2 bg-white border rounded-xl p-3 md:p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide font-medium text-muted-foreground px-1 pb-2">On this page</div>
            <nav className="space-y-0.5">
              {sections.map(s => {
                const active = activeId === s.id
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    aria-current={active ? 'true' : undefined}
                    className="block text-sm"
                  >
                    <span className={`flex items-center gap-2 border-l-2 pl-3 rounded-md px-1.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${active ? 'border-primary text-foreground bg-muted/60' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'}`}>
                      {s.icon}
                      <span>{s.title}</span>
                    </span>
                  </a>
                )
              })}
            </nav>
          </aside>
          <div className="space-y-12 md:col-span-9 md:pr-4 xl:pr-8">
            <Section id="antenatal" badge={<ClipboardList className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.antenatal")}>
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-6 md:p-8 space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
                  <div>
                    <div className="font-semibold text-foreground mb-2">{t("solutionPage.content.keyPoints")}</div>
                    <ul className="list-disc pl-5 grid sm:grid-cols-2 gap-2">
                      {(t("solutionPage.content.antenatalPoints") as unknown as string[]).map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-2">{t("solutionPage.content.healthyLifestyle")}</div>
                    <p>{t("solutionPage.content.healthyLifestyleText")}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-2">{t("solutionPage.content.ancSchedule")}</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {(t("solutionPage.content.ancScheduleItems") as unknown as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-2">{t("solutionPage.content.supplementsTests")}</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {(t("solutionPage.content.supplementsItems") as unknown as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section id="danger-signs" badge={<AlertTriangle className="w-4 h-4 mr-2" />} title={`${t("solutionPage.sections.dangerSigns")} — ${t("solutionPage.content.seekHelp")}`}>
              <TwoCol bullets={t("solutionPage.content.dangerSignsList") as unknown as string[]} />
              <LongDescription>
                {t("solutionPage.content.dangerSignsNote")}
              </LongDescription>
            </Section>

            <Section id="nutrition" badge={<Apple className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.nutrition")}>
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-6 md:p-8 space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
                  <div>

                    <div className="font-semibold text-foreground mb-2">
                      {t("solutionPage.content.dietAndFeeding")}
                    </div>

                    <ul className="list-disc pl-5 space-y-1">
                      {(t("solutionPage.content.dietAndFeedinglist") as unknown as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-2">{t("solutionPage.content.practicalTips")}</div>
                    <p>{t("solutionPage.content.practicalTipstext")}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-2">          {t("solutionPage.content.commonIssues")}
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {(t("solutionPage.content.commonIssueslist") as unknown as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section id="birth-preparedness" badge={<CalendarDays className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.birthPreparedness")}>
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-6 md:p-8 space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
                  <div>
                    <div className="font-semibold text-foreground mb-2">{t("solutionPage.content.planAhead")}</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {(t("solutionPage.content.planAheadlist") as unknown as string[]).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">{t("solutionPage.content.quickCheck")}</div>
                    <ul className="space-y-2">
                      {(t("solutionPage.content.quickChecklist") as unknown as string[]).map((items: string, index: number) => (
                        <li key={index}>{items}</li>
                      )).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-1 text-emerald-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section id="newborn-care" badge={<Baby className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.newbornCare")}>
              <Card>
                <CardContent className="p-6 md:p-7">


                  <ul className="text-base md:text-lg text-muted-foreground grid sm:grid-cols-3 gap-2 leading-relaxed list-disc pl-5">
                    {(t("solutionPage.content.newbornCarelist") as unknown as string[]).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}

                  </ul>
                </CardContent>
              </Card>



              <LongDescription>
                {t("solutionPage.content.newbornCareText")}

              </LongDescription>
            </Section>

            <Section id="kangaroo" badge={<Baby className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.kangaroo")}>
              <Card className="rounded-2xl border shadow-sm">
                <CardContent className="p-5 text-base text-muted-foreground">
                  {t("solutionPage.content.kangarooText")}
                </CardContent>
              </Card>
            </Section>

            <Section id="postpartum" badge={<HeartPulse className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.postpartum")} >
              <Card>
                <CardContent className="p-6 md:p-7">
                  <ul className="text-base md:text-lg text-muted-foreground grid sm:grid-cols-2 gap-2 leading-relaxed list-disc pl-5">
                    {(t("solutionPage.content.postpartumlist") as unknown as string[]).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <LongDescription>
                {t("solutionPage.content.postpartumText")}
              </LongDescription>
              <Alert className="mt-4">
                <AlertTitle>{t("solutionPage.content.urgentCare")}</AlertTitle>
                <AlertDescription>
                  {t("solutionPage.content.urgentCaretext")}
                </AlertDescription>
              </Alert>
            </Section>

            <Section id="immunization" badge={<Syringe className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.immunization")}>
              <Card className="rounded-2xl border shadow-sm hover:shadow-md transition">
                <CardContent className="p-6 md:p-8 text-[15px] md:text-base text-muted-foreground leading-relaxed">
                  {t("solutionPage.content.immunizationtext")}
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardContent className="p-6 md:p-8">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead> {t("solutionPage.content.tableHead1")}</TableHead>
                        <TableHead>{t("solutionPage.content.tableHead2")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{t("solutionPage.content.row1Cell1")}</TableCell>
                        <TableCell>{t("solutionPage.content.row1Cell2")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t("solutionPage.content.row2Cell1")}</TableCell>
                        <TableCell>{t("solutionPage.content.row2Cell2")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t("solutionPage.content.row3Cell1")}</TableCell>
                        <TableCell>{t("solutionPage.content.row3Cell2")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t("solutionPage.content.row4Cell1")}</TableCell>
                        <TableCell>{t("solutionPage.content.row4Cell2")}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Section>

            <Section id="family-planning" badge={<HeartHandshake className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.familyPlanning")}>
              <Card>
                <CardContent className="p-6 md:p-7">
                  <ul className="text-base md:text-lg text-muted-foreground grid sm:grid-cols-2 gap-2 leading-relaxed list-disc pl-5">
                    {(t("solutionPage.content.familyPlanninglist") as unknown as string[]).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Section>

            <Section id="hygiene" badge={<ShowerHead className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.hygiene")}>
              <Card>
                <CardContent className="p-6 md:p-7">
                  <ul className="text-base md:text-lg text-muted-foreground grid sm:grid-cols-2 gap-2 leading-relaxed list-disc pl-5">
                    {(t("solutionPage.content.hygienelist") as unknown as string[]).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Section>

            <Section id="rights" badge={<Landmark className="w-4 h-4 mr-2" />}
              title={t("solutionPage.sections.rights")}>
              <Card className="rounded-2xl border shadow-sm">
                <CardContent className="p-6 md:p-7 grid sm:grid-cols-2 gap-3 text-base md:text-lg">
                  <a className="p-3 rounded-xl border bg-white hover:shadow-md transition hover:-translate-y-0.5" href="https://nhm.gov.in/" target="_blank" rel="noreferrer">NHM Portal</a>
                  <a className="p-3 rounded-xl border bg-white hover:shadow-md transition hover:-translate-y-0.5" href="https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309" target="_blank" rel="noreferrer">JSY</a>
                  <a className="p-3 rounded-xl border bg-white hover:shadow-md transition hover:-translate-y-0.5" href="https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=309" target="_blank" rel="noreferrer">JSSK</a>
                  <a className="p-3 rounded-xl border bg-white hover:shadow-md transition hover:-translate-y-0.5" href="https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana" target="_blank" rel="noreferrer">PMMVY</a>
                </CardContent>
              </Card>
            </Section>

            <Section id="myths" badge={<HelpCircle className="w-4 h-4 mr-2" />} title={t("solutionPage.sections.myths")}>
              <Card className="rounded-2xl border shadow-sm hover:shadow-md transition">
                <CardContent className="p-5 grid sm:grid-cols-2 gap-3 text-base">
                  {(
                    t("solutionPage.content.mythFactList") as unknown as {
                      myth: string
                      fact: string
                    }[]
                  ).map((x, i) => (
                    <div key={i} className="p-3 rounded-xl border bg-white">
                      <div>
                        <span className="font-semibold">{t("solutionPage.content.myth")}:</span> {x.myth}
                      </div>
                      <div className="text-primary mt-1">
                        <span className="font-semibold">{t("solutionPage.content.fact")}:</span> {x.fact}
                      </div>
                    </div>
                  ))}


                </CardContent>
              </Card>
            </Section>
            <Section id="quick-guides" badge={<Download className="w-4 h-4 mr-2" />} title="Quick Guides (PDFs)">


              <div className="rounded-2xl border shadow-sm">
                <div className="p-6 md:p-7 grid sm:grid-cols-2 gap-3 text-base md:text-lg">
                  {/* English PDF */}
                  <button
                    onClick={() => setOpen(true)}
                    className="p-3 rounded-xl border bg-white hover:shadow-md transition hover:-translate-y-0.5 text-left"
                  >
                    Pregnancy Booklet (EN)
                  </button>

                  {/* Disabled Hindi PDF */}
                  <span className="p-3 rounded-xl border bg-white opacity-70 pointer-events-none">
                    Hindi – coming soon
                  </span>
                </div>
              </div>

              {/* PDF Viewer Modal */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Pregnancy Booklet (EN)</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      src="/janam.pdf"
                      className="w-full h-full rounded-lg border"
                      title="Pregnancy Booklet"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button asChild>
                      <a href="/janam.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Section>


          </div>
        </div>
      </section>
    
    </div>
  )
}

function Section({ id, badge, title, children }: { id: string; badge: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="space-y-4 scroll-mt-32 md:scroll-mt-40">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="px-2.5 py-1.5 text-[11px] md:text-xs inline-flex items-center">{badge}<span className="sr-only">{title}</span></Badge>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {children}
    </div>
  )
}

function TwoCol({ bullets }: { bullets: string[] }) {
  return (
    <Card>
      <CardContent className="p-6 md:p-7">
        <ul className="text-base md:text-lg text-muted-foreground grid sm:grid-cols-2 gap-2 leading-relaxed list-disc pl-5">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </CardContent>
    </Card>
  )
}

function LongDescription({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mt-4">
      <CardContent className="p-5 text-base text-muted-foreground leading-relaxed">
        {children}
      </CardContent>
    </Card>
  )
}

function ThreeCol({ bullets }: { bullets: string[] }) {
  return (
    <Card>
      <CardContent className="p-6 md:p-7">
        <ul className="text-base md:text-lg text-muted-foreground grid sm:grid-cols-3 gap-2 leading-relaxed list-disc pl-5">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </CardContent>
    </Card>
  )
}



