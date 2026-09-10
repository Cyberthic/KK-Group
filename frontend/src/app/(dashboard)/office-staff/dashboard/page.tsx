'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { RoleBadge } from '@/components/role-badge';
import {
  Briefcase,
  User,
  CheckCircle2,
  FileText,
  Clock,
  Search,
  Filter,
  Users,
  Send,
  Building,
} from 'lucide-react';

export default function OfficeStaffDashboardPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!token || !user) {
        router.push('/office-staff/login');
      } else if (user.role !== 'OFFICE_STAFF') {
        router.push('/');
      }
    }
  }, [isLoading, token, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  Administrative Desk
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-100 border border-sky-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                  Staff Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome, {user.username}
              </h1>
              <p className="text-xs sm:text-sm text-sky-100 mt-0.5">
                Role: Office Staff &bull; Desk &amp; Documentation Services
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] uppercase tracking-wider text-sky-200 font-semibold">
                Desk Station
              </p>
              <p className="text-sm font-bold text-white">Central HQ &bull; Section B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Office Staff Profile */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-500" />
              Staff Profile
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Staff ID</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300 text-[11px] truncate max-w-[180px]">
                  {user.id}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Assigned Username</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  @{user.username}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Portal Classification</span>
                <RoleBadge role={user.role} size="sm" />
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Authentication Method</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold">
                  Username + Password
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-zinc-500 dark:text-zinc-400">Provisioned On</span>
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
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-500" />
              Department Info
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Customer Support &amp; Order Processing Wing
            </p>
          </div>
        </div>

        {/* Right Column: Desk Operations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Customer Support Queue
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Pending customer verifications and billing documentation
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                2 Pending Verification
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'REQ-1049',
                  customer: 'rajiv.sharma@example.com',
                  type: 'Invoice Reconciliation',
                  time: '10 mins ago',
                  status: 'Reviewing',
                },
                {
                  id: 'REQ-1048',
                  customer: 'priya.nair@example.com',
                  type: 'Service Address Update',
                  time: '25 mins ago',
                  status: 'Queued',
                },
                {
                  id: 'REQ-1047',
                  customer: 'vikram.k@example.com',
                  type: 'Enterprise Quote Verification',
                  time: '1 hour ago',
                  status: 'Approved',
                },
              ].map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold font-mono">
                      {req.id.split('-')[1]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                        {req.type}
                      </h4>
                      <span className="text-[11px] text-zinc-400">
                        {req.customer} &bull; {req.time}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      req.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : req.status === 'Reviewing'
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                        : 'bg-zinc-500/10 text-zinc-500'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
