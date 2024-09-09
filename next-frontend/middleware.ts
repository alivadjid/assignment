import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["dashboard"];

export default function middleware(req: NextRequest) {
  let isAuthenticated = false
  const cookie = req.headers.get('Cookie');

  const isProtectedRoute = typeof req.nextUrl.pathname === 'string' && req.nextUrl.pathname.split('/').some(part => protectedRoutes.includes(part))
  if (cookie) {
    const cookieData = cookie.split(';')

    isAuthenticated = cookieData.some( e => e.includes('isAuthenticated=true'))
  }
  console.log('middleware', isAuthenticated, isProtectedRoute)
  if (!isAuthenticated && isProtectedRoute) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}