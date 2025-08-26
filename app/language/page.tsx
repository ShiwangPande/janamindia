"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function LanguageLanding() {
  const router = useRouter()
  const { setLanguage } = useLanguage()

  const choose = (lang: "en" | "hi") => {
    setLanguage(lang)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="p-8 space-y-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Select your language
          </h1>
          <p className="text-muted-foreground">अपनी भाषा चुनें</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Button size="lg" className="h-16 text-lg" onClick={() => choose("en")}>
              English
            </Button>
            <Button size="lg" variant="outline" className="h-16 text-lg" onClick={() => choose("hi")}>
              हिन्दी
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


