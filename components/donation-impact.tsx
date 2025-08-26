"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  { amount: "₹500", title: "Safe Delivery Kit", desc: "Provides a clean, safe delivery kit for 1 mother" },
  { amount: "₹5,000", title: "Train 10 Midwives", desc: "Supports core modules for 10 community midwives" },
  { amount: "₹50,000", title: "Part-fund a Container", desc: "Helps deploy essential equipment for a clinic" },
]

export function DonationImpact() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tiers.map((t) => (
        <Card key={t.amount} className="border-[#A5D6A7]">
          <CardHeader>
            <CardTitle className="text-2xl text-[#2E7D32]">{t.amount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-primary">{t.title}</div>
            <div className="text-muted-foreground">{t.desc}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


