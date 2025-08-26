import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

async function checkAuth() {
  // If Clerk isn't configured, allow access to avoid client-side crash during local dev
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    return true
  }
  const { userId } = auth()
  if (!userId) return false
  const ids = process.env.ADMIN_USER_IDS?.split(",").map((s) => s.trim()).filter(Boolean)
  if (ids && ids.length > 0) {
    return ids.includes(userId)
  }
  // Fallback: if no ADMIN_USER_IDS provided, allow any authenticated user
  return true
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
