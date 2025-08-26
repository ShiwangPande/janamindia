"use client"

import Image from "next/image"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function SiteHeader() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navLinks = [
    { href: "/home", label: t("nav.home") },
    { href: "/impact", label: t("nav.impact") },
    { href: "/training", label: t("nav.training") },
    { href: "/about", label: t("nav.about") },
    { href: "/get-involved", label: t("nav.getInvolved") },
    { href: "/contact", label: t("nav.contact") },
  ]
  return (
    <header className="border-b bg-white/80  backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/logo.jpg" alt="Janam logo" width={56} height={56} className="rounded-md shadow-sm" />
          <span className="font-logo text-4xl md:text-6xl leading-none text-primary drop-shadow-sm tracking-tight">Janam</span>
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
          {/* Show CTAs and language only on md+ to prevent overflow */}
          <div className="hidden md:flex items-center space-x-2">
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
          </div>
          {/* Hamburger for mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden ml-2 p-2 rounded-full hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-primary" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:w-80 bg-white p-0 flex flex-col">
              <div className="px-6 pt-6">
                <SheetHeader className="flex flex-row items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <Image src="/logo.jpg" alt="Janam logo" width={56} height={56} className="rounded" />
                    <span className="font-logo text-4xl md:text-6xl leading-none text-primary tracking-tight">Janam</span>
                  </SheetTitle>
                  <SheetClose asChild>
                    <button aria-label="Close menu" className="p-2 rounded hover:bg-muted">
                      <X className="h-5 w-5" />
                    </button>
                  </SheetClose>
                </SheetHeader>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <nav className="mt-4 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className={`px-4 py-3 rounded-[12px] text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 transition-colors
                          ${
                            pathname === link.href
                              ? "bg-primary text-white shadow"
                              : "text-primary hover:bg-primary/10"
                          }
                        `}
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <SheetClose asChild>
                    <a
                      href="/get-involved#partnership"
                      className="px-4 py-3 rounded-[12px] border border-primary text-primary text-center font-semibold hover:bg-primary/10"
                    >
                      {t("getInvolved.partnership.title") || "Partner with Us"}
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="/get-involved#donate"
                      className="px-4 py-3 rounded-[12px] bg-destructive text-white font-semibold text-center shadow hover:brightness-[0.94]"
                    >
                      {t("getInvolved.donate.donateButton") || "Donate"}
                    </a>
                  </SheetClose>
                </div>
                <div className="mt-4">
                  <LanguageToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Mobile Nav handled by Sheet */}
    </header>
  )
}


