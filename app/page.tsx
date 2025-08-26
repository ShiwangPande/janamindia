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
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(1200px_700px_at_50%_-20%,#EDE6D7_0%,transparent_60%)]">
      {/* subtle paper grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{backgroundImage:"radial-gradient(#000 0.8px, transparent 0.8px)", backgroundSize:"5px 5px"}} />

      {/* Header brand mark */}
      <div className="container mx-auto px-6 pt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Image 
              src="/logo.jpg" 
              alt="Janam logo" 
              width={72} 
              height={72} 
              className="rounded-xl shadow-lg ring-2 ring-white/20" 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="flex flex-col">
            <div className="font-logo text-5xl md:text-7xl leading-none text-primary tracking-tight drop-shadow-sm">
              Janam
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
              Safe births. Stronger families.
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span>भारत · India</span>
        </div>
      </div>

      {/* Hero */}
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-[20px] border border-[#D7CCB8] bg-[#FCF8EF] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            {/* corner ornaments */}
            <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-[#A5D6A7]/30 blur-2xl" />
            <div className="absolute -bottom-8 -right-6 h-24 w-24 rounded-full bg-[#FFB5A7]/30 blur-2xl" />
            <div className="relative p-7 md:p-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium bg-[#FFF3E6] text-[#7A2E2E] border border-[#F1E2D3]">
                  Choose language · भाषा चुनें
                </div>
              </div>
              <h1 className="text-center text-[30px] md:text-[46px] leading-[1.1] font-[family-name:var(--font-merriweather)] text-foreground">
                Healthy Mothers, Healthy Futures · स्वस्थ माताएं, स्वस्थ भविष्य
              </h1>
              <p className="mt-3 text-center text-[15px] md:text-base text-foreground/75">
                Vintage, human‑first maternal care — warm, dignified and community‑led.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-14 rounded-[999px] text-lg w-full bg-[#2E7D32] hover:bg-[#2E7D32]/90"
                  onClick={() => choose("en")}
                  aria-label="Continue in English"
                >
                  English · अंग्रेज़ी
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-[999px] text-lg w-full border-[#D7CCB8] hover:bg-[#F9F3E6]"
                  onClick={() => choose("hi")}
                  aria-label="हिन्दी में जारी रखें"
                >
                  हिन्दी · Hindi
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3 text-[11px] text-foreground/60">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E8DFCF]">80G Registered</span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E8DFCF]">Community‑led</span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E8DFCF]">Human‑first</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <div className="px-6 text pb-10">
        <div className="container mx-auto">
          <div className="h-px bg-border" />
          <div className="text-xs text-muted-foreground pt-4">© 2024 Janam</div>
        </div>
      </div>
    </div>
  )
}
