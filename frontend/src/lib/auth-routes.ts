import { UserRole } from '@/services';

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  SUPER_ADMIN: '/admin/dashboard',
  WORKER: '/worker/dashboard',
  OFFICE_STAFF: '/office-staff/dashboard',
  CUSTOMER: '/dashboard',
};

export const ROLE_LOGINS: Record<UserRole, string> = {
  SUPER_ADMIN: '/admin/login',
  WORKER: '/worker/login',
  OFFICE_STAFF: '/office-staff/login',
  CUSTOMER: '/login',
};

export function getDashboardRoute(role?: UserRole | string | null): string {
  if (!role) return '/login';
  return ROLE_DASHBOARDS[role as UserRole] || '/dashboard';
}

export function getLoginRoute(role?: UserRole | string | null): string {
  if (!role) return '/login';
  return ROLE_LOGINS[role as UserRole] || '/login';
}

export const AUTH_PREFIXES = [
  '/login',
  '/register',
  '/verify-otp',
  '/admin/login',
  '/worker/login',
  '/office-staff/login',
];

export function isAuthRoute(pathname: string): boolean {
  return AUTH_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
