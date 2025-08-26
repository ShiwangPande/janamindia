"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Clock, Heart, Laptop, Stethoscope, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function VolunteerSignup() {
  const { t, language } = useLanguage()
  const volunteer = t("volunteer") as any
  // Defensive: If volunteer or its fields are missing, show nothing
  if (!volunteer || typeof volunteer !== "object" || !volunteer.paths || !volunteer.form || !volunteer.volunteers) {
    return null
  }
  const volunteerPaths = volunteer.paths
  const form = volunteer.form
  const volunteers = volunteer.volunteers

  const [selectedPath, setSelectedPath] = useState<string>("")

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">{volunteer.sectionTitle}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {volunteer.sectionDesc}
        </p>
      </div>

      {/* Volunteer Paths */}
      <div className="grid md:grid-cols-3 gap-6">
        {volunteerPaths.map((path: any) => (
          <Card
            key={path.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPath === path.id ? path.color : "hover:border-primary/30"
            }`}
            onClick={() => setSelectedPath(path.id)}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {path.id === "community" && <Users className="h-8 w-8 text-primary" />}
                {path.id === "digital" && <Laptop className="h-8 w-8 text-primary" />}
                {path.id === "clinical" && <Stethoscope className="h-8 w-8 text-primary" />}
              </div>
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{path.commitment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{path.location}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">{form.skillsNeeded}</div>
                <div className="flex flex-wrap gap-1">
                  {path.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Signup Form */}
      {selectedPath && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{form.applicationTitle}</CardTitle>
            <CardDescription>{form.applicationDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{form.firstName}</Label>
                <Input id="firstName" placeholder={form.firstNamePlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{form.lastName}</Label>
                <Input id="lastName" placeholder={form.lastNamePlaceholder} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{form.email}</Label>
                <Input id="email" type="email" placeholder={form.emailPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{form.phone}</Label>
                <Input id="phone" placeholder={form.phonePlaceholder} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{form.city}</Label>
                <Input id="city" placeholder={form.cityPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{form.state}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={form.statePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {form.states.map((state: any) => (
                      <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">{form.experience}</Label>
              <Textarea
                id="experience"
                placeholder={form.experiencePlaceholder}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">{form.motivation}</Label>
              <Textarea
                id="motivation"
                placeholder={form.motivationPlaceholder}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">{form.availability}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={form.availabilityPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {form.availabilities.map((a: any) => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  {form.terms}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="updates" />
                <Label htmlFor="updates" className="text-sm">
                  {form.updates}
                </Label>
              </div>
            </div>

            <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
              {form.submit}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Volunteers */}
      <Card>
        <CardHeader>
          <CardTitle>{volunteer.meetTitle}</CardTitle>
          <CardDescription>{volunteer.meetDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {volunteers.map((vol: any, index: number) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{vol.name}</div>
                  <div className="text-sm text-primary">{vol.role}</div>
                  <div className="text-xs text-muted-foreground">{vol.location}</div>
                </div>
                <p className="text-sm italic text-muted-foreground">"{vol.quote}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
