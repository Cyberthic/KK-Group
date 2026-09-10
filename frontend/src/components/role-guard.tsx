'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/lib/api';
import { getDashboardRoute } from '@/lib/auth-routes';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  allowedRole: UserRole;
  loginRoute: string;
  roleLabel: string;
  accentColor?: 'indigo' | 'amber' | 'emerald' | 'purple';
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
  children,
}: RoleGuardProps) {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!token || !user) {
      router.replace(loginRoute);
    } else if (user.role !== allowedRole) {
      router.replace(getDashboardRoute(user.role));
    }
  }, [isLoading, token, user, allowedRole, loginRoute, router]);

  // Loading state or redirecting state
  if (isLoading || !token || !user || user.role !== allowedRole) {
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
