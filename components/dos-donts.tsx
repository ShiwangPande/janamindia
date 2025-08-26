"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function DosDonts() {
  const { language, t } = useLanguage()

  const dos = [
    {
      title: t("dosdonts.dosList.0"),
      description:
        language === "hi"
          ? "जन्म के बाद कम से कम 1 घंटे तक त्वचा से त्वचा का संपर्क बच्चे के तापमान और सांस को नियंत्रित करने में मदद करता है।"
          : "Skin-to-skin contact for at least 1 hour after birth helps regulate baby's temperature and breathing.",
    },
    {
      title: t("dosdonts.dosList.1"),
      description:
        language === "hi"
          ? "प्रसव के दौरान हमेशा एक प्रशिक्षित दाई या स्वास्थ्य कर्मचारी को उपस्थित रखें।"
          : "Always have a trained midwife or healthcare worker present during delivery.",
    },
    {
      title: t("dosdonts.dosList.2"),
      description:
        language === "hi"
          ? "साफ हाथ, साफ प्रसव सतह, और बाँझ काटने के उपकरण संक्रमण को रोकते हैं।"
          : "Clean hands, clean delivery surface, and sterile cutting tools prevent infections.",
    },
  ]

  const donts = [
    {
      title: t("dosdonts.dontsList.0"),
      description:
        language === "hi"
          ? "यदि रक्तस्राव या गंभीर दर्द हो, तो तुरंत कुशल स्वास्थ्य सहायता से संपर्क करें।"
          : "If bleeding or severe pain occurs, immediately contact skilled healthcare assistance.",
    },
    {
      title: t("dosdonts.dontsList.1"),
      description:
        language === "hi"
          ? "नाभि काटने या प्रसव सहायता के लिए कभी भी गैर-बाँझ उपकरणों का उपयोग न करें।"
          : "Never use non-sterile tools for cutting the umbilical cord or assisting delivery.",
    },
    {
      title: t("dosdonts.dontsList.2"),
      description:
        language === "hi"
          ? "तेज बुखार, अत्यधिक रक्तस्राव, या सांस लेने में कठिनाई के लिए तत्काल चिकित्सा सहायता की आवश्यकता होती है।"
          : "High fever, excessive bleeding, or breathing difficulties require immediate medical attention.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {language === "hi" ? "आवश्यक दिशानिर्देश" : "Essential Guidelines"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            {t("dosdonts.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("dosdonts.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Do's */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary font-[family-name:var(--font-space-grotesk)]">
                {t("dosdonts.dos")}
              </h3>
            </div>
            {dos.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pl-9">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Don'ts */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="text-2xl font-bold text-destructive font-[family-name:var(--font-space-grotesk)]">
                {t("dosdonts.donts")}
              </h3>
            </div>
            {donts.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-destructive">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start space-x-2">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pl-9">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
