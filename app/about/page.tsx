"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { TimelineMilestones } from "@/components/timeline-milestones"
import Image from "next/image"
import { Heart, Compass, AlertTriangle, Lightbulb } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()
  const team = [
    { name: t("aboutPage.team.name1"), role: t("aboutPage.team.role1"), bio: t("aboutPage.team.bio1"), img: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758130997/362a9542-b062-4d08-a5ee-b6778ed4d2c1.png" },
    { name: t("aboutPage.team.name2"), role: t("aboutPage.team.role2"), bio: t("aboutPage.team.bio2"), img: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758131073/59005312-e9b2-4af1-89aa-c87e52d57d1d.png" },
    { name: t("aboutPage.team.name3"), role: t("aboutPage.team.role3"), bio: t("aboutPage.team.bio3"), img: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758131099/d0944d5a-6b02-4c7b-aaf3-33c692f2eeb9.png" },
  ]

  const pillars = [
    { title: t("aboutPage.pillars.mission"), desc: t("aboutPage.pillars.missionDesc"), icon: Heart },
    { title: t("aboutPage.pillars.vision"), desc: t("aboutPage.pillars.visionDesc"), icon: Compass },
    { title: t("aboutPage.pillars.crisis"), desc: t("aboutPage.pillars.crisisDesc"), icon: AlertTriangle },
    { title: t("aboutPage.pillars.solution"), desc: t("aboutPage.pillars.solutionDesc"), icon: Lightbulb },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/30 py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">{t("nav.about") || "About"}</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-[family-name:var(--font-merriweather)] text-primary">
            {t("aboutPage.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("aboutPage.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission, Vision, Crisis, Solution */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition flex flex-col items-start">
              <p.icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-xl font-bold text-[#1B5E20] mb-2">{p.title}</h2>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us / Origin */}
      <section className="py-20 bg-[#FFF3E6]">
        <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">{t("aboutPage.story.title")}</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("aboutPage.story.paragraph1")}</p>
              <p>{t("aboutPage.story.paragraph2")}</p>
              <p>{t("aboutPage.story.paragraph3")}</p>
              <p>{t("aboutPage.story.paragraph4")}</p>
              <p>{t("aboutPage.story.paragraph5")}</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">{t("aboutPage.story.different")}</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("aboutPage.story.different1")}</li>
              <li>{t("aboutPage.story.different2")}</li>
              <li>{t("aboutPage.story.different3")}</li>
            </ul>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-[#FFF3E6]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-6">{t("aboutPage.origin.title")}</h2>
          <p className="text-muted-foreground leading-relaxed space-y-4">
            {t("aboutPage.origin.paragraph1")}
            <br /><br />
            {t("aboutPage.origin.paragraph2")}
            <br /><br />
            {t("aboutPage.origin.paragraph3")}
          </p>
        </div>
      </section>
      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto max-w-5xl text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">{t("aboutPage.journey.title")}</h2>
        </div>
        <div className="container mx-auto max-w-7xl">
          <TimelineMilestones />
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/30">
        <div className="container mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4">{t("aboutPage.journey.label")}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-merriweather)] text-primary">{t("aboutPage.team.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t("aboutPage.team.subtitle")}
          </p>
        </div>
        <div className="container mx-auto grid gap-10 md:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-lg transition flex flex-col items-center text-center">
              <Image src={member.img} alt={member.name} width={120} height={120} className="rounded-full object-cover ring-4 ring-primary/10" />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="text-muted-foreground mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Origin */}
  

      {/* Instagram */}
      <section className="py-20 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Instagram</h2>
          <p className="text-muted-foreground mb-6">Follow our journey and latest updates.</p>
          <div className="mx-auto max-w-3xl">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border bg-white flex items-center justify-center text-muted-foreground shadow-sm">
              Instagram feed placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
