"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navLinks = [
    { href: "/home", label: t("nav.home") },
    { href: "/impact", label: t("nav.impact") },
    { href: "/training", label: t("nav.training") },
    { href: "/get-involved", label: t("nav.getInvolved") },
  ]
  return (
    <header className="border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image src="/logo.jpg" alt="Janam logo" width={36} height={36} className="rounded-md shadow-sm" />
          <span className="text-2xl font-bold text-primary font-[family-name:var(--font-merriweather)] drop-shadow-sm tracking-tight">Janam</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-150 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2
                ${pathname === link.href ? "bg-primary text-white shadow-md" : "text-primary hover:bg-primary/10 hover:text-primary"}
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* CTA & Language */}
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary font-semibold transition-all"
            asChild
          >
            <a href="/get-involved#partnership">{t("getInvolved.partnership.title") || "Partner with Us"}</a>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-destructive hover:bg-destructive/90 text-white font-semibold shadow-md transition-all"
            asChild
          >
            <a href="/get-involved#donate">{t("getInvolved.donate.donateButton") || "Donate"}</a>
          </Button>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden ml-2 p-2 rounded-full hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-primary">Janam</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-primary/10">
                <Menu className="h-6 w-6 text-primary" />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-150 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2
                  ${pathname === link.href ? "bg-primary text-white shadow-md" : "text-primary hover:bg-primary/10 hover:text-primary"}
                `}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/get-involved#partnership"
              className="px-4 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {t("getInvolved.partnership.title") || "Partner with Us"}
            </a>
            <a
              href="/get-involved#donate"
              className="px-4 py-2 rounded-full bg-destructive text-white font-semibold shadow-md hover:bg-destructive/90 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {t("getInvolved.donate.donateButton") || "Donate"}
            </a>
            <div className="mt-4">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


