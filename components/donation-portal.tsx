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
import { Heart, Baby, Users, Building2, CheckCircle, CreditCard, Smartphone } from "lucide-react"
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
    {
      amount: 500,
      impact: "Safe delivery kit for 1 mother",
      icon: Baby,
      popular: true,
    },
    {
      amount: 5000,
      impact: "Train 10 community midwives",
      icon: Users,
      popular: false,
    },
    {
      amount: 50000,
      impact: "Part‑fund a mobile container clinic",
      icon: Building2,
      popular: false,
    },
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
    <div className="grid lg:grid-cols-2 gap-8">
    {/* Donation Form */}
    <div className="space-y-6">
    <div className="bg-#FFF3E6 p-4 sm:p-6 md:p-8 rounded-lg text-center md:text-left">
  <h2
    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
    style={{ color: "#1B5E20", fontFamily: "var(--font-space-grotesk)" }}
  >
    {t("getInvolved.donate.title")}
  </h2>
  <p
    className="text-base sm:text-lg md:text-xl"
    style={{ color: "#424242" }}
  >
    {t("getInvolved.donate.subtitle")}
  </p>
</div>


      {/* Amount Selection */}
      <Card className="rounded-2xl p-4 sm:p-6 md:p-8">
  <CardHeader>
    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#1B5E20" }}>
      {t("getInvolved.donate.impact")}
    </CardTitle>
    <CardDescription className="text-sm sm:text-base text-[#424242]">
      {language === "hi"
        ? "राशि चुनें या अपना मनचाहा दान दर्ज करें"
        : "Select an amount or enter a custom donation"}
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    {/* Donation Tiers */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {donationTiers.map((tier) => (
        <div
          key={tier.amount}
          className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
            selectedAmount === tier.amount
              ? "border-[#2E7D32] bg-[#A5D6A7]/20"
              : "border-[#BDBDBD] hover:border-[#2E7D32]/50"
          }`}
          onClick={() => handleAmountSelect(tier.amount)}
        >
          {tier.popular && (
            <Badge className="absolute -top-2 left-2 bg-[#FFB5A7] text-xs">
              Most Popular
            </Badge>
          )}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#A5D6A7]/30 rounded-full flex items-center justify-center">
              <tier.icon className="h-5 w-5 text-[#2E7D32]" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-[#1B5E20]">
                ₹{tier.amount.toLocaleString()}
              </div>
              <div className="text-xs text-[#424242]">{tier.impact}</div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Custom Amount */}
    <div className="space-y-2">
      <Label htmlFor="custom-amount" className="text-[#1B5E20] font-semibold">
        {language === "hi" ? "अपनी राशि" : "Custom Amount"}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BDBDBD]">₹</span>
        <Input
          id="custom-amount"
          type="number"
          placeholder={language === "hi" ? "राशि दर्ज करें" : "Enter amount"}
          className="pl-8 w-full"
          value={customAmount}
          onChange={(e) => handleCustomAmount(e.target.value)}
        />
      </div>
    </div>

    {/* Recurring Checkbox */}
    <div className="flex items-center space-x-2">
      <Checkbox
        id="recurring"
        checked={isRecurring}
        onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
      />
      <Label htmlFor="recurring" className="text-sm text-[#424242]">
        {language === "hi" ? "इसे मासिक दान बनाएं" : "Make this a monthly recurring donation"}
      </Label>
    </div>
  </CardContent>
</Card>



      {/* Payment Method */}
      <Card className="rounded-2xl p-4 sm:p-6 md:p-8">
        <CardHeader>
          <CardTitle>{language === "hi" ? "भुगतान का तरीका" : "Payment Method"}</CardTitle>
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

      {/* Donate Button */}
      <Button
        size="lg"
        className="w-full bg-[#7A2E2E] hover:bg-[#7A2E2E]/90 text-lg py-6"
        disabled={!finalAmount || finalAmount < 100 || isProcessing}
        onClick={startDonation}
      >
        {isProcessing
          ? language === "hi"
            ? "यूपीआई क्यूआर बना रहा है..."
            : "Generating UPI QR..."
          : `${isRecurring
              ? language === "hi"
                ? "मासिक दान शुरू करें"
                : "Start Monthly Donation"
              : t("getInvolved.donate.donateButton")} - ₹${finalAmount?.toLocaleString() || "0"}`}
      </Button>
    </div>

    {/* UPI QR and Impact Visualization */}
    <div className="space-y-6">
      {upiQr && (
        <Card className="rounded-2xl p-4 sm:p-6 md:p-8">
          <CardHeader>
            <CardTitle>
              {language === "hi" ? "यूपीआई से स्कैन कर भुगतान करें" : "Scan to Pay via UPI"}
            </CardTitle>
            <CardDescription>
              {language === "hi"
                ? "QR स्कैन करें या बटन दबाकर Google Pay/PhonePe/Paytm खोलें"
                : "Use Google Pay/PhonePe/Paytm to scan the QR or tap the button"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-[#FFFFFF] p-4 rounded-md border">
              <Image src={upiQr} alt="UPI QR" width={220} height={220} />
            </div>
            {upiLink && (
              <Button asChild variant="outline" className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/90 text-lg py-6">
                <a href={upiLink}>
                  {language === "hi" ? "यूपीआई ऐप खोलें" : "Open UPI App"}
                </a>
              </Button>
            )}
            <p className="text-xs text-[#424242]">
              {language === "hi"
                ? "भुगतान के बाद, आपको अपने यूपीआई ऐप में पुष्टि दिखाई देगी।"
                : "After payment, you’ll see the confirmation in your UPI app."}
            </p>
          </CardContent>
        </Card>
      )}

      <div>
        <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
          {t("getInvolved.donate.impact")}
        </h3>
        <p className="text-muted-foreground">
          {language === "hi"
            ? "देखें कि आपका दान माताओं और शिशुओं के लिए कैसे वास्तविक बदलाव लाता है।"
            : "See how your donation translates into real change for mothers and babies."}
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
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
            </div>

            {finalAmount >= 500 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  {language === "hi" ? "यह दान उपलब्ध कराएगा:" : "This donation will provide:"}
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {finalAmount >= 500 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        {language === "hi"
                          ? `${Math.floor(finalAmount / 500)} सुरक्षित डिलीवरी किट`
                          : `${Math.floor(finalAmount / 500)} safe delivery kit(s)`}
                      </span>
                    </div>
                  )}
                  {finalAmount >= 5000 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        {language === "hi"
                          ? `${Math.floor(finalAmount / 5000) * 10} दाइयों के लिए प्रशिक्षण`
                          : `Training for ${Math.floor(finalAmount / 5000) * 10} midwives`}
                      </span>
                    </div>
                  )}
                  {finalAmount >= 50000 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        {language === "hi"
                          ? `${Math.floor(finalAmount / 50000)} कंटेनर के लिए आंशिक फंड`
                          : `${Math.floor(finalAmount / 50000)}x part-funding toward a container`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Donors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Supporters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[ 
              { name: "Priya S.", amount: 2500, time: "2 hours ago" },
              { name: "Anonymous", amount: 1000, time: "4 hours ago" },
              { name: "Rajesh M.", amount: 5000, time: "6 hours ago" },
              { name: "Sunita K.", amount: 500, time: "8 hours ago" },
            ].map((donor, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{donor.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{donor.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{donor.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}
