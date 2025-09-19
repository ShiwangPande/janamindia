"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Info,
  Maximize2,
  MapPin,
  Users,
  Stethoscope,
  Zap,
  Wifi,
  Heart,
} from "lucide-react"

export function ContainerWalkthrough() {
  const [currentView, setCurrentView] = useState(0)
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const { language } = useLanguage()

  const containerViews = [
    {
      id: 0,
      title: language === "hi" ? "बाहरी दृश्य" : "Exterior View",
      image: "/mobile-medical-container-clinic-in-rural-indian-vi.png",
      description: language === "hi" ? "ग्रामीण पहुँच के लिए डिज़ाइन की गई सौर ऊर्जा संचालित मोबाइल क्लिनिक" : "Solar-powered mobile clinic designed for rural accessibility",
      hotspots: [
        { x: 20, y: 30, title: language === "hi" ? "सौर पैनल" : "Solar Panels", description: language === "hi" ? "100% नवीकरणीय ऊर्जा प्रणाली जो 24/7 बिजली प्रदान करती है" : "100% renewable energy system providing 24/7 power" },
        { x: 70, y: 60, title: language === "hi" ? "रैंप" : "Accessibility Ramp", description: language === "hi" ? "व्हीलचेयर और स्ट्रेचर के लिए सुलभ प्रवेश" : "Wheelchair and stretcher accessible entrance" },
        { x: 50, y: 80, title: language === "hi" ? "भंडारण" : "Storage Compartment", description: language === "hi" ? "चिकित्सा आपूर्ति और आपातकालीन उपकरण भंडारण" : "Medical supplies and emergency equipment storage" },
      ],
    },
    {
      id: 1,
      title: language === "hi" ? "डिलीवरी कक्ष" : "Delivery Room",
      image: "/indian-midwife-helping-pregnant-mother-in-rural-se.png",
      description: language === "hi" ? "आधुनिक चिकित्सा उपकरणों के साथ पूर्णतः सुसज्जित डिलीवरी कक्ष" : "Fully equipped delivery suite with modern medical equipment",
      hotspots: [
        { x: 30, y: 40, title: language === "hi" ? "डिलीवरी बेड" : "Delivery Bed", description: language === "hi" ? "सुरक्षा सुविधाओं के साथ समायोज्य डिलीवरी बेड" : "Adjustable delivery bed with safety features" },
        {
          x: 70,
          y: 30,
          title: language === "hi" ? "चिकित्सा उपकरण" : "Medical Equipment",
          description: language === "hi" ? "भ्रूण मॉनिटर, ऑक्सीजन और आपातकालीन पुनर्जीवन किट" : "Fetal monitor, oxygen, and emergency resuscitation kit",
        },
        { x: 50, y: 70, title: language === "hi" ? "स्टरलाइज़ेशन यूनिट" : "Sterilization Unit", description: language === "hi" ? "ऑटोक्लेव और स्टरल उपकरण भंडारण" : "Autoclave and sterile instrument storage" },
      ],
    },
    {
      id: 2,
      title: language === "hi" ? "परामर्श क्षेत्र" : "Consultation Area",
      image: "/indian-woman-holding-newborn-baby--smiling--rural-.png",
      description: language === "hi" ? "निजी परामर्श और परीक्षण क्षेत्र" : "Private consultation and examination space",
      hotspots: [
        { x: 25, y: 50, title: language === "hi" ? "जांच टेबल" : "Examination Table", description: language === "hi" ? "प्राइवेसी स्क्रीन के साथ आरामदायक जांच क्षेत्र" : "Comfortable examination area with privacy screens" },
        { x: 75, y: 35, title: language === "hi" ? "अल्ट्रासाउंड मशीन" : "Ultrasound Machine", description: language === "hi" ? "प्रसवपूर्व मॉनिटरिंग हेतु पोर्टेबल अल्ट्रासाउंड" : "Portable ultrasound for prenatal monitoring" },
        { x: 60, y: 75, title: language === "hi" ? "चिकित्सा रेकॉर्ड" : "Medical Records", description: language === "hi" ? "डिजिटल स्वास्थ्य रेकॉर्ड और टेलीमेडिसिन सेटअप" : "Digital health records and telemedicine setup" },
      ],
    },
    {
      id: 3,
      title: language === "hi" ? "रिकवरी और शिक्षा" : "Recovery & Education",
      image: "/group-of-indian-women-in-white-coats-receiving-cer.png",
      description: language === "hi" ? "प्रसव के बाद रिकवरी और स्वास्थ्य शिक्षा का स्थान" : "Post-delivery recovery and health education space",
      hotspots: [
        { x: 40, y: 40, title: language === "hi" ? "रिकवरी बेड" : "Recovery Beds", description: language === "hi" ? "माताओं और नवजातों के लिए आरामदायक रिकवरी क्षेत्र" : "Comfortable recovery area for mothers and newborns" },
        { x: 20, y: 70, title: language === "hi" ? "शिक्षा कोना" : "Education Corner", description: language === "hi" ? "स्वास्थ्य शिक्षा सामग्री और डेमो क्षेत्र" : "Health education materials and demonstration area" },
        { x: 80, y: 60, title: language === "hi" ? "परिवार क्षेत्र" : "Family Area", description: language === "hi" ? "परिवार के सदस्यों और सहायक व्यक्तियों के लिए स्थान" : "Space for family members and support persons" },
      ],
    },
  ]

  const specifications = [
    { icon: MapPin, label: language === "hi" ? "गतिशीलता" : "Mobility", value: language === "hi" ? "ऑल-टेरेन वाहन बेस" : "All-terrain vehicle base" },
    { icon: Zap, label: language === "hi" ? "पावर" : "Power", value: language === "hi" ? "सौर + बैटरी बैकअप" : "Solar + battery backup" },
    { icon: Wifi, label: language === "hi" ? "कनेक्टिविटी" : "Connectivity", value: language === "hi" ? "सैटेलाइट इंटरनेट और 4G" : "Satellite internet & 4G" },
    { icon: Users, label: language === "hi" ? "क्षमता" : "Capacity", value: language === "hi" ? "एक साथ 2-3 मरीज" : "2-3 simultaneous patients" },
    { icon: Stethoscope, label: language === "hi" ? "उपकरण" : "Equipment", value: language === "hi" ? "पूर्ण डिलीवरी और आपातकालीन किट" : "Full delivery & emergency kit" },
    { icon: Heart, label: language === "hi" ? "प्रभाव" : "Impact", value: language === "hi" ? "प्रति वर्ष 500+ प्रसव" : "500+ deliveries per year" },
  ]

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % containerViews.length)
    setSelectedHotspot(null)
  }

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + containerViews.length) % containerViews.length)
    setSelectedHotspot(null)
  }

  const currentContainer = containerViews[currentView]

  return (
  <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)] tracking-tight">
          {language === "hi" ? "कंटेनर क्लिनिक वॉकथ्रू" : "Container Clinic Walkthrough"}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "hi"
            ? "हमारे नवाचार मोबाइल स्वास्थ्य समाधान का अन्वेषण करें जो पेशेवर चिकित्सा देखभाल सीधे दूरस्थ गांवों तक पहुँचाता है।"
            : "Explore our innovative mobile healthcare solution bringing professional medical care directly to remote villages across India."}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main Viewer */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow-sm border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-[family-name:var(--font-merriweather)] text-xl md:text-2xl">
                    {currentContainer.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">{currentContainer.description}</CardDescription>
                </div>
                <Badge variant="secondary">
                  {currentView + 1} {language === "hi" ? "में से" : "of"} {containerViews.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-[4/3] sm:aspect-video bg-muted rounded-2xl overflow-hidden relative">
                  <img
                    src={currentContainer.image || "/placeholder.svg"}
                    alt={currentContainer.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Hotspots */}
                  {currentContainer.hotspots.map((hotspot, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={hotspot.title}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${
                        selectedHotspot === index ? "scale-110" : "hover:scale-105"
                      } focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full`}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                      }}
                      onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                    >
                      <div className={`w-7 h-7 rounded-full ${selectedHotspot === index ? "bg-primary" : "bg-primary/80"} shadow-lg flex items-center justify-center relative`}>
                        <Info className="h-3.5 w-3.5 text-white" />
                        <span className="absolute -inset-1.5 rounded-full bg-primary/20 animate-pulse" />
                      </div>
                    </button>
                  ))}

                  {/* Navigation Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/70 backdrop-blur px-2 py-1 rounded-full shadow-sm">
                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={prevView} aria-label="Previous view">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex space-x-1 px-1">
                      {containerViews.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full ${index === currentView ? "bg-primary" : "bg-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={nextView} aria-label="Next view">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Fullscreen Button */}
                  <Button variant="secondary" size="icon" className="absolute top-4 right-4 h-8 w-8" aria-label="Fullscreen">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Hotspot Details */}
                {selectedHotspot !== null && (
                  <Card className="mt-4 border-primary/20 bg-primary/5 rounded-xl">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-1 text-foreground">{currentContainer.hotspots[selectedHotspot].title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentContainer.hotspots[selectedHotspot].description}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* View Navigation */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{language === "hi" ? "कंटेनर क्षेत्र" : "Container Areas"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {containerViews.map((view, index) => (
                <Button
                  key={index}
                  variant={currentView === index ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentView(index)
                    setSelectedHotspot(null)
                  }}
                >
                  {view.title}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{language === "hi" ? "विनिर्देश" : "Specifications"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <spec.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{spec.label}</div>
                    <div className="text-xs text-muted-foreground">{spec.value}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{language === "hi" ? "और जानें" : "Learn More"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={() => window.location.href = "/contact"}
              >
                {language === "hi" ? "गाइडेड टूर का अनुरोध करें" : "Request Guided Tour"}
              </Button>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = "/get-involved#donate"}
              >
                {language === "hi" ? "एक कंटेनर को फंड करें" : "Fund a Container"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Impact Stats */}
      {/* Impact Stats */}
<Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 rounded-2xl">
  <CardContent className="pt-6">
    <div className="text-center mb-6">
      <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
        {language === "hi" ? "कंटेनर क्लिनिक प्रभाव" : "Container Clinic Impact"}
      </h3>
      <p className="text-muted-foreground">
        {language === "hi"
          ? "हमारी मोबाइल स्वास्थ्य इकाइयों से वास्तविक परिणाम"
          : "Real results from our mobile healthcare units"}
      </p>
    </div>
    <div className="grid md:grid-cols-5 gap-6 text-center">
      <div>
        <div className="text-2xl font-bold text-primary mb-1">3</div>
        <p className="text-sm text-muted-foreground">
          {language === "hi" ? "सक्रिय कंटेनर" : "Active Containers"}
        </p>
      </div>
      <div>
        <div className="text-2xl font-bold text-primary mb-1">4</div>
        <p className="text-sm text-muted-foreground">
          {language === "hi" ? "सुरक्षित प्रसव" : "Safe Deliveries"}
        </p>
      </div>
      <div>
        <div className="text-2xl font-bold text-primary mb-1">50+</div>
        <p className="text-sm text-muted-foreground">
          {language === "hi" ? "जाँच के लिए आई महिलाएँ" : "Women that came for check ups"}
        </p>
      </div>
      <div>
        <div className="text-2xl font-bold text-primary mb-1">10+</div>
        <p className="text-sm text-muted-foreground">
          {language === "hi" ? "सेवा प्राप्त गाँव" : "Villages Served"}
        </p>
      </div>
      <div>
        <div className="text-2xl font-bold text-primary mb-1">98%</div>
        <p className="text-sm text-muted-foreground">
          {language === "hi" ? "सफलता दर" : "Success Rate"}
        </p>
      </div>
    </div>
  </CardContent>
</Card>

    </div>
  )
}
