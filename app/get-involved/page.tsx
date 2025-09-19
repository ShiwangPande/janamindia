"use client"
import { Badge } from "@/components/ui/badge"
import { DonationPortal } from "@/components/donation-portal"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"
import { ArrowDown } from "lucide-react"

export default function GetInvolvedPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-muted/20 py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
            {t("getInvolved.title") || "Get Involved"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-[family-name:var(--font-merriweather)]">
            {t("getInvolvedPage.hero.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t("getInvolvedPage.hero.subtitle")}
          </p>
          <a href="#donation" className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-lg transition">
            {t("getInvolvedPage.hero.donateNow")} <ArrowDown className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section id="donation" className="section py-20">
        <div className="container mx-auto max-w-7xl space-y-20">
          {/* Donation Portal */}
          <DonationPortal />

          {/* Recurring & CSR */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: t("getInvolvedPage.donationTypes.recurring"), desc: t("getInvolvedPage.donationTypes.recurringDesc") },
              { title: t("getInvolvedPage.donationTypes.csr"), desc: t("getInvolvedPage.donationTypes.csrDesc") },
              { title: t("getInvolvedPage.donationTypes.campaigns"), desc: t("getInvolvedPage.donationTypes.campaignsDesc") },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
                <div className="font-semibold mb-2">{item.title}</div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Partnerships */}
          <div id="partnership" className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-merriweather)]">{t("getInvolvedPage.partnerships.title")}</h2>
              <p className="text-muted-foreground">
                {t("getInvolvedPage.partnerships.subtitle")}
              </p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { title: t("getInvolvedPage.partnerships.clinical"), desc: t("getInvolvedPage.partnerships.clinicalDesc") },
                { title: t("getInvolvedPage.partnerships.csr"), desc: t("getInvolvedPage.partnerships.csrDesc") },
                { title: t("getInvolvedPage.partnerships.govt"), desc: t("getInvolvedPage.partnerships.govtDesc") },
                { title: t("getInvolvedPage.partnerships.research"), desc: t("getInvolvedPage.partnerships.researchDesc") },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
                  <div className="font-semibold mb-2">{item.title}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Pathways */}
          <div id="volunteer" className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-merriweather)]">{t("getInvolvedPage.volunteer.title")}</h2>
              <p className="text-muted-foreground">{t("getInvolvedPage.volunteer.subtitle")}</p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
              {[
                { title: t("getInvolvedPage.volunteer.field"), desc: t("getInvolvedPage.volunteer.fieldDesc") },
                { title: t("getInvolvedPage.volunteer.content"), desc: t("getInvolvedPage.volunteer.contentDesc") },
                { title: t("getInvolvedPage.volunteer.tech"), desc: t("getInvolvedPage.volunteer.techDesc") },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
                  <div className="font-semibold mb-2">{item.title}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Application Form */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-merriweather)]">{t("getInvolvedPage.volunteer.application")}</h2>
              <p className="text-muted-foreground">{t("getInvolvedPage.volunteer.applicationDesc")}</p>
            </div>
            <div className="md:col-span-2">
              <form className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border shadow-sm">
                <input className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Name *" required />
                <input className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Email *" type="email" required />
                <input className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Organization (optional)" />
                <select className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="" required>
                  <option value="" disabled>Role preference *</option>
                  <option>Workshop facilitator</option>
                  <option>Trainer</option>
                  <option>Field volunteer</option>
                  <option>Fundraiser</option>
                </select>
                <select className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="" required>
                  <option value="" disabled>Availability *</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Flexible</option>
                </select>
                <input className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Skills (comma separated)" />
                <textarea className="p-3 rounded-md border col-span-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Message" rows={5} />
                <button className="col-span-2 p-3 rounded-md bg-primary text-white font-semibold hover:bg-secondary-foreground transition">
                  Submit Application
                </button>
              </form>
            </div>
          </div>

          {/* Host a Campaign */}
          {/* <div id="campaign" className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-merriweather)]">Host a Campaign</h2>
              <p className="text-muted-foreground">Run school drives, dance marathons, or local fundraisers. Use our starter kit to get going.</p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              <a className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition cursor-not-allowed opacity-60" href="#" aria-disabled>
                Campaign Starter Kit (PDF) – coming soon
              </a>
              <a className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition" href="/contact">
                Talk to Our Team
              </a>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}
