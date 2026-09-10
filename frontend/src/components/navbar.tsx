'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getDashboardRoute } from '@/lib/auth-routes';
import { RoleBadge } from './role-badge';
import {
  Shield,
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
  Layers,
  HardHat,
  Briefcase,
  KeyRound,
} from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getDashboardHref = () => {
    if (!user) return '/';
    return getDashboardRoute(user.role);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
                KK <span className="text-indigo-600 dark:text-indigo-400">GROUP</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-zinc-400 -mt-1">
                Enterprise Suite
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-colors ${
                pathname === '/' ? 'text-zinc-900 dark:text-white font-semibold' : ''
              }`}
            >
              Overview
            </Link>

            {isAuthenticated && (
              <Link
                href={getDashboardHref()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors font-semibold"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Right side: Portals / User info */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-right">
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {user.username || user.email?.split('@')[0]}
                  </p>
                  <p className="text-[11px] text-zinc-400">{user.email || `@${user.username}`}</p>
                </div>
              </div>
              <RoleBadge role={user.role} size="sm" />
              <button
                onClick={handleLogout}
                title="Sign out"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Portal Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  onBlur={() => setTimeout(() => setPortalDropdownOpen(false), 200)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Portals</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                {portalDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Role Login Portals
                    </div>
                    <Link
                      href="/login"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <User className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="font-semibold">Customer Portal</p>
                        <p className="text-[10px] text-zinc-400">Email & OTP sign-in</p>
                      </div>
                    </Link>
                    <Link
                      href="/worker/login"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <HardHat className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="font-semibold">Worker Portal</p>
                        <p className="text-[10px] text-zinc-400">Username sign-in</p>
                      </div>
                    </Link>
                    <Link
                      href="/office-staff/login"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Briefcase className="w-4 h-4 text-sky-500" />
                      <div>
                        <p className="font-semibold">Office Staff Portal</p>
                        <p className="text-[10px] text-zinc-400">Username sign-in</p>
                      </div>
                    </Link>
                    <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                    <Link
                      href="/admin/login"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <KeyRound className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="font-semibold">Super Admin</p>
                        <p className="text-[10px] text-zinc-400">Management portal</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/login"
                className="inline-flex items-center justify-center text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
