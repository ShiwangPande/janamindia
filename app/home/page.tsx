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
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Training Program
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
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
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="/training">Learn About Training</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6" />
                <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">Janam</span>
              </div>
              <p className="text-sm opacity-80">
                Safe births. Stronger families. Community-driven maternal health across rural India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Midwifery Training</li>
                <li>Container Clinics</li>
                <li>Kangaroo Care</li>
                <li>Digital Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Donate</li>
                <li>Volunteer</li>
                <li>Partner</li>
                <li>Spread Awareness</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>info@janam.org</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 Janam. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}


