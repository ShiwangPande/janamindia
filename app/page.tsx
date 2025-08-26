"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function LanguageLandingRoot() {
  const router = useRouter()
  const { setLanguage } = useLanguage()

  const choose = (lang: "en" | "hi") => {
    setLanguage(lang)
    router.push("/home")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative gradient background using Janam palette */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#A5D6A7_0%,#FFF3E6_40%,#A5D6A7_100%)]" />
      <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30 bg-[#FFB5A7]" />
      <div className="absolute -bottom-24 -left-16 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40 bg-[#2E7D32]" />

      {/* Header brand mark */}
      <div className="container mx-auto px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2E7D32]">
            <span className="text-white text-xl font-bold">J</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1B5E20] font-[family-name:var(--font-space-grotesk)]">Janam</div>
            <div className="text-sm text-[#424242]/80">Safe births. Stronger families.</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-[#424242]/70">
          <span>भारत · India</span>
        </div>
      </div>

      {/* Hero */}
      <main className="container mx-auto px-6 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <section className="space-y-6">
            <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-[#A5D6A7] text-[#1B5E20]">
              Maternal Health Initiative
            </div>
            <h1 className="text-4xl md:text-6xl leading-tight font-[family-name:var(--font-space-grotesk)] font-bold text-[#1B5E20]">
              Healthy Mothers, Healthy Futures
            </h1>
            <p className="text-lg md:text-xl text-[#424242]">
              Community midwifery, mobile clinics and education — built with and for rural India.
            </p>

            {/* Language choice */}
            <div className="mt-6">
              <div className="text-sm mb-2 text-[#424242]/80">Choose language · भाषा चुनें</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-14 text-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white border border-[#1B5E20]/20"
                  onClick={() => choose("en")}
                >
                  English
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 text-lg border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#A5D6A7]/30"
                  onClick={() => choose("hi")}
                >
                  हिन्दी
                </Button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-3">
              <Button asChild className="bg-[#7A2E2E] hover:bg-[#6a2626] text-white">
                <a href="/get-involved#donate">Donate</a>
              </Button>
              <Button asChild variant="outline" className="border-[#7A2E2E] text-[#7A2E2E] hover:bg-[#FFF3E6]">
                <a href="/get-involved#partner">Partner</a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-4 text-xs text-[#424242]/80">
              <span className="px-3 py-1 rounded-full bg-white/70 border border-[#BDBDBD]">80G Registered</span>
              <span className="px-3 py-1 rounded-full bg-white/70 border border-[#BDBDBD]">Community-led</span>
              <span className="px-3 py-1 rounded-full bg-white/70 border border-[#BDBDBD]">Human-first Design</span>
            </div>
          </section>

          {/* Illustration / Feature panel */}
          <section>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <div className="grid gap-4">
                  <div className="rounded-lg p-5 bg-[#2E7D32] text-white">
                    <div className="text-sm opacity-90">Impact</div>
                    <div className="text-2xl font-bold">25,000+ safe care touchpoints</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg p-4 bg-[#A5D6A7] text-[#1B5E20]">
                      <div className="text-xs">Midwives Trained</div>
                      <div className="text-xl font-bold">450+</div>
                    </div>
                    <div className="rounded-lg p-4 bg-[#FFF3E6] text-[#424242]">
                      <div className="text-xs">Container Clinics</div>
                      <div className="text-xl font-bold">12</div>
                    </div>
                    <div className="rounded-lg p-4 bg-[#FFB5A7] text-[#7A2E2E]">
                      <div className="text-xs">Villages Reached</div>
                      <div className="text-xl font-bold">150+</div>
                    </div>
                  </div>
                  <div className="rounded-lg p-5 border border-[#BDBDBD] text-[#424242]">
                    "A dignified, local model for safer births." — Program Partner
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer strip */}
      <div className="px-6 pb-8">
        <div className="container mx-auto">
          <div className="h-px bg-[#BDBDBD]" />
          <div className="text-xs text-[#424242]/70 pt-4">© 2024 Janam</div>
        </div>
      </div>
    </div>
  )
}
