import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { ClerkProvider } from "@clerk/nextjs"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Janam - Safe births. Stronger families.",
  description: "Community-driven midwifery training, container clinics and kangaroo care support across rural India.",
  generator: "v0.app",
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
          <body
            className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}
          >
            <LanguageProvider>{children}</LanguageProvider>
          </body>
        </html>
      </ClerkProvider>
    ) : (
      <html lang="en">
        <body
          className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    )
  )
}
