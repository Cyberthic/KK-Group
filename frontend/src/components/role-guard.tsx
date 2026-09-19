'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/services';
import { getDashboardRoute } from '@/lib/auth-routes';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  allowedRole: UserRole;
  loginRoute: string;
  roleLabel: string;
  accentColor?: 'indigo' | 'amber' | 'emerald' | 'purple';
  allowSuperAdmin?: boolean;
  allowDemo?: boolean;
  children: React.ReactNode;
}

const SPINNER_COLORS = {
  indigo: 'border-indigo-600 dark:border-indigo-400',
  amber: 'border-amber-600 dark:border-amber-400',
  emerald: 'border-emerald-600 dark:border-emerald-400',
  purple: 'border-purple-600 dark:border-purple-400',
};

export function RoleGuard({
  allowedRole,
  loginRoute,
  roleLabel,
  accentColor = 'indigo',
  allowSuperAdmin = false,
  allowDemo = false,
  children,
}: RoleGuardProps) {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();
  const [isDemoMode, setIsDemoMode] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('demo') === 'true' || document.cookie.includes('kk_demo_staff=true')) {
        setIsDemoMode(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoading || (allowDemo && isDemoMode)) return;

    if (!token || !user) {
      router.replace(loginRoute);
    } else if (
      user.role !== allowedRole &&
      !(allowSuperAdmin && user.role === 'SUPER_ADMIN')
    ) {
      router.replace(getDashboardRoute(user.role));
    }
  }, [isLoading, token, user, allowedRole, loginRoute, router, allowSuperAdmin, allowDemo, isDemoMode]);

  // If in authorized demo mode, render immediately
  if (allowDemo && isDemoMode) {
    return <>{children}</>;
  }

  // Loading state or redirecting state
  const isAuthorized =
    user && (user.role === allowedRole || (allowSuperAdmin && user.role === 'SUPER_ADMIN'));

  if (isLoading || !token || !isAuthorized) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[60vh] gap-3">
        <div
          className={`w-10 h-10 rounded-full border-3 ${SPINNER_COLORS[accentColor]} border-t-transparent animate-spin`}
        />
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
          Verifying {roleLabel} Session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
