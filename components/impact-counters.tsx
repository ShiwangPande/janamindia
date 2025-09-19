"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Baby, Award, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function ImpactCounters() {
  const { t, language } = useLanguage()

  const stats = [
    {
      icon: Baby,
      value: 720, // 20 minutes = 720 deaths per day
      suffix: "",
      label: language === "hi" ? "दैनिक मातृ मृत्यु" : "Daily Maternal Deaths",
      description: language === "hi" ? "भारत में हर 20 मिनट में" : "Every 20 minutes in India",
    },
    {
      icon: Users,
      value: 60,
      suffix: "%",
      label: language === "hi" ? "ग्रामीण महिलाएं" : "Rural Women",
      description: language === "hi" ? "10 किमी के भीतर स्वास्थ्य सेवा नहीं" : "Lack healthcare within 10km",
    },
    {
      icon: Award,
      value: 2000,
      suffix: "$",
      label: language === "hi" ? "कंटेनर क्लिनिक की लागत" : "Container Clinic Cost",
      description: language === "hi" ? "पूरी तरह सुसज्जित मोबाइल क्लिनिक" : "Fully equipped mobile clinic",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            {t("impact.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hi"
              ? "हर संख्या एक प्रभावित जीवन, मजबूत परिवार और सशक्त समुदाय का प्रतिनिधित्व करती है।"
              : "Every number represents a life touched, a family strengthened, and a community empowered."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2 font-[family-name:var(--font-space-grotesk)]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
