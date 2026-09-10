'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { RoleBadge } from '@/components/role-badge';
import {
  HardHat,
  User,
  CheckCircle2,
  Clock,
  Briefcase,
  Calendar,
  AlertTriangle,
  PlayCircle,
  MapPin,
  ClipboardList,
} from 'lucide-react';

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();
  const [isOnDuty, setIsOnDuty] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!token || !user) {
        router.push('/worker/login');
      } else if (user.role !== 'WORKER') {
        router.push('/');
      }
    }
  }, [isLoading, token, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
              <HardHat className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  Worker Operations Desk
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-100 border border-amber-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  Staff Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome, {user.username}
              </h1>
              <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
                Role: Worker &bull; Field Operative
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnDuty(!isOnDuty)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                isOnDuty
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnDuty ? 'bg-white animate-ping' : 'bg-zinc-500'
                }`}
              />
              {isOnDuty ? 'On Duty (Active)' : 'Off Duty (Paused)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Worker Credential Profile */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              Staff Profile
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Worker ID</span>
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
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
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
              <MapPin className="w-4 h-4 text-amber-500" />
              Assigned Work Zone
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Main Operations Unit &bull; Industrial Hub Alpha
            </p>
          </div>
        </div>

        {/* Right Column: Work Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Active Field Checklist
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Your operational duties for today
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                3 Tasks Pending
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Inspect Equipment Safety Seals',
                  priority: 'High',
                  time: '09:30 AM',
                  status: 'Completed',
                },
                {
                  title: 'Material Dispatch Verification',
                  priority: 'Medium',
                  time: '11:00 AM',
                  status: 'In Progress',
                },
                {
                  title: 'Warehouse Log Confirmation',
                  priority: 'Low',
                  time: '02:30 PM',
                  status: 'Pending',
                },
              ].map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        task.status === 'Completed'
                          ? 'bg-emerald-500'
                          : task.status === 'In Progress'
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-zinc-400'
                      }`}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                        {task.title}
                      </h4>
                      <span className="text-[11px] text-zinc-400">
                        Scheduled: {task.time} &bull; Priority: {task.priority}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      task.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : task.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-zinc-500/10 text-zinc-500'
                    }`}
                  >
                    {task.status}
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
