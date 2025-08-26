"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CheckCircle, Upload, AlertCircle } from "lucide-react"

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const stepTitles = [
    "Personal Information",
    "Background & Experience",
    "Motivation & Commitment",
    "Documents & Confirmation",
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
          Midwifery Training Application
        </h2>
        <p className="text-lg text-muted-foreground">
          Join our next training batch and become a certified community midwife
        </p>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
            <div className="grid grid-cols-4 gap-2">
              {stepTitles.map((title, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                      index + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1 < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <p className="text-xs text-muted-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Steps */}
      <Card>
        <CardHeader>
          <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Please provide your basic personal information"}
            {currentStep === 2 && "Tell us about your background and any relevant experience"}
            {currentStep === 3 && "Share your motivation and commitment to midwifery"}
            {currentStep === 4 && "Upload required documents and confirm your application"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" type="number" placeholder="Your age" min="21" max="45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="House number, street, village/town, district, state, PIN code"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="odisha">Odisha</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages Spoken *</Label>
                  <Input id="languages" placeholder="हिंदी, अंग्रेजी, स्थानीय भाषा / Hindi, English, Local language" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Background & Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="education">Highest Education Level *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8th">8th Standard</SelectItem>
                    <SelectItem value="10th">10th Standard</SelectItem>
                    <SelectItem value="12th">12th Standard</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Current Occupation</Label>
                <Input id="occupation" placeholder="What do you currently do for work?" />
              </div>

              <div className="space-y-2">
                <Label>Previous Healthcare Experience</Label>
                <RadioGroup defaultValue="none">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">No previous healthcare experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditional" id="traditional" />
                    <Label htmlFor="traditional">Traditional birth attendant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthcare" id="healthcare" />
                    <Label htmlFor="healthcare">Healthcare worker (ASHA, ANM, etc.)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other healthcare experience</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Describe Your Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="If you have any healthcare or birth assistance experience, please describe it here..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="familySupport">Family Support *</Label>
                <RadioGroup>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full">My family fully supports my training and career as a midwife</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />
                    <Label htmlFor="partial">My family has some concerns but is generally supportive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="working" id="working" />
                    <Label htmlFor="working">I'm still working on getting family support</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability for Training *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time (6 months dedicated training)</SelectItem>
                    <SelectItem value="part-time">Part-time (extended program with flexible schedule)</SelectItem>
                    <SelectItem value="weekend">Weekend only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Motivation & Commitment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to become a midwife? *</Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your personal motivation and what drives you to pursue midwifery..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="community">How will you serve your community? *</Label>
                <Textarea
                  id="community"
                  placeholder="Describe how you plan to use your midwifery skills to help your community..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">What challenges do you expect and how will you overcome them? *</Label>
                <Textarea
                  id="challenges"
                  placeholder="Think about potential challenges in training and practice, and your strategies to overcome them..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commitment">Long-term Commitment *</Label>
                <RadioGroup>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5plus" id="5plus" />
                    <Label htmlFor="5plus">I commit to serving as a midwife for at least 5 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-5" id="3-5" />
                    <Label htmlFor="3-5">I commit to serving as a midwife for 3-5 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-3" id="2-3" />
                    <Label htmlFor="2-3">I commit to serving as a midwife for 2-3 years</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="references">References</Label>
                <Textarea
                  id="references"
                  placeholder="Please provide 2-3 references (name, relationship, phone number) who can vouch for your character and commitment..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Documents & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Required Documents</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Photo ID (Aadhaar/Voter ID/Passport)",
                    "Educational Certificates",
                    "Recent Passport Size Photo",
                    "Medical Fitness Certificate",
                    "Community Endorsement Letter",
                    "Income Certificate (if applicable)",
                  ].map((doc, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{doc}</span>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Confirmation & Agreement</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="accuracy" />
                    <Label htmlFor="accuracy" className="text-sm">
                      I confirm that all information provided is accurate and complete to the best of my knowledge.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="commitment" />
                    <Label htmlFor="commitment" className="text-sm">
                      I understand the commitment required for the 6-month training program and agree to complete it.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="service" />
                    <Label htmlFor="service" className="text-sm">
                      I commit to serving my community as a certified midwife for a minimum of 2 years after training.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions of the training program and certification requirements.
                    </Label>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Next Steps</p>
                      <p className="text-blue-700">
                        After submitting your application, our team will review it within 5-7 business days. If
                        selected, you'll be contacted for an interview. Training batches start every quarter.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-primary hover:bg-primary/90">
                Submit Application
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Tips */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Application Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Before You Apply:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Discuss with your family about the commitment</li>
                <li>• Gather all required documents</li>
                <li>• Think about your long-term goals</li>
                <li>• Connect with current midwives if possible</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Selection Criteria:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Commitment to community service</li>
                <li>• Communication skills and empathy</li>
                <li>• Family and community support</li>
                <li>• Physical and mental fitness</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
