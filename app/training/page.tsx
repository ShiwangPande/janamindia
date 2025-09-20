"use client"
import React, { useState } from 'react';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, Download, Play, CheckCircle2, GraduationCap, Video, ClipboardList, Layout } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"


export default function TrainingPage() {
  const { t } = useLanguage()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const phone = data.get('phone') as string
    const message = data.get('message') as string
    const subject = encodeURIComponent('Midwifery Training Sign Up')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`)
    window.location.href = `mailto:info@janam.org?subject=${subject}&body=${body}`
  }
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Mock t
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success' as any);
        // Clear the form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error' as any);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone;


  return (
    <div className="min-h-screen bg-background text-gray-900">
      <SiteHeader />

      {/* Hero */}
      <section className=" m-0 px-4 sm:px-0  relative bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/30 py-24">
        <div className="container mx-auto max-w-5xl text-center relative">
          <Badge variant="secondary" className="mb-3">{t("trainingPage.hero.badge")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-primary">
            {t("trainingPage.hero.title")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("trainingPage.hero.subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#videos"><Video className="mr-2 h-5 w-5" />{t("trainingPage.hero.videoLibrary")}</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#resources"><Download className="mr-2 h-5 w-5" />{t("trainingPage.hero.illustratedGuide")}</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#signup"><GraduationCap className="mr-2 h-5 w-5" />{t("trainingPage.hero.signUp")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className=" m-0 px-4 sm:px-0  py-16">
        <div className="container mx-auto max-w-7xl space-y-20">

          {/* Overview Cards */}
          <div className=" m-0 px-4 sm:px-0  grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="shadow-sm">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-xl">{t("trainingPage.features.programtitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-600">
                  {t("trainingPage.features.programtext")}

                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-xl">{t("trainingPage.features.paternshiptitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-600">
                  {t("trainingPage.features.paternshiptext")}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-xl">{t("trainingPage.features.deliverytitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-600">
                  {t("trainingPage.features.deliverytext")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Curriculum */}
          <div className=" m-0 px-4 sm:px-0  py-16 border-b">
            {/* Title & Subtitle */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-primary font-[family-name:var(--font-merriweather)] leading-snug">
                {t("trainingPage.curriculum.title")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mt-3">
                {t("trainingPage.curriculum.subtitle")}
              </p>
            </div>

            {/* Modules */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
              {(t("trainingPage.curriculum.modules") as unknown as string[]).map(
                (item: string, i: number) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span className="text-base text-gray-700">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>



          {/* Delivery Model */}
          <div className=" m-0 px-4 sm:px-0  py-16 border-b text-center">
            {/* Title & Subtitle */}
            <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
              {t("trainingPage.delivery.title")}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
              {t("trainingPage.delivery.subtitle")}
            </p>

            {/* Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto text-left">
              {(t("trainingPage.delivery.methods") as unknown as string[]).map(
                (item: string, i: number) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-3"
                  >
                    <Layout className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span className="text-base text-gray-700">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>




          <div id="videos" className=" m-0 px-4 sm:px-0  py-16 border-b">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center font-[family-name:var(--font-merriweather)]">
              Video Library
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { src: "https://www.youtube-nocookie.com/embed/d3KAGsU3RqA?rel=0&modestbranding=1&controls=1&showinfo=0" },
                { src: "https://www.youtube-nocookie.com/embed/F_dkUmR9-tU?rel=0&modestbranding=1&controls=1&showinfo=0" },
                { src: "https://www.youtube-nocookie.com/embed/mfUfVLlnCC8?rel=0&modestbranding=1&controls=1&showinfo=0" },
                { src: "https://www.youtube-nocookie.com/embed/j1-eG0nUBMI?rel=0&modestbranding=1&controls=1&showinfo=0" },
              ].map((video, i) => (
                <Card
                  key={i}
                  className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-500">
                    <iframe
                      src={video.src}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>



          {/* Outcomes & Follow-ups */}
          <div className=" m-0 px-4 sm:px-0  py-16 border-b text-center">
            {/* Title & Subtitle */}
            <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
              {t("trainingPage.support.title")}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
              {t("trainingPage.support.subtitle")}
            </p>

            {/* Support Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto text-left">
              {(t("trainingPage.support.support") as unknown as string[]).map(
                (item: string, i: number) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-3"
                  >
                    <ClipboardList className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span className="text-base text-gray-700">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>


          {/* FAQ */}
          {/* FAQ */}
          <div className="py-16 border-b text-center">
            {/* Title & Subtitle */}
            <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
              {t("trainingPage.faq.title")}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("trainingPage.faq.subtitle")}
            </p>

            {/* Accordion */}
            <div className="max-w-4xl mx-auto text-left">
              <Accordion type="single" collapsible className="w-full divide-y rounded-2xl border bg-white shadow-sm">
                {Array.from({ length: 15 }).map((_, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="px-4">
                    <AccordionTrigger className="flex items-center gap-3 py-4 text-left text-lg font-semibold hover:text-primary transition-colors">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      <span>{t(`trainingPage.faq.cardtitle${i + 1}`)}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-8 text-base text-gray-600 leading-relaxed">
                      {t(`trainingPage.faq.content${i + 1}`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>


          {/* Resources */}
          <div id="resources" className="py-16 border-b text-center">
            {/* Title & Subtitle */}
            <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
              {t("trainingPage.resources.title")}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
              {t("trainingPage.resources.subtitle")}
            </p>

            {/* PDF Card */}
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-3 md:p-7">
                  <div className="relative" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src="https://www.flipbookpdf.net/web/site/a91af593e66c4fca28ebbcd0edaa10d91b3dfa0b202509.pdf.html"
                      className="absolute top-0 left-0 w-full h-full rounded-lg border"
                      style={{ minHeight: 350, maxHeight: 700 }}
                      allowFullScreen
                      title="Quick View PDF"
                      frameBorder="0"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


          <div id="signup" className="py-16 text-center">
            {/* Title & Subtitle */}
            <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
              {t("trainingPage.signup.title")}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
              {t("trainingPage.signup.subtitle")}
            </p>

            {/* signup Card */}
            <div className="max-w-4xl mx-auto">
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800">Sorry, there was an error sending your message. Please try again.</p>
                    </div>
                  )}

                  {/* Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    <div>
                      <Label htmlFor="name" className="block mb-2 font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("trainingPage.signup.name")}
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="block mb-2 font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("trainingPage.signup.email")}
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="block mb-2 font-medium">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t("trainingPage.signup.phone")}
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="message" className="block mb-2 font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("trainingPage.signup.message")}
                        rows={4}
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Button
                        onClick={handleSubmit}
                        className="w-full mt-4"
                        disabled={isSubmitting || !isFormValid}
                      >
                        {isSubmitting ? 'Sending...' : t("trainingPage.signup.submit")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* partner form */}
          
          </div>
        </div>




      </section>
      {/* End */}
    </div>
  )
}
