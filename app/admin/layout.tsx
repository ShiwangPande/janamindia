import type React from "react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
 
      <main >{children}</main>
    </div>
  )
}
