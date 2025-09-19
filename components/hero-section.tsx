"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative py-20 md:py-28 jn-paper">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              {language === "hi" ? "मातृ एवं शिशु स्वास्थ्य पहल" : "Maternal & Infant Health Initiative"}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight font-[family-name:var(--font-merriweather)] animate-fade-up">
              {language === "hi" ? "मातृ एवं नवजात स्वास्थ्य देखभाल को नया रूप" : "Redefining Maternal & Neonatal Healthcare"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up" style={{animationDelay: "80ms"}}>
              {language === "hi" 
                ? "ग्रामीण महिलाओं के लिए मोबाइल प्रसव क्लिनिक और दाई प्रशिक्षण के माध्यम से सुरक्षित, सम्मानजनक और सुलभ प्रसव सुनिश्चित करना।"
                : "Providing safe, dignified, and accessible childbirth for rural women through mobile birthing clinics and midwifery training."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{animationDelay: "120ms"}}>
              <Button size="lg" variant="destructive" className="w-full sm:w-auto text-base md:text-lg px-8" asChild>
                <a href="/get-involved#donate">
                  {t("hero.donateButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-8" asChild>
                <a href="#impact">{language === "hi" ? "और जानें" : "Learn More"}</a>
              </Button>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-destructive mb-1">
                {language === "hi" ? "भारत में हर 20 मिनट में एक महिला गर्भावस्था संबंधी जटिलताओं से मरती है" : "Every 20 minutes, a woman dies from pregnancy-related complications in India"}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === "hi" ? "ये मौतें रोकी जा सकती हैं" : "These deaths are preventable"}
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up" style={{animationDelay: "160ms"}}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-background jn-warm-overlay">
              <Image
                src="/indian-midwife-helping-pregnant-mother-in-rural-se.png"
                alt={language === "hi" ? "ग्रामीण भारत में गर्भवती मां की देखभाल करती दाई" : "Midwife providing care to pregnant mother in rural India"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover jn-image-muted"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
