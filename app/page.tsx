"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export default function LanguageLandingRoot() {
  const router = useRouter()
  const { setLanguage } = useLanguage()

  const choose = (lang: "en" | "hi") => {
    setLanguage(lang)
    router.push("/home")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-muted/30">

      {/* Header brand mark */}
      <div className="container mx-auto px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Janam logo" width={40} height={40} className="rounded-md" />
          <div>
            <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Janam</div>
            <div className="text-sm text-muted-foreground">Safe births. Stronger families.</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span>भारत · India</span>
        </div>
      </div>

      {/* Hero */}
      <main className="container mx-auto px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <section className="space-y-6">
            <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-muted text-foreground">
              Maternal Health Initiative
            </div>
            <h1 className="text-4xl md:text-6xl leading-tight font-[family-name:var(--font-space-grotesk)] font-bold text-foreground">
              Healthy Mothers, Healthy Futures
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Community midwifery, mobile clinics and education — built with and for rural India.
            </p>

            {/* Language choice */}
            <div className="mt-6">
              <div className="text-sm mb-2 text-muted-foreground">Choose language · भाषा चुनें</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-14 text-lg w-full"
                  onClick={() => choose("en")}
                >
                  English
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 text-lg w-full"
                  onClick={() => choose("hi")}
                >
                  हिन्दी
                </Button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Button asChild className="w-full sm:w-auto">
                <a href="/get-involved#donate">Donate</a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href="/get-involved#partner">Partner</a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-4 text-xs text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-card/70 border">80G Registered</span>
              <span className="px-3 py-1 rounded-full bg-card/70 border">Community-led</span>
              <span className="px-3 py-1 rounded-full bg-card/70 border">Human-first Design</span>
            </div>
          </section>

          {/* Illustration / Feature panel */}
          <section>
            <Card className="border shadow-md bg-card/90 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <div className="grid gap-4">
                  <div className="rounded-lg p-5 bg-primary text-primary-foreground">
                    <div className="text-sm/relaxed opacity-90">Impact</div>
                    <div className="text-2xl font-bold">25,000+ safe care touchpoints</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg p-4 bg-muted text-foreground">
                      <div className="text-xs">Midwives Trained</div>
                      <div className="text-xl font-bold">450+</div>
                    </div>
                    <div className="rounded-lg p-4 bg-card text-foreground">
                      <div className="text-xs">Container Clinics</div>
                      <div className="text-xl font-bold">12</div>
                    </div>
                    <div className="rounded-lg p-4 bg-secondary text-secondary-foreground">
                      <div className="text-xs">Villages Reached</div>
                      <div className="text-xl font-bold">150+</div>
                    </div>
                  </div>
                  <div className="rounded-lg p-5 border text-foreground bg-card">
                    "A dignified, local model for safer births." — Program Partner
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer strip */}
      <div className="px-6 text pb-8">
        <div className="container mx-auto">
          <div className="h-px bg-border" />
          <div className="text-xs text-muted-foreground pt-4">© 2024 Janam</div>
        </div>
      </div>
    </div>
  )
}
