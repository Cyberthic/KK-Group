'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { api } from '@/services';
import {
  Briefcase,
  User,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Info,
  HardHat,
} from 'lucide-react';

export default function OfficeStaffLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await api.staffLogin({
        username,
        password,
        portalRole: 'OFFICE_STAFF',
      });

      if (res.token && res.user) {
        login(res.token, res.user);
        router.push('/office-staff/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Office Staff sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-sky-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-2">
            Administrative Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Office Staff Sign In
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Sign in using your Super Admin assigned Username and Password
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="mb-5 p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 text-[11px] text-sky-800 dark:text-sky-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Note for Office Personnel:</strong> Staff accounts do not require an email address. Authenticate with your assigned desk username.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Staff Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. staff_anita"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-60 transition-all shadow-md shadow-sky-600/20 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Office Staff</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Switch to Worker or Customer */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/60 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Field operative instead?{' '}
            <Link
              href="/worker/login"
              className="font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Go to Worker Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
