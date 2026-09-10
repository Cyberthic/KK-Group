'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { RoleBadge } from '@/components/role-badge';
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Heart,
  Settings,
  Bell,
  ArrowUpRight,
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!token || !user)) {
      router.push('/login');
    }
  }, [isLoading, token, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
              {user.email?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  Customer Portal
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  Email Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {user.email?.split('@')[0]}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold">
                Account Status
              </p>
              <p className="text-sm font-bold text-white">Active &amp; Confirmed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Details & Security */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-500" />
              Account Information
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Account ID</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300 text-[11px] truncate max-w-[180px]">
                  {user.id}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Primary Email</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {user.email}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Assigned Role</span>
                <RoleBadge role={user.role} size="sm" />
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">OTP Confirmation</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-zinc-500 dark:text-zinc-400">Member Since</span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              Security Check
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
              Your customer account is protected with email OTP verification on sign-up and salted bcrypt password hashing.
            </p>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Email authentication validated</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Services & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Customer Workspace
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Quick access to customer orders, requests, and inquiries
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 bg-zinc-50/50 dark:bg-zinc-950/50 transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1 flex items-center justify-between">
                  <span>My Active Requests</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  View and manage your service bookings and status updates.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 bg-zinc-50/50 dark:bg-zinc-950/50 transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Bell className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1 flex items-center justify-between">
                  <span>Notifications &amp; Updates</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Check communication logs and task completion messages.
                </p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              Recent Authentication History
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      Email OTP Authentication Confirmed
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Verified via 6-digit one-time code
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
