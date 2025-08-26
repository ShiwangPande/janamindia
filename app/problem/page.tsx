"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

export default function ProblemPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">The Problem</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Maternal and Infant Mortality</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rural India faces high maternal and neonatal mortality due to lack of skilled care, delays, and distance.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold">Delay 1</h3>
            <p className="text-muted-foreground">Delay in deciding to seek care due to low awareness or cultural barriers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold">Delay 2</h3>
            <p className="text-muted-foreground">Delay in reaching care due to distance and transport challenges.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold">Delay 3</h3>
            <p className="text-muted-foreground">Delay in receiving quality care due to facility constraints.</p>
          </div>
        </div>
      </section>
    </div>
  )
}


