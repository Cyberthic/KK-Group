'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
  Building,
  Phone,
  Calendar,
  MapPin,
  RefreshCw,
  AlertCircle,
  UserCheck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  EnquiryService,
  ServiceEnquiry,
  ServiceStatus,
} from '@/services';
import { AssignWorkerModal } from '@/components/OfficeStaff/AssignWorkerModal';

export default function OfficeStaffDashboardPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  const [enquiries, setEnquiries] = useState<ServiceEnquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiryForAssign, setSelectedEnquiryForAssign] =
    useState<ServiceEnquiry | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!token || !user) {
        router.push('/office-staff/login');
      } else if (user.role !== 'OFFICE_STAFF' && user.role !== 'SUPER_ADMIN') {
        router.push('/');
      }
    }
  }, [isLoading, token, user, router]);

  const loadEnquiries = useCallback(async () => {
    if (!token) return;
    setLoadingEnquiries(true);
    setError(null);
    try {
      const statusParam =
        statusFilter === 'ALL' ? undefined : (statusFilter as ServiceStatus);
      const res = await EnquiryService.getAllEnquiries(
        {
          status: statusParam,
          search: searchQuery.trim() || undefined,
          limit: 50,
        },
        token,
      );
      setEnquiries(res.enquiries || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch service enquiries');
    } finally {
      setLoadingEnquiries(false);
    }
  }, [token, statusFilter, searchQuery]);

  useEffect(() => {
    if (token) {
      loadEnquiries();
    }
  }, [loadEnquiries, token]);

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Summary counts
  const pendingCount = enquiries.filter((e) => e.status === 'PENDING').length;
  const assignedCount = enquiries.filter((e) => e.status === 'ASSIGNED').length;
  const inProgressCount = enquiries.filter((e) => e.status === 'IN_PROGRESS').length;
  const completedCount = enquiries.filter((e) => e.status === 'COMPLETED').length;

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
                  Administrative &amp; Dispatch Desk
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-100 border border-sky-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                  Staff Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome, {user.name || user.username}
              </h1>
              <p className="text-xs sm:text-sm text-sky-100 mt-0.5">
                Role: Office Staff &bull; Customer Enquiries &amp; Worker Dispatch Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadEnquiries}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Queue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Pending Dispatch
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
            {pendingCount}
          </p>
          <span className="text-[11px] text-amber-500 font-medium">Needs Worker</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Assigned
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
            {assignedCount}
          </p>
          <span className="text-[11px] text-sky-500 font-medium">Worker Dispatched</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              In Progress
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
            {inProgressCount}
          </p>
          <span className="text-[11px] text-indigo-500 font-medium">Under Execution</span>
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
          <span className="text-[11px] text-emerald-500 font-medium">Resolved Jobs</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Office Staff Profile & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-500" />
              Staff Profile
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Name</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {user.name || 'Staff Member'}
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
                <span className="text-zinc-500 dark:text-zinc-400">Station</span>
                <span className="text-sky-600 dark:text-sky-400 font-medium">
                  Central Operations &bull; Dispatch
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-zinc-500 dark:text-zinc-400">Worker Safety</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Available Only Rule Active
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-500" />
              Dispatch Guidelines
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              When assigning incoming service requests, the system validates the selected worker&apos;s real-time duty and availability. Off-duty or busy workers cannot be assigned.
            </p>
          </div>
        </div>

        {/* Right 3 Columns: Service Enquiries Live Queue */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            {/* Header with Search & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>Customer Service Enquiries</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20">
                    {enquiries.length} Total
                  </span>
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Live requests submitted from the home consultation &amp; services section
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer, ref, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              {[
                { id: 'ALL', label: 'All Requests' },
                { id: 'PENDING', label: `Pending (${pendingCount})` },
                { id: 'ASSIGNED', label: `Assigned (${assignedCount})` },
                { id: 'IN_PROGRESS', label: `In Progress (${inProgressCount})` },
                { id: 'COMPLETED', label: `Completed (${completedCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    statusFilter === tab.id
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Enquiries List */}
            {loadingEnquiries ? (
              <div className="py-16 flex flex-col items-center justify-center text-zinc-400">
                <div className="w-8 h-8 rounded-full border-2 border-sky-600 border-t-transparent animate-spin mb-3" />
                <span className="text-xs">Loading service enquiries...</span>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="py-16 text-center text-zinc-400 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-8">
                <FileText className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  No service enquiries found
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  {statusFilter !== 'ALL'
                    ? `There are currently no enquiries with status "${statusFilter}".`
                    : 'Customer enquiries submitted from the homepage will appear here in real-time.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => {
                  const isPending = enq.status === 'PENDING';
                  const isAssigned = enq.status === 'ASSIGNED';
                  const isInProgress = enq.status === 'IN_PROGRESS';
                  const isCompleted = enq.status === 'COMPLETED';

                  return (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col gap-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            {enq.trackingNumber}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                            {enq.serviceName}
                          </h4>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : isInProgress
                                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                                : isAssigned
                                ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {enq.status.replace('_', ' ')}
                          </span>

                          {isPending && (
                            <button
                              onClick={() => setSelectedEnquiryForAssign(enq)}
                              className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-sm"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Assign Worker</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Customer Info & Location */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="font-semibold text-zinc-900 dark:text-white">
                            {enq.customerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-zinc-400" />
                          <a
                            href={`tel:${enq.customerPhone}`}
                            className="hover:underline text-sky-600 dark:text-sky-400"
                          >
                            {enq.customerPhone}
                          </a>
                        </div>

                        {enq.location && (
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{enq.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Customer Note */}
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        {enq.message}
                      </p>

                      {/* Assigned Worker Block */}
                      {enq.worker && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-800/40 rounded-xl px-3.5 py-2.5 mt-1 text-sky-900 dark:text-sky-200">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                              W
                            </div>
                            <span>
                              Assigned Worker: <strong>{enq.worker.name || enq.worker.username}</strong>
                              {enq.worker.phone && ` (${enq.worker.phone})`}
                            </span>
                          </div>

                          <div className="text-[11px] text-zinc-400 mt-1 sm:mt-0">
                            {enq.assignedAt && (
                              <span>
                                Dispatched {new Date(enq.assignedAt).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            )}
                          </div>
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

      {/* Assign Worker Modal */}
      {token && (
        <AssignWorkerModal
          isOpen={!!selectedEnquiryForAssign}
          onClose={() => setSelectedEnquiryForAssign(null)}
          enquiry={selectedEnquiryForAssign}
          token={token}
          onAssignedSuccess={() => {
            loadEnquiries();
          }}
        />
      )}
    </div>
  );
}
