import type React from "react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
            <div className="text-sm text-muted-foreground">
              Content & Language Management
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
