"use client"
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
import React from "react"

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
  return (
    <div className="min-h-screen bg-background text-gray-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/30 py-24">
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
      <section className="py-16">
        <div className="container mx-auto max-w-7xl space-y-20">

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
<div className="grid md:grid-cols-3 gap-8 py-16 border-b">
  <div className="md:col-span-1">
    <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
      {t("trainingPage.curriculum.title")}
    </h2>
    <p className="text-base text-gray-600">
      {t("trainingPage.curriculum.subtitle")}
    </p>
  </div>
  <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
    {(t("trainingPage.curriculum.modules") as unknown as string[]).map((item: string, i: number) => (
      <div
        key={i}
        className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-3"
      >
        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
        <span className="text-base text-gray-700">{item}</span>
      </div>
    ))}
  </div>
</div>

{/* Delivery Model */}
<div className="grid md:grid-cols-3 gap-8 py-16 border-b">
  <div className="md:col-span-1">
    <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
      {t("trainingPage.delivery.title")}
    </h2>
    <p className="text-base text-gray-600">
      {t("trainingPage.delivery.subtitle")}
    </p>
  </div>
  <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
    {(t("trainingPage.delivery.methods") as unknown as string[]).map((item: string, i: number) => (
      <div
        key={i}
        className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-3"
      >
        <Layout className="w-5 h-5 text-primary mt-1" />
        <span className="text-base text-gray-700">{item}</span>
      </div>
    ))}
  </div>
</div>

{/* Video Library */}
<div id="videos" className="py-16 border-b">
  <h2 className="text-3xl font-bold text-primary mb-6 text-center font-[family-name:var(--font-merriweather)]">
    Video Library
  </h2>
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {["Basics of Safe Delivery", "Kangaroo Care", "Emergency Signs"].map(
      (title, i) => (
        <Card
          key={i}
          className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-500">
            Video placeholder
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Play className="w-5 h-5 text-primary" />
              {title}
            </CardTitle>
          </CardHeader>
        </Card>
      )
    )}
  </div>
</div>

{/* Outcomes & Follow-ups */}
<div className="grid md:grid-cols-3 gap-8 py-16 border-b">
  <div className="md:col-span-1">
    <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
      {t("trainingPage.support.title")}
    </h2>
    <p className="text-base text-gray-600">
      {t("trainingPage.support.subtitle")}
    </p>
  </div>
  <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
    {(t("trainingPage.support.support") as unknown as string[]).map((item: string, i: number) => (
      <div
        key={i}
        className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-3"
      >
        <ClipboardList className="w-5 h-5 text-primary mt-1" />
        <span className="text-base text-gray-700">{item}</span>
      </div>
    ))}
  </div>
</div>

{/* FAQ */}
<div className="grid md:grid-cols-3 gap-8 py-16 border-b">
  <div className="md:col-span-1">
    <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
    {t("trainingPage.faq.title")} 
    </h2>
    <p className="text-base text-gray-600"> {t("trainingPage.faq.subtitle")} </p>
  </div>
  <div className="md:col-span-2 grid gap-5">
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t("trainingPage.faq.cardtitle1")} </CardTitle>
      </CardHeader>
      <CardContent className="text-base text-gray-600">
      {t("trainingPage.faq.content1")}  
      </CardContent>
    </Card>
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
        {t("trainingPage.faq.cardtitle2")}  
        </CardTitle>
      </CardHeader>
      <CardContent className="text-base text-gray-600">
      {t("trainingPage.faq.content2")}   
      </CardContent>
    </Card>
  </div>
</div>

{/* Resources */}
<div id="resources" className="grid md:grid-cols-3 gap-8 py-16 border-b">
  <div className="md:col-span-1">
    <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
    {t("trainingPage.resources.title")}   
    </h2>
    <p className="text-base text-gray-600">
    {t("trainingPage.resources.subtitle")}
    </p>
  </div>
  <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
    <button
      className="p-5 rounded-2xl border bg-white hover:bg-gray-50 shadow-sm transition"
      onClick={() => setOpen(true)}
    >
      {t("trainingPage.resources.guide")}
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle> {t("trainingPage.resources.guide")}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      src="/janam.pdf"
                      className="w-full h-full rounded-lg border"
                      title="Pregnancy Booklet"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button asChild>
                      <a href="/janam.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
    <div className="p-5 rounded-2xl border bg-white opacity-70 shadow-sm">
    {t("trainingPage.resources.illustrated")}
    </div>
    <div className="p-5 rounded-2xl border bg-white opacity-70 shadow-sm">
    {t("trainingPage.resources.facilitator")}
    </div>
    <div className="p-5 rounded-2xl border bg-white opacity-70 shadow-sm">
    {t("trainingPage.resources.quizzes")}
    </div>
    <div className="p-5 rounded-2xl border bg-white opacity-70 shadow-sm">
    {t("trainingPage.resources.supervisor")}
    </div>
  </div>
</div>

{/* Sign up form */}
<div id="signup" className="grid md:grid-cols-3 gap-8 py-16">
  <div className="md:col-span-1">
    <h2 className="text-3xl font-bold text-primary mb-3 font-[family-name:var(--font-merriweather)]">
       {t("trainingPage.signup.title")}
    </h2>
    <p className="text-base text-gray-600">
    {t("trainingPage.signup.subtitle")} 
    </p>
  </div>
  <div className="md:col-span-2">
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-8">
        <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required placeholder={t("trainingPage.signup.name")} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("trainingPage.signup.email")}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              required
              placeholder={t("trainingPage.signup.phone")}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("trainingPage.signup.message")}
              rows={4}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full">
{t("trainingPage.signup.submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</div>

</div>
      </section>
      {/* End */}
    </div>
  )
}
