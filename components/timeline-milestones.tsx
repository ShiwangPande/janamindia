"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Award, Users, MapPin, Heart, Stethoscope, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function TimelineMilestones() {
  const { t, language } = useLanguage()
  // Get milestones and goals from translations
  const timeline = t("timeline") as any
  const milestones = timeline.milestones
  const upcomingGoals = timeline.goals

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">{timeline.sectionTitle}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {timeline.sectionDesc}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-8">
          {milestones.map((milestone: any, index: number) => (
            <div key={index} className="relative flex items-start space-x-6">
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {/* Use icons as before, based on year or index */}
                {index === 0 && <Award className="h-8 w-8" />}
                {index === 1 && <Stethoscope className="h-8 w-8" />}
                {index === 2 && <Building2 className="h-8 w-8" />}
                {index === 3 && <Users className="h-8 w-8" />}
                {index === 4 && <Heart className="h-8 w-8" />}
                {index === 5 && <MapPin className="h-8 w-8" />}
                {index === 0 && (
                  <div className="absolute -inset-2 rounded-full bg-primary/20 animate-pulse"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <Card
                  className={`${
                    index === 0
                      ? "border-primary/50 bg-primary/5"
                      : "hover:shadow-md transition-shadow"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Badge variant={index === 0 ? "default" : "secondary"} className="mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">{milestone.highlight}</p>
                      </div>
                      {index !== 0 && <CheckCircle className="h-6 w-6 text-primary" />}
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      {milestone.achievements.map((achievement: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Goals */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">{timeline.futureTitle}</h3>
          <p className="text-muted-foreground">{timeline.futureDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {upcomingGoals.map((goal: any, index: number) => (
            <Card key={index} className="border-dashed border-2 border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Circle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      {goal.year}
                    </Badge>
                    <h4 className="font-bold font-[family-name:var(--font-space-grotesk)]">{goal.title}</h4>
                  </div>
                </div>

                <div className="space-y-2">
                  {goal.goals.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <Circle className="h-3 w-3 text-primary/60 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
