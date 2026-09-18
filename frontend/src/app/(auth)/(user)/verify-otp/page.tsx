'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { api } from '@/services';
import {
  MailCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Info,
} from 'lucide-react';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const initialEmail = searchParams.get('email') || '';
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Cooldown countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Please provide your registered email');
      return;
    }

    if (code.length !== 6) {
      setErrorMessage('Verification code must be 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.customerVerifyOtp({ email, code });
      setSuccessMessage('Email verified successfully! Redirecting...');
      if (res.token && res.user) {
        login(res.token, res.user);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setIsResending(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.customerResendOtp({ email });
      setSuccessMessage('A fresh verification code has been dispatched to your email.');
      setResendCooldown(60); // 60-second cooldown
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-500/20">
          <MailCheck className="w-6 h-6" />
        </div>
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
          Security Confirmation
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Enter Verification Code
        </h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          We sent a 6-digit confirmation code to{' '}
          <strong className="text-zinc-800 dark:text-zinc-200">
            {email || 'your email'}
          </strong>
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 shadow-xl shadow-zinc-200/50 dark:shadow-none">
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Developer Console Tip */}
        <div className="mb-5 p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-[11px] text-indigo-700 dark:text-indigo-300 flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Local Dev Notice:</strong> If SMTP is not active, your 6-digit OTP code is printed directly to the backend terminal log.
          </span>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Account Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="code"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 text-center"
            >
              6-Digit OTP Code
            </label>
            <input
              id="code"
              type="text"
              required
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full text-center tracking-[0.6em] font-mono text-2xl font-bold py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-indigo-600 dark:text-indigo-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Confirm & Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            Didn't receive code?
          </span>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
          >
            {isResending ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Sending...</span>
              </>
            ) : resendCooldown > 0 ? (
              <span>Resend in {resendCooldown}s</span>
            ) : (
              <>
                <RefreshCw className="w-3 h-3" />
                <span>Resend Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <Suspense
        fallback={
          <div className="text-center text-xs text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
            Loading confirmation...
          </div>
        }
      >
        <VerifyOtpContent />
      </Suspense>
    </div>
  );
}
