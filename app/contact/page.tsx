"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"

export default function ContactPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("nav.contact")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">
            {t("contactPage.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contactPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="p-8 rounded-2xl bg-white shadow-md border">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">{t("contactPage.send")}</h2>
            <form className="grid gap-5">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">{t("contactPage.name")} *</label>
                <Input placeholder={t("contactPage.name")} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">{t("contactPage.email")} *</label>
                <Input type="email" placeholder={t("contactPage.email")} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">{t("contactPage.organization")}</label>
                <Input placeholder={t("contactPage.optional")} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">{t("contactPage.message")} *</label>
                <Textarea placeholder={t("contactPage.message")} className="min-h-40" required />
              </div>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-secondary-foreground text-white font-semibold py-3 rounded-lg transition"
              >
{t("contactPage.send")}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Reach us directly</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                General:{" "}
                <a className="text-primary hover:underline" href="mailto:hello@janam.org">
                  hello@janam.org
                </a>
              </p>
              <p>
                Partnerships:{" "}
                <a className="text-primary hover:underline" href="mailto:partnerships@janam.org">
                  partnerships@janam.org
                </a>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-foreground mb-3">Follow us</h3>
              <div className="flex justify-center gap-6">
                <a className="text-primary hover:underline" href="#" aria-label="Instagram">{t("contactPage.instagram")}</a>
                <a className="text-primary hover:underline" href="#" aria-label="X">X</a>
                <a className="text-primary hover:underline" href="#" aria-label="LinkedIn">{t("contactPage.linkedin")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
