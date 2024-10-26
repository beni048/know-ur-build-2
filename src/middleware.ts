// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add any routes that should be protected
const protectedRoutes = ['/dashboard']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (
    protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && 
    !token
  ) {
    const loginUrl = new URL('/signin', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/estimate/:path*',
  ],
}