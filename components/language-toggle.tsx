"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center space-x-2">
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "हिंदी" : "English"}</span>
    </Button>
  )
}
