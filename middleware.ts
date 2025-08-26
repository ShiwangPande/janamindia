import { clerkMiddleware } from "@clerk/nextjs/server"

const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY

export default isClerkConfigured ? clerkMiddleware() : function () {}

export const config = {
  matcher: [
    
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    "/(api|trpc)(.*)",
  ],
}

