import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token
    const isAuthPage = req.nextUrl.pathname === "/admin/login"

    // Redirect authenticated users away from auth page
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
      return null
    }

    // If not authenticated, redirect to login
    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      
      return NextResponse.redirect(
        new URL(`/admin/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    return null
  },
  {
    callbacks: {
      authorized: () => true // Let middleware handle the auth check
    },
  }
)

// Protect these paths
export const config = {
  matcher: ["/admin/:path*"]
} 