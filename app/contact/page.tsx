"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Contact</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question or want to collaborate? Send us a message.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <form className="grid gap-4">
            <Input placeholder="Name" required />
            <Input type="email" placeholder="Email" required />
            <Textarea placeholder="Message" className="min-h-40" required />
            <Button type="submit" className="bg-primary">Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  )
}


