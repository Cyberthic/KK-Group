'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { RoleBadge } from '@/components/role-badge';
import {
  HardHat,
  User,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertTriangle,
  PlayCircle,
  MapPin,
  Phone,
  Calendar,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  EnquiryService,
  ServiceEnquiry,
  WorkerStatus,
} from '@/services';

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  const [isOnDuty, setIsOnDuty] = useState(true);
  const [togglingDuty, setTogglingDuty] = useState(false);
  const [jobs, setJobs] = useState<ServiceEnquiry[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    if (!isLoading) {
      if (!token || !user) {
        router.push('/worker/login');
      } else if (user.role !== 'WORKER') {
        router.push('/');
      }
    }
  }, [isLoading, token, user, router]);

  const loadJobs = useCallback(async () => {
    if (!token) return;
    setLoadingJobs(true);
    setError(null);
    try {
      const res = await EnquiryService.getWorkerJobs(token);
      setJobs(res.jobs || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch assigned jobs');
    } finally {
      setLoadingJobs(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadJobs();
    }
  }, [loadJobs, token]);

  const handleToggleDuty = async () => {
    if (!token || togglingDuty) return;
    const newStatus: WorkerStatus = isOnDuty ? 'OFF_DUTY' : 'AVAILABLE';
    setTogglingDuty(true);
    try {
      await EnquiryService.updateWorkerDuty(newStatus, token);
      setIsOnDuty(!isOnDuty);
    } catch (err: any) {
      alert(err?.message || 'Failed to update duty status');
    } finally {
      setTogglingDuty(false);
    }
  };

  const handleUpdateStatus = async (
    jobId: string,
    newStatus: 'IN_PROGRESS' | 'COMPLETED',
  ) => {
    if (!token) return;
    setActionLoadingId(jobId);
    setError(null);
    try {
      await EnquiryService.updateWorkerJobStatus(
        jobId,
        newStatus,
        newStatus === 'COMPLETED' ? 'Work completed by field operative' : undefined,
        token,
      );
      await loadJobs();
    } catch (err: any) {
      setError(err?.message || 'Failed to update job status');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const assignedCount = jobs.filter((j) => j.status === 'ASSIGNED').length;
  const inProgressCount = jobs.filter((j) => j.status === 'IN_PROGRESS').length;
  const completedCount = jobs.filter((j) => j.status === 'COMPLETED').length;

  const filteredJobs =
    statusFilter === 'ALL'
      ? jobs
      : jobs.filter((j) => j.status === statusFilter);

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
                Welcome, {user.name || user.username}
              </h1>
              <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
                Role: Worker &bull; Field Operative Desk &bull; Live Assignments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleDuty}
              disabled={togglingDuty}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                isOnDuty
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {togglingDuty ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOnDuty ? 'bg-white animate-ping' : 'bg-zinc-500'
                  }`}
                />
              )}
              {isOnDuty ? 'On Duty (Available for Work)' : 'Off Duty (Unavailable)'}
            </button>

            <button
              onClick={loadJobs}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              title="Refresh Jobs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Assigned (New)
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
            {assignedCount}
          </p>
          <span className="text-[11px] text-amber-500 font-medium">Ready to start</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              In Progress
            </span>
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <PlayCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
            {inProgressCount}
          </p>
          <span className="text-[11px] text-orange-500 font-medium">Active work</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Completed
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
            {completedCount}
          </p>
          <span className="text-[11px] text-emerald-500 font-medium">Resolved tasks</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Worker Credential Profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              Staff Profile
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Name</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {user.name || 'Worker'}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Username</span>
                <span className="font-mono text-zinc-900 dark:text-white font-medium">
                  @{user.username}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Classification</span>
                <RoleBadge role={user.role} size="sm" />
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Current Duty</span>
                <span
                  className={`font-semibold ${
                    isOnDuty ? 'text-emerald-500' : 'text-zinc-500'
                  }`}
                >
                  {isOnDuty ? 'Available for Dispatch' : 'Off Duty'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 3 Columns: Work Queue */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Assigned Work Orders
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tasks dispatched to you by Central Office Staff
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'ASSIGNED', label: 'New' },
                  { id: 'IN_PROGRESS', label: 'Active' },
                  { id: 'COMPLETED', label: 'Done' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      statusFilter === tab.id
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loadingJobs ? (
              <div className="py-16 flex flex-col items-center justify-center text-zinc-400">
                <div className="w-8 h-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin mb-3" />
                <span className="text-xs">Loading work queue...</span>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-16 text-center text-zinc-400 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-8">
                <Briefcase className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  No work tickets found
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  When office staff dispatches a job to you, it will show up here instantly with full customer details and work requirements.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const isAssigned = job.status === 'ASSIGNED';
                  const isInProgress = job.status === 'IN_PROGRESS';
                  const isCompleted = job.status === 'COMPLETED';
                  const isActing = actionLoadingId === job.id;

                  return (
                    <div
                      key={job.id}
                      className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 flex flex-col gap-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                            {job.trackingNumber}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                            {job.serviceName}
                          </h4>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : isInProgress
                                ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 animate-pulse'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {job.status.replace('_', ' ')}
                          </span>

                          {isAssigned && (
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'IN_PROGRESS')}
                              disabled={isActing}
                              className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all shadow-sm"
                            >
                              {isActing ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <PlayCircle className="w-3.5 h-3.5" />
                              )}
                              <span>Start Work</span>
                            </button>
                          )}

                          {isInProgress && (
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'COMPLETED')}
                              disabled={isActing}
                              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all shadow-sm"
                            >
                              {isActing ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              <span>Mark Completed</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Customer Info & Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="font-semibold text-zinc-900 dark:text-white">
                            {job.customerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-amber-500" />
                          <a
                            href={`tel:${job.customerPhone}`}
                            className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                          >
                            Call Customer ({job.customerPhone})
                          </a>
                        </div>

                        {job.location && (
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{job.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Customer Note */}
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        {job.message}
                      </p>

                      {job.notes && (
                        <div className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 p-2.5 rounded-xl">
                          <strong>Office Staff Note:</strong> {job.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
