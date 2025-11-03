import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/', '/login', '/register', '/verify-email']
const protectedRoutes = ['/dashboard']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isPublicRoute = publicRoutes.includes(pathname)
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  const firebaseAuth = request.cookies.get('firebase-auth')
  const isAuthenticated = !!firebaseAuth?.value

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
