"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

export default function FathersForCarePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Fathers for Care</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Engaging Fathers in Care</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practical guidance for fathers to support safe birthing and newborn care.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold">Birth Preparedness</h3>
            <p className="text-muted-foreground">Recognize danger signs, arrange transport, keep essentials ready.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold">Kangaroo Care Support</h3>
            <p className="text-muted-foreground">Help with skin-to-skin, warmth, and breastfeeding support.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold">Postnatal Care</h3>
            <p className="text-muted-foreground">Assist in hygiene, rest, and clinic visits for mother and baby.</p>
          </div>
        </div>
      </section>
    </div>
  )
}


