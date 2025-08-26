"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ProgramSnippets() {
  const { language, t } = useLanguage()

  const stories = [
    {
      title: language === "hi" ? "सुनीता का सुरक्षित प्रसव" : "Sunita's Safe Delivery",
      location: language === "hi" ? "राजस्थान" : "Rajasthan",
      date: language === "hi" ? "दिसंबर 2024" : "December 2024",
      image: "/indian-woman-holding-newborn-baby--smiling--rural-.png",
      description:
        language === "hi"
          ? "हमारी प्रशिक्षित दाई कमला की मदद से, सुनीता ने अपने स्वस्थ बेटे को घर पर सुरक्षित रूप से जन्म दिया। हमारे कार्यक्रम के माध्यम से सीखी गई कंगारू देखभाल तकनीकों ने तत्काल बंधन स्थापित करने में मदद की।"
          : "With the help of our trained midwife Kamala, Sunita delivered her healthy baby boy safely at home. The kangaroo care techniques learned through our program helped establish immediate bonding.",
      impact: language === "hi" ? "माँ और बच्चा स्वस्थ" : "Mother & baby healthy",
      category: language === "hi" ? "सफलता की कहानी" : "Success Story",
    },
    {
      title: language === "hi" ? "मोबाइल क्लिनिक दूरदराज के गांव तक पहुंची" : "Mobile Clinic Reaches Remote Village",
      location: language === "hi" ? "ओडिशा" : "Odisha",
      date: language === "hi" ? "नवंबर 2024" : "November 2024",
      image: "/mobile-medical-container-clinic-in-rural-indian-vi.png",
      description:
        language === "hi"
          ? "हमारी कंटेनर क्लिनिक ने कलाहांडी जिले में आवश्यक प्रसवपूर्व देखभाल पहुंचाई, उन क्षेत्रों में 45 गर्भवती माताओं की सेवा की जहां पहले कुशल स्वास्थ्य सेवा उपलब्ध नहीं थी।"
          : "Our container clinic brought essential prenatal care to Kalahandi district, serving 45 pregnant mothers in areas previously without access to skilled healthcare.",
      impact: language === "hi" ? "45 माताओं की सेवा" : "45 mothers served",
      category: language === "hi" ? "कंटेनर क्लिनिक" : "Container Clinic",
    },
    {
      title: language === "hi" ? "नई दाइयों का स्नातक" : "New Midwives Graduate",
      location: language === "hi" ? "महाराष्ट्र" : "Maharashtra",
      date: language === "hi" ? "अक्टूबर 2024" : "October 2024",
      image: "/group-of-indian-women-in-white-coats-receiving-cer.png",
      description:
        language === "hi"
          ? "पच्चीस महिलाओं ने हमारे व्यापक दाई प्रशिक्षण कार्यक्रम को पूरा किया, जीवन रक्षक कौशल और दयालु देखभाल के साथ अपने समुदायों की सेवा करने के लिए तैयार।"
          : "Twenty-five women completed our comprehensive midwifery training program, ready to serve their communities with life-saving skills and compassionate care.",
      impact: language === "hi" ? "25 नई दाइयां" : "25 new midwives",
      category: language === "hi" ? "प्रशिक्षण" : "Training",
    },
    {
      title: language === "hi" ? "डिजिटल स्वास्थ्य शिक्षा लॉन्च" : "Digital Health Education Launch",
      location: language === "hi" ? "पैन-इंडिया" : "Pan-India",
      date: language === "hi" ? "सितंबर 2024" : "September 2024",
      image: "/indian-women-using-mobile-phones-for-health-educat.png",
      description:
        language === "hi"
          ? "हमारे बहुभाषी डिजिटल प्लेटफॉर्म को लॉन्च किया जो गर्भावस्था मार्गदर्शन, आपातकालीन प्रोटोकॉल, और व्हाट्सऐप और एसएमएस के माध्यम से स्वास्थ्य सहायता तक सीधी पहुंच प्रदान करता है।"
          : "Launched our multilingual digital platform providing pregnancy guidance, emergency protocols, and direct access to healthcare support via WhatsApp and SMS.",
      impact: language === "hi" ? "10,000+ उपयोगकर्ता" : "10,000+ users",
      category: language === "hi" ? "डिजिटल आउटरीच" : "Digital Outreach",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t("programs.title")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            {language === "hi" ? "क्षेत्र से कहानियां" : "Stories from the Field"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hi"
              ? "ग्रामीण भारत में हमारे कार्यक्रमों से प्रभाव की वास्तविक कहानियां, जो दिखाती हैं कि हम मिलकर क्या बदलाव लाते हैं।"
              : "Real stories of impact from our programs across rural India, showcasing the difference we make together."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {story.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {story.date}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{story.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {story.location}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-4 line-clamp-3">{story.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm font-medium text-primary">
                    <Users className="h-4 w-4 mr-1" />
                    {story.impact}
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    {language === "hi" ? "और पढ़ें" : "Read More"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            {language === "hi" ? "सभी कहानियां देखें" : "View All Stories"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
