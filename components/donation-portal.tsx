"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Baby, Users, Building2, CheckCircle, Smartphone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function DonationPortal() {
  const { t, language } = useLanguage()
  const [selectedAmount, setSelectedAmount] = useState<number>(500)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("upi")
  const [upiQr, setUpiQr] = useState<string>("")
  const [upiLink, setUpiLink] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const donationTiers = [
    { amount: 500, impact: "Safe delivery kit for 1 mother", icon: Baby, popular: true },
    { amount: 5000, impact: "Train 10 community midwives", icon: Users, popular: false },
    { amount: 50000, impact: "Part-fund a mobile container clinic", icon: Building2, popular: false },
  ]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }
  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(0)
  }

  const finalAmount = customAmount ? Number.parseInt(customAmount) : selectedAmount

  const startDonation = async () => {
    setIsProcessing(true)
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountInRupees: finalAmount, isRecurring }),
      })
      if (!res.ok) throw new Error("Failed to init donation")
      const data = await res.json()
      setUpiQr(data.qrDataUrl)
      setUpiLink(data.upiLink)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ color: "#1B5E20", fontFamily: "var(--font-space-grotesk)" }}
        >
          {t("getInvolved.donate.title")}
        </h2>
        <p className="text-base md:text-lg text-[#424242]">
          {t("getInvolved.donate.subtitle")}
        </p>
      </div>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Amount Selection */}
          <Card className="rounded-xl p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#1B5E20]">
                {t("getInvolved.donate.impact")}
              </CardTitle>
              <CardDescription className="text-sm text-[#424242]">
                {language === "hi"
                  ? "राशि चुनें या अपना मनचाहा दान दर्ज करें"
                  : "Select an amount or enter a custom donation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {donationTiers.map((tier) => (
                  <div
                    key={tier.amount}
                    className={`relative p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedAmount === tier.amount
                        ? "border-[#2E7D32] bg-[#A5D6A7]/20"
                        : "border-[#BDBDBD] hover:border-[#2E7D32]/50"
                    }`}
                    onClick={() => handleAmountSelect(tier.amount)}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-2 left-2 bg-[#FFB5A7] text-xs">
                        Popular
                      </Badge>
                    )}
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#A5D6A7]/30 rounded-full flex items-center justify-center">
                        <tier.icon className="h-4 w-4 text-[#2E7D32]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#1B5E20]">
                          ₹{tier.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-[#424242]">{tier.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Amount */}
              <div>
                <Label htmlFor="custom-amount" className="text-sm font-semibold text-[#1B5E20]">
                  {language === "hi" ? "अपनी राशि" : "Custom Amount"}
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDBDBD]">₹</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder={language === "hi" ? "राशि दर्ज करें" : "Enter amount"}
                    className="pl-7"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Recurring */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recurring"
                  checked={isRecurring}
                  onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
                />
                <Label htmlFor="recurring" className="text-sm text-[#424242]">
                  {language === "hi" ? "इसे मासिक दान बनाएं" : "Make this monthly"}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="rounded-xl p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">
                {language === "hi" ? "भुगतान का तरीका" : "Payment Method"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>UPI (Google Pay, PhonePe, Paytm)</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="w-full bg-[#7A2E2E] hover:bg-[#7A2E2E]/90"
            disabled={!finalAmount || finalAmount < 100 || isProcessing}
            onClick={startDonation}
          >
            {isProcessing
              ? language === "hi"
                ? "क्यूआर बना रहा है..."
                : "Generating QR..."
              : `${isRecurring ? (language === "hi" ? "मासिक दान" : "Monthly") : "Donate"} - ₹${finalAmount?.toLocaleString() || "0"}`}
          </Button>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* QR Section */}
          {upiQr && (
            <Card className="rounded-xl p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">
                  {language === "hi" ? "स्कैन करें और भुगतान करें" : "Scan & Pay"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {language === "hi"
                    ? "Google Pay/PhonePe/Paytm का उपयोग करें"
                    : "Use Google Pay / PhonePe / Paytm"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-3">
                <div className="bg-white p-3 rounded-md border">
                  <Image src={upiQr} alt="UPI QR" width={160} height={160} />
                </div>
                {upiLink && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={upiLink}>
                      {language === "hi" ? "UPI ऐप खोलें" : "Open UPI App"}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Impact Card */}
          <Card className="rounded-xl p-4 border-primary/20 bg-primary/5">
            <CardContent className="text-center space-y-3">
              <Heart className="h-8 w-8 text-primary mx-auto" />
              <div className="text-xl font-bold text-primary">
                ₹{finalAmount?.toLocaleString() || "0"}
              </div>
              <div className="text-sm text-muted-foreground">
                {isRecurring
                  ? language === "hi"
                    ? "मासिक दान"
                    : "Monthly Donation"
                  : language === "hi"
                    ? "एक बार का दान"
                    : "One-time Donation"}
              </div>
            </CardContent>
          </Card>

          {/* Recent Donors */}
          <Card className="rounded-xl p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Recent Supporters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[ 
                { name: "Priya S.", amount: 2500, time: "2h ago" },
                { name: "Anonymous", amount: 1000, time: "4h ago" },
                { name: "Rajesh M.", amount: 5000, time: "6h ago" },
                { name: "Sunita K.", amount: 500, time: "8h ago" },
              ].map((donor, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-medium">{donor.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{donor.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{donor.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
