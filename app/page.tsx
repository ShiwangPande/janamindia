"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#FDF6EC] to-[#FAF3E7]">
      {/* Decorative abstract blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FFB5A7]/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A5D6A7]/40 rounded-full blur-[100px] -z-10" />

      {/* Header */}
      <header className="container mx-auto px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Janam" width={60} height={60} className="rounded-xl" />
          <div>
            <h1 className="font-logo text-4xl md:text-6xl text-primary tracking-tight drop-shadow-sm">
              Janam
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">Safe births. Stronger families.</p>
          </div>
        </div>
        <span className="hidden md:block text-sm text-muted-foreground">भारत · India</span>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-foreground max-w-3xl mx-auto">
          Healthy Mothers, Healthy Futures · <br className="hidden md:block" /> स्वस्थ माताएं, स्वस्थ भविष्य
        </h2>
        <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-xl mx-auto">
          Maternal care that’s human-first, warm, and dignified.
        </p>

        {/* Language selection cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-white/40 hover:scale-105 transition">
            <Button
              size="lg"
              className="h-14 w-full rounded-full text-lg bg-[#2E7D32] hover:bg-[#2E7D32]/90 shadow-md"
              onClick={() => choose("en")}
            >
              English · अंग्रेज़ी
            </Button>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-white/40 hover:scale-105 transition">
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-full text-lg border-[#D7CCB8] hover:bg-[#F9F3E6] shadow-sm"
              onClick={() => choose("hi")}
            >
              हिन्दी · Hindi
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-foreground/70">
          {["80G Registered", "Community-led", "Human-first"].map((badge, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full bg-white/80 border border-[#E8DFCF] shadow-sm backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © 2024 Janam · All Rights Reserved
      </footer>
    </div>
  )
}
