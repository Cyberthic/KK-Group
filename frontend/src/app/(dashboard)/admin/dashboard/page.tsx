'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { api, User as StaffUser } from '@/lib/api';
import { RoleBadge } from '@/components/role-badge';
import {
  KeyRound,
  Users,
  HardHat,
  Briefcase,
  UserPlus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Shield,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, isLoading: authLoading } = useAuth();

  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  const [isFetchingStaff, setIsFetchingStaff] = useState(false);
  const [filterRole, setFilterRole] = useState<'ALL' | 'WORKER' | 'OFFICE_STAFF'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Create Staff Form State
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'WORKER' | 'OFFICE_STAFF'>('WORKER');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!token || !user) {
        router.push('/admin/login');
      } else if (user.role !== 'SUPER_ADMIN') {
        router.push('/');
      } else {
        loadStaff();
      }
    }
  }, [authLoading, token, user, router]);

  const loadStaff = async () => {
    if (!token) return;
    setIsFetchingStaff(true);
    try {
      const list = await api.listStaff(token);
      setStaffList(list);
    } catch (err) {
      console.error('Failed to load staff list:', err);
    } finally {
      setIsFetchingStaff(false);
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setCreateError('');
    setCreateSuccess('');

    if (newUsername.trim().length < 3) {
      setCreateError('Username must be at least 3 characters long');
      return;
    }

    if (newPassword.length < 6) {
      setCreateError('Password must be at least 6 characters long');
      return;
    }

    setIsCreating(true);

    try {
      const res = await api.createStaff(
        {
          username: newUsername.trim(),
          password: newPassword,
          role: newRole,
        },
        token,
      );

      setCreateSuccess(
        `Staff member @${newUsername.trim()} (${newRole.replace('_', ' ')}) created successfully!`,
      );
      setNewUsername('');
      setNewPassword('');
      loadStaff();
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create staff member');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteStaff = async (id: string, staffName: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete staff account @${staffName}?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await api.deleteStaff(id, token);
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete staff member');
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const workerCount = staffList.filter((s) => s.role === 'WORKER').length;
  const officeStaffCount = staffList.filter((s) => s.role === 'OFFICE_STAFF').length;

  const filteredStaff = staffList.filter((s) => {
    const matchesRole =
      filterRole === 'ALL' ? true : s.role === filterRole;
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : s.username?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  Master Command Center
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-100 border border-purple-400/30">
                  <Shield className="w-3.5 h-3.5 text-purple-300" />
                  Super Admin
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Administration Console
              </h1>
              <p className="text-xs sm:text-sm text-purple-100 mt-0.5">
                Logged in as: {user.email || user.username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadStaff}
              disabled={isFetchingStaff}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isFetchingStaff ? 'animate-spin' : ''}`}
              />
              <span>Refresh Staff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Total Provisioned Staff
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
              {staffList.length}
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <HardHat className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Active Workers
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
              {workerCount}
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Office Staff Members
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
              {officeStaffCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Provisioning Form + Staff Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Create Staff Form */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Provision New Staff
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
              Create Workers or Office Staff with <strong>Username and Password only</strong>. No email required.
            </p>

            {createError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            {createSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{createSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaff} className="space-y-4">
              {/* Role Toggle */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Select Staff Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewRole('WORKER')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      newRole === 'WORKER'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <HardHat className="w-3.5 h-3.5" />
                    <span>Worker</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewRole('OFFICE_STAFF')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      newRole === 'OFFICE_STAFF'
                        ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Office Staff</span>
                  </button>
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label
                  htmlFor="newUsername"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Staff Username
                </label>
                <input
                  id="newUsername"
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder={
                    newRole === 'WORKER' ? 'e.g. worker_mohan' : 'e.g. staff_priya'
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Temporary Password (min. 6 chars)
                </label>
                <input
                  id="newPassword"
                  type="text"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="StaffPassword@123"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Provision Staff Account</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Staff Directory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Staff Directory
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Manage active workers and office staff accounts
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-xl">
                {(['ALL', 'WORKER', 'OFFICE_STAFF'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterRole(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      filterRole === tab
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'ALL'
                      ? 'All'
                      : tab === 'WORKER'
                      ? 'Workers'
                      : 'Office Staff'}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by username..."
                className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>

            {/* Table */}
            {isFetchingStaff ? (
              <div className="py-12 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                Loading staff members...
              </div>
            ) : filteredStaff.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-500 dark:text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                No staff members found. Create one using the form on the left.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Username</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Created</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                    {filteredStaff.map((staff) => (
                      <tr
                        key={staff.id}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="py-3 font-semibold text-zinc-900 dark:text-white">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400">
                            @{staff.username}
                          </span>
                        </td>
                        <td className="py-3">
                          <RoleBadge role={staff.role} size="sm" />
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        </td>
                        <td className="py-3 text-zinc-500 dark:text-zinc-400">
                          {new Date(staff.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() =>
                              handleDeleteStaff(staff.id, staff.username || '')
                            }
                            disabled={deletingId === staff.id}
                            title="Delete staff account"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {deletingId === staff.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
