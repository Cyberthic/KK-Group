import { NextResponse, type NextRequest } from 'next/server';

const ROLE_DASHBOARDS: Record<string, string> = {
  SUPER_ADMIN: '/admin/dashboard',
  WORKER: '/worker/dashboard',
  OFFICE_STAFF: '/office-staff/dashboard',
  CUSTOMER: '/dashboard',
};

const AUTH_PATHS = [
  '/login',
  '/register',
  '/verify-otp',
  '/admin/login',
  '/worker/login',
  '/office-staff/login',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('kk_auth_token')?.value;
  const role = request.cookies.get('kk_auth_role')?.value;

  // 1. Redirect legacy /customer/dashboard -> /dashboard
  if (pathname === '/customer/dashboard' || pathname.startsWith('/customer/dashboard/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/customer/dashboard', '/dashboard');
    return NextResponse.redirect(url);
  }

  // 2. Before Auth (Guest-only auth pages)
  const isAuthPage = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isAuthPage) {
    if (token && role && ROLE_DASHBOARDS[role]) {
      const destination = ROLE_DASHBOARDS[role];
      const url = new URL(destination, request.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 3. After Auth (Protected dashboard pages)
  // Super Admin
  if (pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
    if (role !== 'SUPER_ADMIN') {
      const destination = (role && ROLE_DASHBOARDS[role]) || '/login';
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  // Worker
  if (pathname.startsWith('/worker/dashboard')) {
    if (!token) {
      const url = new URL('/worker/login', request.url);
      return NextResponse.redirect(url);
    }
    if (role !== 'WORKER') {
      const destination = (role && ROLE_DASHBOARDS[role]) || '/login';
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  // Office Staff
  if (pathname.startsWith('/office-staff/dashboard')) {
    if (!token) {
      const url = new URL('/office-staff/login', request.url);
      return NextResponse.redirect(url);
    }
    if (role !== 'OFFICE_STAFF') {
      const destination = (role && ROLE_DASHBOARDS[role]) || '/login';
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  // Customer Dashboard (/dashboard)
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    if (!token) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
    if (role !== 'CUSTOMER') {
      const destination = (role && ROLE_DASHBOARDS[role]) || '/login';
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/customer/dashboard/:path*',
    '/dashboard/:path*',
    '/admin/dashboard/:path*',
    '/worker/dashboard/:path*',
    '/office-staff/dashboard/:path*',
    '/login',
    '/register',
    '/verify-otp',
    '/admin/login',
    '/worker/login',
    '/office-staff/login',
  ],
};
