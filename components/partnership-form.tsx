"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Handshake, Award, Users, ArrowRight, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function PartnershipForm() {
  const { language, t } = useLanguage()
  const partnershipTypes = [
    {
      type: language === "hi" ? "कॉर्पोरेट CSR" : "Corporate CSR",
      description:
        language === "hi"
          ? "कॉर्पोरेट सामाजिक उत्तरदायित्व पहलों के माध्यम से हमारे साथ साझेदारी करें"
          : "Partner with us through your Corporate Social Responsibility initiatives",
      icon: Building2,
      benefits:
        language === "hi"
          ? ["कर लाभ", "कर्मचारी सहभागिता", "ब्रांड दृश्यता", "प्रभाव रिपोर्टिंग"]
          : ["Tax benefits", "Employee engagement", "Brand visibility", "Impact reporting"],
    },
    {
      type: language === "hi" ? "एनजीओ सहयोग" : "NGO Collaboration",
      description:
        language === "hi"
          ? "स्वास्थ्य और विकास में कार्यरत संगठनों के साथ मिलकर काम करें"
          : "Join forces with other organizations working in healthcare and development",
      icon: Handshake,
      benefits:
        language === "hi"
          ? ["संसाधन साझा करना", "संयुक्त कार्यक्रम", "ज्ञान विनिमय", "विस्तृत पहुँच"]
          : ["Resource sharing", "Joint programs", "Knowledge exchange", "Wider reach"],
    },
    {
      type: language === "hi" ? "सरकारी साझेदारी" : "Government Partnership",
      description:
        language === "hi"
          ? "मातृ स्वास्थ्य कार्यक्रमों को बढ़ाने के लिए सरकारी एजेंसियों के साथ काम करें"
          : "Work with government agencies to scale maternal health programs",
      icon: Award,
      benefits:
        language === "hi"
          ? ["नीति प्रभाव", "बड़े पैमाने पर प्रभाव", "सतत वित्तपोषण", "आधिकारिक मान्यता"]
          : ["Policy influence", "Large-scale impact", "Sustainable funding", "Official recognition"],
    },
    {
      type: language === "hi" ? "स्वास्थ्य संस्थान" : "Healthcare Institution",
      description:
        language === "hi"
          ? "अस्पतालों, क्लीनिकों और चिकित्सा संस्थानों के साथ सहयोग करें"
          : "Collaborate with hospitals, clinics, and medical institutions",
      icon: Users,
      benefits:
        language === "hi"
          ? ["क्लिनिकल विशेषज्ञता", "प्रशिक्षण सुविधाएं", "चिकित्सा संसाधन", "व्यावसायिक नेटवर्क"]
          : ["Clinical expertise", "Training facilities", "Medical resources", "Professional network"],
    },
  ]

  const currentPartners = [
    { name: "Tata Trusts", type: "Foundation", focus: "Rural Healthcare" },
    { name: "Infosys Foundation", type: "Corporate", focus: "Digital Health" },
    { name: "UNICEF India", type: "International", focus: "Child Health" },
    { name: "Ministry of Health", type: "Government", focus: "Policy Support" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
          {t("getInvolved.partnership.title")}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "hi"
            ? "भारत भर में मातृ और शिशु स्वास्थ्य परिणामों में सुधार के लिए प्रतिबद्ध भागीदारों के हमारे नेटवर्क से जुड़ें।"
            : "Join our network of partners committed to improving maternal and infant health outcomes across India."}
        </p>
      </div>

      {/* Partnership Types */}
      <div className="grid md:grid-cols-2 gap-6">
        {partnershipTypes.map((partnership, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <partnership.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{partnership.type}</CardTitle>
                </div>
              </div>
              <CardDescription>{partnership.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">{language === "hi" ? "साझेदारी के लाभ:" : "Partnership Benefits:"}</div>
                <div className="space-y-1">
                  {partnership.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partnership Form */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{language === "hi" ? "साझेदारी पूछताछ" : "Partnership Inquiry"}</CardTitle>
          <CardDescription>
            {language === "hi"
              ? "हमें अपने संगठन के बारे में बताएं और हम मिलकर प्रभाव कैसे बना सकते हैं।"
              : "Tell us about your organization and how we can work together to create impact."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">{language === "hi" ? "संगठन का नाम *" : "Organization Name *"}</Label>
              <Input id="orgName" placeholder={language === "hi" ? "आपके संगठन का नाम" : "Your organization name"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgType">{language === "hi" ? "संगठन का प्रकार *" : "Organization Type *"}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={language === "hi" ? "प्रकार चुनें" : "Select type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">{language === "hi" ? "कॉर्पोरेट" : "Corporate"}</SelectItem>
                  <SelectItem value="ngo">{language === "hi" ? "एनजीओ/गैर-लाभ" : "NGO/Non-profit"}</SelectItem>
                  <SelectItem value="government">{language === "hi" ? "सरकारी एजेंसी" : "Government Agency"}</SelectItem>
                  <SelectItem value="healthcare">{language === "hi" ? "स्वास्थ्य संस्थान" : "Healthcare Institution"}</SelectItem>
                  <SelectItem value="foundation">{language === "hi" ? "फाउंडेशन" : "Foundation"}</SelectItem>
                  <SelectItem value="other">{language === "hi" ? "अन्य" : "Other"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">{language === "hi" ? "संपर्क व्यक्ति *" : "Contact Person *"}</Label>
              <Input id="contactName" placeholder={language === "hi" ? "पूरा नाम" : "Full name"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">{language === "hi" ? "पदनाम *" : "Designation *"}</Label>
              <Input id="designation" placeholder={language === "hi" ? "आपकी भूमिका/उपाधि" : "Your role/title"} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{language === "hi" ? "ईमेल *" : "Email *"}</Label>
              <Input id="email" type="email" placeholder={language === "hi" ? "contact@organization.com" : "contact@organization.com"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{language === "hi" ? "फ़ोन नंबर *" : "Phone Number *"}</Label>
              <Input id="phone" placeholder={language === "hi" ? "+91 98765 43210" : "+91 98765 43210"} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">{language === "hi" ? "संगठन की वेबसाइट" : "Organization Website"}</Label>
            <Input id="website" placeholder={language === "hi" ? "https://www.organization.com" : "https://www.organization.com"} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnershipType">{language === "hi" ? "साझेदारी रुचि *" : "Partnership Interest *"}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={language === "hi" ? "साझेदारी प्रकार चुनें" : "Select partnership type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="funding">{language === "hi" ? "वित्तीय सहायता" : "Funding Support"}</SelectItem>
                <SelectItem value="program">{language === "hi" ? "कार्यक्रम सहयोग" : "Program Collaboration"}</SelectItem>
                <SelectItem value="training">{language === "hi" ? "प्रशिक्षण साझेदारी" : "Training Partnership"}</SelectItem>
                <SelectItem value="technology">{language === "hi" ? "प्रौद्योगिकी सहायता" : "Technology Support"}</SelectItem>
                <SelectItem value="advocacy">{language === "hi" ? "वकालत और जागरूकता" : "Advocacy & Awareness"}</SelectItem>
                <SelectItem value="research">{language === "hi" ? "अनुसंधान सहयोग" : "Research Collaboration"}</SelectItem>
                <SelectItem value="other">{language === "hi" ? "अन्य" : "Other"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">{language === "hi" ? "संभावित बजट सीमा (वैकल्पिक)" : "Potential Budget Range (Optional)"}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={language === "hi" ? "बजट सीमा चुनें" : "Select budget range"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-1l">{language === "hi" ? "₹1 लाख से कम" : "Under ₹1 Lakh"}</SelectItem>
                <SelectItem value="1l-5l">{language === "hi" ? "₹1-5 लाख" : "₹1-5 Lakhs"}</SelectItem>
                <SelectItem value="5l-25l">{language === "hi" ? "₹5-25 लाख" : "₹5-25 Lakhs"}</SelectItem>
                <SelectItem value="25l-1cr">{language === "hi" ? "₹25 लाख - 1 करोड़" : "₹25 Lakhs - 1 Crore"}</SelectItem>
                <SelectItem value="above-1cr">{language === "hi" ? "1 करोड़ से अधिक" : "Above ₹1 Crore"}</SelectItem>
                <SelectItem value="non-financial">{language === "hi" ? "गैर-वित्तीय सहायता" : "Non-financial Support"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgDescription">{language === "hi" ? "आपके संगठन के बारे में *" : "About Your Organization *"}</Label>
            <Textarea
              id="orgDescription"
              placeholder={language === "hi" ? "अपने संगठन, मिशन और वर्तमान फोकस क्षेत्रों का संक्षिप्त विवरण..." : "Brief description of your organization, mission, and current focus areas..."}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnershipGoals">{language === "hi" ? "साझेदारी के लक्ष्य *" : "Partnership Goals *"}</Label>
            <Textarea
              id="partnershipGoals"
              placeholder={language === "hi" ? "आप इस साझेदारी के माध्यम से क्या हासिल करना चाहते हैं? यह आपके संगठन के लक्ष्यों के साथ कैसे मेल खाता है?" : "What do you hope to achieve through this partnership? How does it align with your organization's goals?"}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">{language === "hi" ? "पसंदीदा समयसीमा" : "Preferred Timeline"}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={language === "hi" ? "आप कब शुरू करना चाहेंगे?" : "When would you like to start?"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">{language === "hi" ? "तुरंत" : "Immediately"}</SelectItem>
                <SelectItem value="1-3months">{language === "hi" ? "1-3 महीने" : "1-3 months"}</SelectItem>
                <SelectItem value="3-6months">{language === "hi" ? "3-6 महीने" : "3-6 months"}</SelectItem>
                <SelectItem value="6-12months">{language === "hi" ? "6-12 महीने" : "6-12 months"}</SelectItem>
                <SelectItem value="flexible">{language === "hi" ? "लचीला" : "Flexible"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
            {language === "hi" ? "साझेदारी पूछताछ भेजें" : "Submit Partnership Inquiry"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Current Partners */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "hi" ? "हमारे वर्तमान साझेदार" : "Our Current Partners"}</CardTitle>
          <CardDescription>
            {language === "hi"
              ? "हम मातृ स्वास्थ्य के लिए प्रतिबद्ध अग्रणी संगठनों के साथ काम करने पर गर्व करते हैं"
              : "We're proud to work with leading organizations committed to maternal health"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentPartners.map((partner, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-sm">{partner.name}</div>
                <Badge variant="outline" className="text-xs mt-1 mb-2">
                  {partner.type}
                </Badge>
                <div className="text-xs text-muted-foreground">{partner.focus}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
