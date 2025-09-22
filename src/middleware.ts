import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('kwetu_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth', '/listings', '/search-results'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Guest routes
  const guestRoutes = ['/guest'];
  const isGuestRoute = guestRoutes.some(route => pathname.startsWith(route));

  // Host routes
  const hostRoutes = ['/host', '/add-listing'];
  const isHostRoute = hostRoutes.some(route => pathname.startsWith(route));

  // If user is authenticated and tries to access auth page, redirect to home
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Only check roles for protected routes
  if (isGuestRoute || isHostRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    
    // Verify token and check role
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
        headers: {
          'Cookie': `kwetu_token=${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        const user = userData.success ? userData.data : userData;
        
        // Check role based on route
        if (isGuestRoute && !user?.roles?.includes('GUEST')) {
          return NextResponse.redirect(new URL('/', request.url));
        }
        
        if (isHostRoute && !user?.roles?.includes('HOST')) {
          // If user has GUEST role, redirect to home, otherwise redirect to auth
          if (user?.roles?.includes('GUEST')) {
            return NextResponse.redirect(new URL('/', request.url));
          } else {
            return NextResponse.redirect(new URL('/auth', request.url));
          }
        }
      } else {
        // Token is invalid (401/403) or other error, redirect to auth
        const redirectResponse = NextResponse.redirect(new URL('/auth', request.url));
        // Clear the invalid token cookie
        redirectResponse.cookies.delete('kwetu_token');
        return redirectResponse;
      }
    } catch (error) {
      // Error fetching user data, redirect to auth
      const redirectResponse = NextResponse.redirect(new URL('/auth', request.url));
      redirectResponse.cookies.delete('kwetu_token');
      return redirectResponse;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
