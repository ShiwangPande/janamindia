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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Background image with better overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqv4mucxh/image/upload/v1758282192/Gemini_Generated_Image_4g4sni4g4sni4g4s_com8zx.png')] 
        bg-cover bg-center bg-no-repeat"
      />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />

      {/* Decorative abstract blobs - more subtle */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-200/30 rounded-full blur-[60px] -z-10" />

      {/* Header */}
      <header className="relative container mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Janam" width={60} height={60} className="rounded-xl shadow-lg" />
          <div>
            <h1 className="font-logo text-4xl md:text-5xl text-emerald-800 tracking-tight drop-shadow-sm font-bold">
              Janam
            </h1>
            <p className="text-sm md:text-base text-slate-700 font-medium">Safe births. Stronger families.</p>
          </div>
        </div>
        <span className="hidden md:block text-sm text-slate-600 font-medium bg-white/60 px-3 py-1 rounded-full">
          भारत · India
        </span>
      </header>

      {/* Hero */}
      <main className="relative container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-slate-800 max-w-4xl mx-auto mb-6">
          Healthy Mothers, Healthy Futures
          <br className="block" />
          <span className="text-emerald-700">स्वस्थ माताएं, स्वस्थ भविष्य</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-700 max-w-xl mx-auto font-medium mb-12">
          Maternal care that's human-first, warm, and dignified.
        </p>

        {/* Language selection cards - improved contrast and styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {/* English Button Card */}
          <div className="group">
            <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-lg shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 mb-1">English</h3>
                <p className="text-sm text-slate-600">अंग्रेज़ी</p>
              </div>
              <Button
                size="lg"
                className="h-14 w-full rounded-2xl text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                onClick={() => choose("en")}
              >
                Continue in English
              </Button>
            </div>
          </div>

          {/* Hindi Button Card */}
          <div className="group">
            <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-lg shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 mb-1">हिन्दी</h3>
                <p className="text-sm text-slate-600">Hindi</p>
              </div>
              <Button
                size="lg"
                className="h-14 w-full rounded-2xl text-lg font-semibold bg-slate-700 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                onClick={() => choose("hi")}
              >
                हिन्दी में जारी रखें
              </Button>
            </div>
          </div>
        </div>

        {/* Trust badges - improved styling */}
     
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 border-t  border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-6 text-center text-sm text-slate-600">
        © 2024 Janam · All Rights Reserved
      </footer>
    </div>
  )
}