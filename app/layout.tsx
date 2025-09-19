import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Merriweather, Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { ClerkProvider } from "@clerk/nextjs"
import { ScrollToTop } from "@/components/scroll-to-top"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-merriweather",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const logoFont = localFont({
  src: "../public/FeelfreePersonalUseRegular-lg2Bw.ttf",
  display: "swap",
  variable: "--font-logo",
})

export const metadata: Metadata = {
  title: "Janam - Safe births. Stronger families.",
  description: "Community-driven midwifery training, container clinics and kangaroo care support across rural India.",
  icons: {
    icon: "/logo.png",
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return (
    clerkPublishableKey ? (
      <ClerkProvider>
        <html lang="en">
          <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${merriweather.variable} ${inter.variable} ${logoFont.variable}`} style={{ scrollBehavior: "smooth" }}>
            <LanguageProvider>
              {children}
              <ScrollToTop />
            </LanguageProvider>
          </body>
        </html>
      </ClerkProvider>
    ) : (
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${merriweather.variable} ${inter.variable} ${logoFont.variable}`} style={{ scrollBehavior: "smooth" }}>
          <LanguageProvider>
            {children}
            <ScrollToTop />
          </LanguageProvider>
        </body>
      </html>
    )
  )
}
