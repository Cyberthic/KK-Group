'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getDashboardRoute } from '@/lib/auth-routes';

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (token && user) {
      router.replace(getDashboardRoute(user.role));
    }
  }, [isLoading, token, user, router]);

  // If already authenticated, keep showing clean loading while router redirects
  if (isLoading || (token && user)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[50vh] gap-3">
        <div className="w-9 h-9 rounded-full border-3 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin" />
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
          Redirecting to Dashboard...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
