"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Calendar, Play, Quote, Star, Filter } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function TestimonialsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const { language } = useLanguage()

  const testimonials = [
    {
      id: 1,
      name: "Sunita Devi",
      role: "Mother",
      location: "Jaipur, Rajasthan",
      date: "December 2024",
      category: "delivery",
      image: "/indian-woman-holding-newborn-baby--smiling--rural-.png",
      quote:
        "When my labor started at night, I was scared. But Kamala didi, our trained midwife, was there within minutes. She guided me through everything with such care and knowledge. My baby boy was born safely at home, and the kangaroo care she taught us helped him so much.",
      fullStory:
        "Sunita's delivery was her third child, but her first with professional midwifery support. The trained midwife Kamala had been working in her village for six months, building trust and relationships. When Sunita went into labor at 2 AM, Kamala arrived quickly with her delivery kit and provided continuous support throughout the 8-hour labor. The safe delivery techniques and immediate kangaroo care resulted in a healthy 3.2kg baby boy with excellent APGAR scores.",
      impact: "Safe home delivery",
      rating: 5,
      videoUrl: "#",
    },
    {
      id: 2,
      name: "Dr. Meera Sharma",
      role: "Clinical Trainer",
      location: "Mumbai, Maharashtra",
      date: "November 2024",
      category: "training",
      image: "/group-of-indian-women-in-white-coats-receiving-cer.png",
      quote:
        "Training these incredible women has been the most rewarding experience of my medical career. Watching them transform from nervous students to confident midwives who save lives daily - there's nothing more fulfilling than that.",
      fullStory:
        "Dr. Sharma has been with Janam for 2 years, training over 150 midwives across Maharashtra. Her innovative teaching methods combine traditional knowledge with modern medical practices. She developed the hands-on simulation training that has become a cornerstone of the program, resulting in 98% pass rates and excellent field performance by graduates.",
      impact: "150+ midwives trained",
      rating: 5,
      videoUrl: "#",
    },
    {
      id: 3,
      name: "Ravi Patel",
      role: "Village Head",
      location: "Ahmedabad, Gujarat",
      date: "October 2024",
      category: "community",
      image: "/mobile-medical-container-clinic-in-rural-indian-vi.png",
      quote:
        "The container clinic changed everything for our village. Before, women had to travel 50km to the nearest hospital. Now we have skilled care right here. Our maternal mortality has dropped to zero in the past year.",
      fullStory:
        "Ravi's village of 2,500 people had no healthcare facility until the Janam container clinic arrived. The mobile unit visits twice weekly, providing prenatal care, delivery support, and postnatal follow-up. The village has recorded 45 safe deliveries since the program started, with zero maternal or infant deaths - a dramatic improvement from previous years.",
      impact: "45 safe deliveries, 0 deaths",
      rating: 5,
      videoUrl: "#",
    },
    {
      id: 4,
      name: "Priya Kumari",
      role: "New Mother",
      location: "Patna, Bihar",
      date: "September 2024",
      category: "delivery",
      image: "/indian-midwife-helping-pregnant-mother-in-rural-se.png",
      quote:
        "I was so worried about my first pregnancy. The WhatsApp support group and regular check-ups from the mobile clinic gave me confidence. When my daughter was born, I knew exactly what to do because of all the education I received.",
      fullStory:
        "Priya, 22, was a first-time mother in a remote village with limited healthcare access. Through Janam's digital outreach program, she received regular pregnancy guidance via WhatsApp, attended mobile clinic sessions, and learned essential newborn care practices. Her delivery was attended by a trained community midwife, and both mother and baby remained healthy throughout the postnatal period.",
      impact: "Healthy first-time delivery",
      rating: 5,
      videoUrl: "#",
    },
    {
      id: 5,
      name: "Kamala Devi",
      role: "Community Midwife",
      location: "Udaipur, Rajasthan",
      date: "August 2024",
      category: "midwife",
      image: "/indian-midwife-helping-pregnant-mother-in-rural-se.png",
      quote:
        "Before the training, I helped with deliveries but always felt uncertain. Now I have the knowledge and confidence to handle complications. I've safely delivered 67 babies this year, and each one fills my heart with joy.",
      fullStory:
        "Kamala, 45, had been assisting with births in her community for years using traditional methods. After completing Janam's 6-month training program, she became a certified community midwife. Her skills in recognizing complications, managing emergencies, and providing quality care have made her the most trusted healthcare provider in her area, serving 8 surrounding villages.",
      impact: "67 safe deliveries",
      rating: 5,
      videoUrl: "#",
    },
    {
      id: 6,
      name: "Rajesh Kumar",
      role: "Father",
      location: "Bhopal, Madhya Pradesh",
      date: "July 2024",
      category: "family",
      image: "/indian-woman-holding-newborn-baby--smiling--rural-.png",
      quote:
        "The 'Fathers for Care' program opened my eyes. I learned how to support my wife during pregnancy and delivery. Being actively involved made our whole family stronger, and our son is healthy and happy.",
      fullStory:
        "Rajesh participated in Janam's innovative 'Fathers for Care' program, which educates men about their role in maternal health. Through workshops and peer support groups, he learned about pregnancy care, emotional support, and newborn care. His active involvement during his wife's pregnancy and delivery contributed to a positive birth experience and stronger family bonds.",
      impact: "Enhanced family support",
      rating: 5,
      videoUrl: "#",
    },
  ]

  const filteredTestimonials =
    selectedFilter === "all" ? testimonials : testimonials.filter((t) => t.category === selectedFilter)

  const categories = [
    { value: "all", label: language === "hi" ? "सभी कहानियां" : "All Stories" },
    { value: "delivery", label: language === "hi" ? "सुरक्षित प्रसव" : "Safe Deliveries" },
    { value: "training", label: language === "hi" ? "प्रशिक्षण" : "Training" },
    { value: "community", label: language === "hi" ? "सामुदायिक प्रभाव" : "Community Impact" },
    { value: "midwife", label: language === "hi" ? "दाई की कहानियां" : "Midwife Stories" },
    { value: "family", label: language === "hi" ? "परिवार सहयोग" : "Family Support" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
          {language === "hi" ? "आशा और परिवर्तन की कहानियां" : "Stories of Hope and Transformation"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "hi"
            ? "माताओं, दाइयों और समुदायों की वास्तविक आवाज़ें जिनके जीवन हमारे कार्यक्रमों से प्रभावित हुए हैं।"
            : "Real voices from mothers, midwives, and communities whose lives have been touched by our programs."}
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-center">
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="text-xs">
                  {categories.find((c) => c.value === testimonial.category)?.label}
                </Badge>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {testimonial.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {testimonial.date}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative">
                <Quote className="h-4 w-4 text-primary/30 absolute -top-1 -left-1" />
                <p className="text-sm italic text-muted-foreground pl-4 line-clamp-4">{testimonial.quote}</p>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  {testimonial.impact}
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => setSelectedStory(selectedStory === testimonial.id ? null : testimonial.id)}
                  >
                    {selectedStory === testimonial.id ? (language === "hi" ? "कम दिखाएं" : "Show Less") : (language === "hi" ? "और पढ़ें" : "Read More")}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {selectedStory === testimonial.id && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.fullStory}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Testimonials Section */}
      {/* <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Watch Their Stories</CardTitle>
          <CardDescription>Hear directly from the mothers, midwives, and families we serve</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Sunita's Safe Delivery", duration: "3:45", views: "2.1K" },
              { title: "Midwife Training Success", duration: "5:20", views: "1.8K" },
              { title: "Container Clinic Impact", duration: "4:15", views: "3.2K" },
            ].map((video, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-2">
                  <h4 className="font-medium text-sm">{video.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {video.duration} • {video.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
