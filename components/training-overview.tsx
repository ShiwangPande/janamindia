"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Award, Clock, MapPin, CheckCircle, BookOpen, Heart, Baby, Shield, Lightbulb } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function TrainingOverview() {
  const { language, t } = useLanguage()

  const programHighlights = [
    {
      icon: Clock,
      title: language === "hi" ? "6-महीने का कार्यक्रम" : "6-Month Program",
      description:
        language === "hi"
          ? "सिद्धांत और व्यावहारिक अभ्यास के साथ व्यापक प्रशिक्षण"
          : "Comprehensive training with theory and hands-on practice",
    },
    {
      icon: Award,
      title: language === "hi" ? "प्रमाणित योग्यता" : "Certified Qualification",
      description:
        language === "hi" ? "राष्ट्रीय स्तर पर मान्यता प्राप्त दाई प्रमाणन" : "Nationally recognized midwifery certification",
    },
    {
      icon: Users,
      title: language === "hi" ? "विशेषज्ञ प्रशिक्षक" : "Expert Instructors",
      description:
        language === "hi" ? "अनुभवी डॉक्टरों और वरिष्ठ दाइयों से सीखें" : "Learn from experienced doctors and senior midwives",
    },
    {
      icon: MapPin,
      title: language === "hi" ? "सामुदायिक नियुक्ति" : "Community Placement",
      description:
        language === "hi" ? "आपके स्थानीय समुदाय में गारंटीशुदा नियुक्ति" : "Guaranteed placement in your local community",
    },
  ]

  const curriculum = [
    {
      module: language === "hi" ? "दाई का मूलभूत अध्ययन" : "Foundation of Midwifery",
      duration: language === "hi" ? "4 सप्ताह" : "4 weeks",
      topics: [
        language === "hi" ? "संस्कृति और शारीरिक ज्ञान" : "Anatomy & Physiology",
        language === "hi" ? "गर्भावस्था मूलभूत" : "Pregnancy Basics",
        language === "hi" ? "सांस्कृतिक संवेदनशीलता" : "Cultural Sensitivity",
        language === "hi" ? "संवाद शिक्षण" : "Communication Skills",
      ],
      progress: 100,
    },
    {
      module: language === "hi" ? "गर्भावस्था देखभाल" : "Prenatal Care",
      duration: language === "hi" ? "6 सप्ताह" : "6 weeks",
      topics: [
        language === "hi" ? "स्वास्थ्य अध्ययन" : "Health Assessment",
        language === "hi" ? "खतरनाकता पहचान" : "Risk Identification",
        language === "hi" ? "नागिनी सलाह" : "Nutrition Counseling",
        language === "hi" ? "जन्म योजना" : "Birth Planning",
      ],
      progress: 100,
    },
    {
      module: language === "hi" ? "जन्म और देखभाल" : "Labor & Delivery",
      duration: language === "hi" ? "8 सप्ताह" : "8 weeks",
      topics: [
        language === "hi" ? "सामान्य जन्म" : "Normal Labor",
        language === "hi" ? "खराबी प्रबंधन" : "Pain Management",
        language === "hi" ? "संक्रिमण नियमावली" : "Emergency Procedures",
        language === "hi" ? "नए बच्चे की देखभाल" : "Newborn Care",
      ],
      progress: 85,
    },
    {
      module: language === "hi" ? "पश्चिमावस्था देखभाल" : "Postnatal Care",
      duration: language === "hi" ? "4 सप्ताह" : "4 weeks",
      topics: [
        language === "hi" ? "बच्चे की देखभाल की सहायता" : "Breastfeeding Support",
        language === "hi" ? "पश्चिमावस्था पुनर्स्थापन" : "Postpartum Recovery",
        language === "hi" ? "परिवार योजना" : "Family Planning",
        language === "hi" ? "बच्चे की देखभाल" : "Infant Care",
      ],
      progress: 70,
    },
    {
      module: language === "hi" ? "समुदाय स्वास्थ्य" : "Community Health",
      duration: language === "hi" ? "4 सप्ताह" : "4 weeks",
      topics: [
        language === "hi" ? "स्वास्थ्य शिक्षण" : "Health Education",
        language === "hi" ? "समुदाय अभियान" : "Community Mobilization",
        language === "hi" ? "रिकॉर्ड किंग" : "Record Keeping",
        language === "hi" ? "संदर्भ प्रणाली" : "Referral Systems",
      ],
      progress: 45,
    },
    {
      module: language === "hi" ? "संरक्षित अभ्यास" : "Clinical Practice",
      duration: language === "hi" ? "6 सप्ताह" : "6 weeks",
      topics: [
        language === "hi" ? "संरक्षित जन्म" : "Supervised Deliveries",
        language === "hi" ? "प्रश्नों का अध्ययन" : "Case Studies",
        language === "hi" ? "कौशल परीक्षण" : "Skill Assessment",
        language === "hi" ? "प्रमाणन परीक्षा" : "Certification Exam",
      ],
      progress: 20,
    },
  ]

  const outcomes = [
    {
      icon: Baby,
      title: language === "hi" ? "सुरक्षित जन्म कौशल" : "Safe Delivery Skills",
      description:
        language === "hi"
          ? "सामान्य और जटिल जन्मों के तकनीकों को मासूरा करें"
          : "Master techniques for normal and complicated deliveries",
    },
    {
      icon: Shield,
      title: language === "hi" ? "आपातकालीन प्रतिक्रिया" : "Emergency Response",
      description:
        language === "hi"
          ? "उपस्थापक अपातकालीन घटनाओं का सामना करें और जब संदर्भ देना चाहिए जानें"
          : "Handle obstetric emergencies and know when to refer",
    },
    {
      icon: Heart,
      title: language === "hi" ? "दयालु देखभाल" : "Compassionate Care",
      description:
        language === "hi"
          ? "अनुभवी डॉक्टरों और वरिष्ठ दाइयों से सीखें"
          : "Provide emotional support and culturally sensitive care",
    },
    {
      icon: Lightbulb,
      title: language === "hi" ? "स्वास्थ्य शिक्षण" : "Health Education",
      description:
        language === "hi"
          ? "समुदायों और परिवारों को मातृ स्वास्थ्य के बारे में सिखाएं"
          : "Educate families and communities about maternal health",
    },
  ]

  const testimonials = [
    {
      name: "Kamala Devi",
      location: "Udaipur, Rajasthan",
      quote:
        language === "hi"
          ? "यह प्रशिक्षण मेरे जीवन को बदल दिया। मैं जन्म के लिए चिंतित थी, लेकिन अब मैं 67 माताओं को सुरक्षित रूप से जन्म देने में आत्मविश्वास पूरा कर रही हूँ।"
          : "This training changed my life. I went from being nervous about deliveries to confidently helping 67 mothers safely deliver their babies.",
      deliveries: 67,
      experience: "2 years",
    },
    {
      name: "Sunita Sharma",
      location: "Patna, Bihar",
      quote:
        language === "hi"
          ? "हाथों में अभ्यास और मित्रता दायी मुख्य रूप से मुझे अपने समुदाय को सेवा करने के लिए कौशल और आत्मविश्वास देने में मदद की।"
          : "The hands-on practice and mentorship gave me the skills and confidence to serve my community. Every safe delivery fills my heart with joy.",
      deliveries: 45,
      experience: "1.5 years",
    },
    {
      name: "Meera Patel",
      location: "Ahmedabad, Gujarat",
      quote:
        language === "hi"
          ? "यह प्रशिक्षण मुझे चिकित्सा कौशल देता है, लेकिन समुदाय में विश्वास निर्माण करने के लिए भी सिखाता है। अब मैं मातृ देखभाल के लिए समुदाय की पहचानी है।"
          : "The training not only taught me medical skills but also how to build trust in the community. Now I'm the go-to person for maternal care.",
      deliveries: 89,
      experience: "3 years",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Program Overview */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">{t("training.title")}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {language === "hi"
            ? "हमारा साक्ष्य-आधारित पाठ्यक्रम पारंपरिक ज्ञान को आधुनिक चिकित्सा प्रथाओं के साथ जोड़ता है, आपको अपने समुदाय में सुरक्षित, दयालु मातृ देखभाल प्रदान करने के लिए तैयार करता है।"
            : "Our evidence-based curriculum combines traditional wisdom with modern medical practices, preparing you to provide safe, compassionate maternal care in your community."}
        </p>
      </div>

      {/* Program Highlights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programHighlights.map((highlight, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{highlight.title}</h3>
              <p className="text-sm text-muted-foreground">{highlight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Curriculum */}
      <Card>
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
            {t("training.curriculumTitle")}
          </CardTitle>
          <CardDescription>{t("training.curriculumDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {curriculum.map((module, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{module.module}</h4>
                    <p className="text-sm text-muted-foreground">{module.duration}</p>
                  </div>
                  <Badge variant={module.progress === 100 ? "default" : "secondary"}>{module.progress}% Complete</Badge>
                </div>
                <Progress value={module.progress} className="mb-3" />
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center font-[family-name:var(--font-space-grotesk)]">
          {t("training.outcomesTitle")}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">{outcome.title}</h4>
                <p className="text-sm text-muted-foreground">{outcome.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
            {t("training.successStoriesTitle")}
          </CardTitle>
          <CardDescription>{t("training.successStoriesDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.deliveries} {t("training.deliveries")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.experience} {t("training.experience")}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm italic text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requirements & Next Steps */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
              {t("training.requirementsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              language === "hi" ? "उम्र: 21-45 वर्ष" : "Age: 21-45 years",
              language === "hi" ? "शिक्षा: न्यूनतम 8वीं कक्षा" : "Education: Minimum 8th standard",
              language === "hi" ? "भाषा: स्थानीय भाषा में अच्छा व्यावहारिक" : "Language: Fluent in local language",
              language === "hi"
                ? "समय निश्चितता: 6 महीने के लिए पूर्ण समय की उपलब्धता"
                : "Commitment: Full-time availability for 6 months",
              language === "hi" ? "स्वास्थ्य: अच्छा शारीरिक और मानसिक स्वास्थ्य" : "Health: Good physical and mental health",
              language === "hi"
                ? "समुदाय: स्थानीय समुदाय को सेवा करने की विश्वास"
                : "Community: Willingness to serve local community",
            ].map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm">{requirement}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
              {t("training.applicationProcessTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                step: 1,
                title: language === "hi" ? "आवेदन जमाएं" : "Submit Application",
                description: language === "hi" ? "ऑनलाइन आवेदन फॉर्म पूरा करें" : "Complete online application form",
              },
              {
                step: 2,
                title: language === "hi" ? "साक्षात्कार" : "Interview",
                description:
                  language === "hi"
                    ? "ट्रेनिंग टीम के साथ फोन/वीडियो साक्षात्कार"
                    : "Phone/video interview with training team",
              },
              {
                step: 3,
                title: language === "hi" ? "स्वास्थ्य जांच" : "Medical Check",
                description: language === "hi" ? "आधुनिक स्वास्थ्य जांच" : "Basic health screening",
              },
              {
                step: 4,
                title: language === "hi" ? "समुदाय की स्वीकार" : "Community Endorsement",
                description:
                  language === "hi" ? "समुदाय नेतृत्व की सहमति का पत्र" : "Letter of support from community leaders",
              },
              {
                step: 5,
                title: language === "hi" ? "प्रशिक्षण शुरू होता है" : "Training Begins",
                description:
                  language === "hi" ? "अपने नियुक्त प्रशिक्षण पंचायत में शामिल हों" : "Join your assigned training batch",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <BookOpen className="mr-2 h-5 w-5" />
          {t("training.applyButtonText")}
        </Button>
      </div>
    </div>
  )
}
