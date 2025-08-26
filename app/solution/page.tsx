"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { ProgramSnippets } from "@/components/program-snippets"

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Our Solution</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Programs that Save Lives</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Community midwifery training, mobile container clinics, and family-centered kangaroo care.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProgramSnippets />
        </div>
      </section>
    </div>
  )
}


