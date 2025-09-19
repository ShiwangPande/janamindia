"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PregnancyBookletPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Resources</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Our Pregnancy Booklet</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, visual guide to safe pregnancy, childbirth, and newborn care in Hindi and English.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                PDF preview placeholder
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button className="bg-primary">Download (EN)</Button>
              <Button variant="outline">Download (HI)</Button>
            </CardFooter>
          </Card>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">What's inside</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Do's and Don'ts for pregnancy</li>
              <li>Kangaroo care step-by-step</li>
              <li>Danger signs and when to seek care</li>
              <li>Breastfeeding and postnatal care</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}


