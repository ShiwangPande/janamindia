"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language | null>(null)

  useEffect(() => {
    let lang: Language | null = null
    if (typeof window !== "undefined") {
      lang = (window.localStorage.getItem("language") as Language) || null
      if (!lang) {
        const match = document.cookie.match(/language=(hi|en)/)
        lang = (match && match[1]) as Language
      }
    }
    setLanguage(lang || "hi")
  }, [])

  const t = (key: string): string => {
    if (!language) return key
    const keys = key.split(".")
    let value: any = translations[language]
    for (const k of keys) value = value?.[k]
    return value || key
  }

  const setLanguagePersist = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", lang)
      document.cookie = `language=${lang}; path=/; max-age=31536000`
    }
  }

  if (!language) return null

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguagePersist, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
