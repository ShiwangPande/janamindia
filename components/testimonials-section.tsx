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
      name: "Kumari Yadav - Mother (Mahapura, Rajasthan)",
      role: "Mother",
      location: "Mahapura, Rajasthan",
      date: "2025-03-12",
      category: "delivery",
      image: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1756230943/img3_evdmvu.jpg",
      quote: "Very innovative solution. The health check-up felt organized and easy, something new for our village.",
      fullStory: "",
      impact: "",
      rating: 5,
    },
    {
      id: 2,
      name: "Pooja Sharma - Mother (Jaipur, Rajasthan)",
      role: "Mother",
      location: "Jaipur, Rajasthan",
      date: "2025-05-28",
      category: "training",
      image: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1756230943/poojasharma_zwx1qk.jpg",
      quote: "The workshop was so engaging. Eva explained everything clearly, and it was refreshing to see young students take the lead.",
      fullStory: "",
      impact: "",
      rating: 4,
    },
    {
      id: 3,
      name: "Ravi Patel - Village Head (Krishnagiri, Tamil Nadu)",
      role: "Village Head",
      location: "Krishnagiri, Tamil Nadu",
      date: "2025-01-19",
      category: "community",
      image: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1756230943/imag1_aqvjwu.jpg",
      quote: "Initiatives like this are rare. The check-ups were managed thoughtfully, and people felt included.",
      fullStory: "",
      impact: "",
      rating: 4,
    },
    {
      id: 4,
      name: "Rekha Narsimhan - Mother (Mahapura, Rajasthan)",
      role: "Mother",
      location: "Mahapura, Rajasthan",
      date: "2025-07-03",
      category: "delivery",
      image: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1756230944/img5_xmlcqb.jpg",
      quote: "I found the check-up very helpful. It’s inspiring to see students working on issues that usually don’t get attention.",
      fullStory: "",
      impact: "",
      rating: 5,
    },
    {
      id: 5,
      name: "Kamala Devi - Midwife in Training (Jaipur, Rajasthan)",
      role: "Midwife in Training",
      location: "Jaipur, Rajasthan",
      date: "2025-06-15",
      category: "midwife",
      image: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1756230943/img6_mcyxkm.jpg",
      quote: "The approach was simple but effective. The check-up gave us clarity and support in a way we hadn’t seen before.",
      fullStory: "",
      impact: "",
      rating: 4,
    },
    {
      id: 6,
      name: "Minal Jain (School Counselor, Jaipur, Rajasthan)",
      role: "School Counselor",
      location: "Jaipur, Rajasthan",
      date: "2025-02-22",
      category: "community",
      image: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1756230943/img4_zctoeu.jpg",
      quote: "Exceptional thinking, very innovative approach, and so well executed. It’s inspiring to see my students put so much effort into an overlooked cause.",
      fullStory: "",
      impact: "",
      rating: 4,
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
