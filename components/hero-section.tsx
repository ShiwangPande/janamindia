"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-secondary"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-accent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit">
              {language === "hi" ? "मातृ एवं शिशु स्वास्थ्य पहल" : "Maternal & Infant Health Initiative"}
            </Badge>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight font-[family-name:var(--font-space-grotesk)]">
                {t("hero.title")}
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">{t("hero.subtitle")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-lg px-8">
                {t("hero.donateButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                {t("hero.learnMore")}
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">{language === "hi" ? "आपका प्रभाव:" : "Your impact:"}</p>
              <p className="text-primary font-semibold">
                {language === "hi" ? "₹500 = एक सुरक्षित प्रसव" : "Your ₹500 = One Safe Delivery"}
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/indian-midwife-helping-pregnant-mother-in-rural-se.png"
                alt={language === "hi" ? "ग्रामीण भारत में गर्भवती मां की देखभाल करती दाई" : "Midwife providing care to pregnant mother in rural India"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">5K+</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{language === "hi" ? "सुरक्षित प्रसव" : "Safe Deliveries"}</p>
                  <p className="text-xs text-muted-foreground">{language === "hi" ? "इस वर्ष" : "This year"}</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-destructive font-bold text-lg">200+</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{language === "hi" ? "प्रशिक्षित दाइयां" : "Trained Midwives"}</p>
                  <p className="text-xs text-muted-foreground">{language === "hi" ? "सक्रिय नेटवर्क" : "Active network"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
