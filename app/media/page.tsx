"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Media & Updates</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Press & Recognitions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            IB Grant, Inflection, crowdfunding milestones and media mentions.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Press Mention {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Short description of the article or recognition with a link.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Short video */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="aspect-video w-full rounded-xl overflow-hidden border bg-black/5 flex items-center justify-center text-muted-foreground">
            Our work video placeholder
          </div>
        </div>
      </section>
    </div>
  )
}


