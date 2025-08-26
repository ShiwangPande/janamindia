"use client"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

const team = [
  { name: "Founder Name", role: "Founder & CEO", bio: "Public health leader and maternal care advocate.", img: "/placeholder-user.jpg" },
  { name: "Clinical Lead", role: "Head of Midwifery", bio: "Trains and mentors community midwives.", img: "/placeholder-user.jpg" },
  { name: "Operations Lead", role: "Programs & Partnerships", bio: "Builds community and institutional partnerships.", img: "/placeholder-user.jpg" },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Our Team</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The people behind Janam's mission of safe births and stronger families.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="p-6 rounded-2xl bg-white shadow-sm border flex flex-col items-center text-center">
              <Image src={member.img} alt={member.name} width={120} height={120} className="rounded-full object-cover" />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="text-muted-foreground mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


