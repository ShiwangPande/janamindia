import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Stethoscope } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { ImpactCounters } from "@/components/impact-counters"
import { DosDonts } from "@/components/dos-donts"
import { ProgramSnippets } from "@/components/program-snippets"
import { InteractiveFeatures } from "@/components/interactive-features"
import { AIChatbot } from "@/components/ai-chatbot"
import { SiteHeader } from "@/components/site-header"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Impact Counters */}
      <ImpactCounters />

      {/* Interactive Features */}
      <InteractiveFeatures />

      {/* Do's & Don'ts */}
      <DosDonts />

      {/* Program Snippets */}
      <ProgramSnippets />

      {/* Midwifery Training Teaser */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Training Program
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-merriweather)]">
              Empowering Community Midwives
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our comprehensive training program equips local women with essential midwifery skills, creating a network
              of skilled birth attendants in rural communities.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="text-center">
                  <Stethoscope className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle>Clinical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hands-on training in safe delivery practices, emergency care, and newborn health.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle>Community Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Building trust and establishing sustainable healthcare networks within communities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle>Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Recognized certification program with ongoing mentorship and support.
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button size="lg" className="" asChild>
              <a href="/training">Learn About Training</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer (minimal) */}
      <footer className="bg-[var(--jn-forest)] text-black py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
         
          <Image src="/logo.jpg" alt="Janam logo" width={56} height={56} className="rounded-md shadow-sm" />
          <span className="font-logo text-4xl md:text-6xl leading-none text-primary drop-shadow-sm tracking-tight">Janam</span>
        </div>
            <p className="text-sm opacity-90 max-w-xl">
              Safe births. Stronger families. Community-driven maternal health across rural India.
            </p>
            <p className="text-xs opacity-80">© 2024 Janam. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}


