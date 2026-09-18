'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  ArrowLeft,
  RefreshCw,
  Trash2,
  Loader2,
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Clock,
  KeyRound,
  UserCheck,
  UserX,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { api, User as StaffUser } from '@/services';

interface PersonDetailViewProps {
  username: string;
  expectedRole: 'CUSTOMER' | 'WORKER' | 'OFFICE_STAFF';
  backHref: string;
  categoryLabel: string;
}

export function PersonDetailView({
  username,
  expectedRole,
  backHref,
  categoryLabel,
}: PersonDetailViewProps) {
  const { token, user: currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [person, setPerson] = useState<StaffUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const fetchPerson = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getStaffByUsername(username, token);
      setPerson(data);
    } catch (err: any) {
      console.error('Failed to fetch person details', err);
      setError(err?.message || 'User not found or unable to load details');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [username, token]);

  useEffect(() => {
    if (!authLoading) {
      if (!token || currentUser?.role !== 'SUPER_ADMIN') {
        router.push('/admin/login');
        return;
      }
      fetchPerson();
    }
  }, [authLoading, token, currentUser, router, fetchPerson]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPerson();
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDelete = async () => {
    if (!person || !token) return;
    if (
      !confirm(
        `Are you sure you want to delete ${person.username}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.deleteStaff(person.id, token);
      router.push(backHref);
    } catch (err: any) {
      console.error('Failed to delete user', err);
      alert(err?.message || 'Failed to delete user');
      setIsDeleting(false);
    }
  };

  const getRoleTheme = (role: string) => {
    switch (role) {
      case 'WORKER':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/20',
          ring: 'from-emerald-500 to-teal-600',
        };
      case 'OFFICE_STAFF':
        return {
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          border: 'border-purple-500/20',
          ring: 'from-purple-500 to-indigo-600',
        };
      case 'CUSTOMER':
      default:
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          border: 'border-blue-500/20',
          ring: 'from-blue-500 to-cyan-600',
        };
    }
  };

  if (authLoading || (isLoading && !person)) {
    return (
      <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
        <div className="flex items-center gap-4 text-gray-500">
          <div className="w-9 h-9 rounded-xl bg-[#14151A] border border-gray-800 animate-pulse" />
          <div className="h-4 w-36 bg-[#14151A] rounded-md animate-pulse" />
        </div>
        <div className="bg-[#14151A] border border-gray-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gray-800 animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-28 bg-gray-800/60 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="h-32 bg-[#1A1C23] rounded-2xl animate-pulse" />
            <div className="h-32 bg-[#1A1C23] rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
        <NextLink
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {categoryLabel}
        </NextLink>

        <div className="bg-[#14151A] rounded-3xl border border-gray-800 p-12 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-100 mb-2">
            User Not Found
          </h2>
          <p className="text-gray-500 text-sm max-w-md mb-6">
            {error || `The user @${username} does not exist or has been removed.`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-[#1A1C23] hover:bg-gray-800 text-gray-300 rounded-xl border border-gray-800 text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <NextLink
              href={backHref}
              className="px-4 py-2 bg-[#7B4DFF] hover:bg-[#6A3DEE] text-white rounded-xl text-sm font-medium transition-colors"
            >
              Return to {categoryLabel}
            </NextLink>
          </div>
        </div>
      </div>
    );
  }

  const theme = getRoleTheme(person.role);
  const initial = (person.username?.charAt(0) || 'U').toUpperCase();
  const createdDate = person.createdAt
    ? new Date(person.createdAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown';
  const updatedDate = person.updatedAt
    ? new Date(person.updatedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown';

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
      {/* Top Bar / Navigation & In-place Refresh */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <NextLink
            href={backHref}
            className="p-2 rounded-xl bg-[#14151A] hover:bg-[#1A1C23] text-gray-400 hover:text-white border border-gray-800 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </NextLink>
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <NextLink href="/admin/dashboard" className="hover:text-gray-300 transition-colors">
                Admin
              </NextLink>
              <span>/</span>
              <NextLink href={backHref} className="hover:text-gray-300 transition-colors">
                {categoryLabel}
              </NextLink>
              <span>/</span>
              <span className="text-gray-300">@{person.username}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-100 mt-0.5">
              Profile Overview
            </h1>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#14151A] hover:bg-[#1A1C23] border border-gray-800 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors disabled:opacity-50"
            title="Refetch profile without page reload"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#7B4DFF] ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
            <span>{isRefreshing ? 'Refreshing...' : 'Reload'}</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            <span>Delete User</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="relative bg-[#14151A] rounded-3xl border border-gray-800 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7B4DFF]/50 to-transparent" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Big Avatar */}
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.ring} p-[3px] shadow-lg`}
              >
                <div className="w-full h-full bg-[#1A1C23] rounded-[13px] flex items-center justify-center font-bold text-2xl text-gray-100">
                  {initial}
                </div>
              </div>
              <span
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#14151A] ${
                  person.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                title={person.isActive ? 'Active User' : 'Inactive User'}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-100">
                  {person.username}
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border ${theme.bg} ${theme.text} ${theme.border} uppercase tracking-wider`}
                >
                  {person.role.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-mono">
                @{person.username}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
                person.isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {person.isActive ? (
                <UserCheck className="w-3.5 h-3.5" />
              ) : (
                <UserX className="w-3.5 h-3.5" />
              )}
              <span>{person.isActive ? 'Account Active' : 'Account Inactive'}</span>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
                person.isEmailVerified
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              {person.isEmailVerified ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5" />
              )}
              <span>
                {person.isEmailVerified ? 'Email Verified' : 'Email Unverified'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Identity & Account Card */}
        <div className="bg-[#14151A] rounded-2xl border border-gray-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-200 border-b border-gray-800/60 pb-3">
            <Shield className="w-4 h-4 text-[#7B4DFF]" />
            <h3>Identity & System Info</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* User ID */}
            <div>
              <span className="text-gray-500 block mb-1">User Identifier (UUID)</span>
              <div className="flex items-center justify-between bg-[#1A1C23] border border-gray-800/80 px-3 py-2 rounded-xl">
                <span className="font-mono text-gray-300 truncate mr-2">
                  {person.id}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyId(person.id)}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy ID"
                >
                  {copiedId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Username */}
            <div className="flex justify-between items-center py-1 border-b border-gray-800/40">
              <span className="text-gray-500">Username</span>
              <span className="font-medium text-gray-200 font-mono">
                {person.username}
              </span>
            </div>

            {/* Role */}
            <div className="flex justify-between items-center py-1 border-b border-gray-800/40">
              <span className="text-gray-500">System Role</span>
              <span className="font-medium text-gray-200">
                {person.role.replace('_', ' ')}
              </span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-medium ${
                  person.isActive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {person.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Timestamps Card */}
        <div className="bg-[#14151A] rounded-2xl border border-gray-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-200 border-b border-gray-800/60 pb-3">
            <Mail className="w-4 h-4 text-[#7B4DFF]" />
            <h3>Contact & Activity</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Email */}
            <div>
              <span className="text-gray-500 block mb-1">Email Address</span>
              <div className="flex items-center justify-between bg-[#1A1C23] border border-gray-800/80 px-3 py-2 rounded-xl">
                <span className="text-gray-300 truncate">
                  {person.email || 'Not configured'}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium shrink-0 ml-2 ${
                    person.isEmailVerified
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {person.isEmailVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>

            {/* Created At */}
            <div className="flex justify-between items-center py-1 border-b border-gray-800/40">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                Joined On
              </span>
              <span className="font-medium text-gray-200">{createdDate}</span>
            </div>

            {/* Updated At */}
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                Last Updated
              </span>
              <span className="font-medium text-gray-200">{updatedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
