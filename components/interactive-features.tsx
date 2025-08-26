"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, MapPin, ArrowRight, Play, Pause } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function InteractiveFeatures() {
  const { t, language } = useLanguage()
  const [currentStory, setCurrentStory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const stories = [
    {
      id: 1,
      name: language === "hi" ? "सुनीता देवी" : "Sunita Devi",
      location: language === "hi" ? "राजस्थान" : "Rajasthan",
      story:
        language === "hi"
          ? "जनम की प्रशिक्षित दाई की मदद से मेरा बेटा सुरक्षित पैदा हुआ। अब मैं भी दूसरी माताओं की मदद करती हूं।"
          : "With help from Janam's trained midwife, my son was born safely. Now I help other mothers too.",
      image: "/indian-woman-holding-newborn-baby--smiling--rural-.png",
      impact: language === "hi" ? "अब 15+ माताओं की मदद की" : "Now helped 15+ mothers",
    },
    {
      id: 2,
      name: language === "hi" ? "प्रिया शर्मा" : "Priya Sharma",
      location: language === "hi" ? "उत्तर प्रदेश" : "Uttar Pradesh",
      story:
        language === "hi"
          ? "जनम के प्रशिक्षण से मैं एक कुशल दाई बनी। अब मैं अपने गांव में सुरक्षित प्रसव कराती हूं।"
          : "Through Janam's training, I became a skilled midwife. Now I ensure safe deliveries in my village.",
      image: "/indian-midwife-helping-pregnant-mother-in-rural-se.png",
      impact: language === "hi" ? "50+ सुरक्षित प्रसव कराए" : "Delivered 50+ babies safely",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStory((prev) => (prev + 1) % stories.length)
            return 0
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, stories.length])

  const handleStoryChange = (index: number) => {
    setCurrentStory(index)
    setProgress(0)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {language === "hi" ? "इंटरैक्टिव अनुभव" : "Interactive Experience"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            {language === "hi" ? "सफलता की कहानियां" : "Stories of Impact"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hi"
              ? "वास्तविक माताओं और दाइयों की प्रेरणादायक कहानियां सुनें"
              : "Listen to inspiring stories from real mothers and midwives"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Story Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {isPlaying
                        ? language === "hi"
                          ? "चल रहा है"
                          : "Playing"
                        : language === "hi"
                          ? "रुका हुआ"
                          : "Paused"}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {currentStory + 1} / {stories.length}
                  </Badge>
                </div>

                <Progress value={progress} className="mb-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {stories[currentStory].location}
                  </div>

                  <h3 className="text-2xl font-bold">{stories[currentStory].name}</h3>

                  <p className="text-muted-foreground leading-relaxed">{stories[currentStory].story}</p>

                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">{stories[currentStory].impact}</span>
                  </div>
                </div>

                {/* Story Navigation */}
                <div className="flex gap-2 mt-8">
                  {stories.map((_, index) => (
                    <Button
                      key={index}
                      variant={currentStory === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStoryChange(index)}
                      className="w-12 h-12 rounded-full p-0"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Story Image */}
              <div className="relative bg-muted">
                <img
                  src={stories[currentStory].image || "/placeholder.svg"}
                  alt={stories[currentStory].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </Card>

         

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-destructive hover:bg-destructive/90">
              {language === "hi" ? "अपनी कहानी साझा करें" : "Share Your Story"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
