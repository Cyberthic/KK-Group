'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { api } from '@/services';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function OfficeStaffLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await api.staffLogin({
        username: username.trim(),
        password,
        portalRole: 'OFFICE_STAFF',
      });

      if (res.token && res.user) {
        login(res.token, res.user);
        router.push('/office-staff/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Office Staff sign in failed. Please check your credentials.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput.trim()) return;
    setForgotSent(true);
  };

  const handleSocialClick = (provider: string) => {
    setSocialNotice(`${provider} single sign-on routed through KK Group Enterprise SSO.`);
    setTimeout(() => setSocialNotice(null), 4000);
  };

  return (
    <div className="min-h-screen w-full bg-[#ECEEFC] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans antialiased selection:bg-[#4338CA] selection:text-white">
      {/* ========================================================
          MAIN SPLIT CARD (Matching Reference Exactly)
      ======================================================== */}
      <div className="w-full max-w-[940px] bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(78,80,180,0.10)] border border-slate-100 p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch transition-all">
        
        {/* ========================================================
            LEFT COLUMN: Vibrant Aurora Mesh Gradient Hero Panel
        ======================================================== */}
        <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden p-7 sm:p-9 flex flex-col justify-between min-h-[260px] sm:min-h-[400px] lg:min-h-[540px] select-none text-white shadow-inner bg-[#1A2FB6]">
          {/* Layered Rich Aurora Mesh Gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 12% 18%, rgba(56, 189, 248, 0.95) 0%, transparent 45%),
                radial-gradient(circle at 86% 16%, rgba(199, 167, 249, 0.95) 0%, transparent 45%),
                radial-gradient(circle at 88% 80%, rgba(224, 212, 255, 0.85) 0%, transparent 45%),
                radial-gradient(circle at 35% 65%, rgba(16, 26, 138, 1) 0%, transparent 60%),
                linear-gradient(145deg, #1C32BE 0%, #101E8C 45%, #4C269E 100%)
              `,
            }}
          />

          {/* Top: White Asterisk Icon */}
          <div className="relative z-10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="w-8 h-8 text-white drop-shadow-xs"
            >
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="4.22" y1="7.5" x2="19.78" y2="16.5" />
              <line x1="4.22" y1="16.5" x2="19.78" y2="7.5" />
            </svg>
          </div>

          {/* Bottom: Headline and Subtitle */}
          <div className="relative z-10 mt-auto pt-12">
            <span className="text-xs sm:text-sm font-normal text-white/90 tracking-wide block mb-2">
              You can easily
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white leading-snug tracking-tight max-w-[320px]">
              Get access your operations hub for clarity and productivity
            </h2>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: Clean Minimalist Sign In Form
        ======================================================== */}
        <div className="p-4 sm:p-8 lg:p-10 flex flex-col justify-center">
          {/* Indigo Asterisk Icon */}
          <div className="mb-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4338CA"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="w-7 h-7"
            >
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="4.22" y1="7.5" x2="19.78" y2="16.5" />
              <line x1="4.22" y1="16.5" x2="19.78" y2="7.5" />
            </svg>
          </div>

          {/* Form Header */}
          <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Sign in to Office Hub
          </h1>
          <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1 mb-6">
            Access pending enquiries, field squad dispatch, and accounts anytime, anywhere - and keep everything flowing in one place.
          </p>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Social Notification */}
          {socialNotice && (
            <div className="mb-4 p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs text-center animate-in fade-in">
              <span>{socialNotice}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Your username or email
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="abi"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-800"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(true);
                    setForgotSent(false);
                    setForgotInput(username);
                  }}
                  className="text-xs text-[#4338CA] hover:text-[#312E81] font-medium transition-colors cursor-pointer hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs sm:text-sm font-semibold shadow-[0_10px_25px_rgba(67,56,202,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Get Started</span>
              )}
            </button>
          </form>

          {/* Divider: or continue with */}
          <div className="flex items-center justify-center my-5 gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-normal text-slate-400">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social / SSO Pills */}
          <div className="grid grid-cols-3 gap-3">
            {/* Behance / Bē */}
            <button
              type="button"
              onClick={() => handleSocialClick('Behance')}
              className="py-2.5 rounded-lg bg-[#EFF1F4] hover:bg-[#E5E8ED] transition-colors flex items-center justify-center text-slate-700 font-bold text-xs cursor-pointer"
              title="Sign in with Behance"
            >
              <span className="font-sans font-black tracking-tight text-slate-700">Bē</span>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialClick('Google')}
              className="py-2.5 rounded-lg bg-[#EFF1F4] hover:bg-[#E5E8ED] transition-colors flex items-center justify-center cursor-pointer"
              title="Sign in with Google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.37 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.41l4.01-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.63 1.27 6.59l4.01 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
                />
              </svg>
            </button>

            {/* Facebook / Apple */}
            <button
              type="button"
              onClick={() => handleSocialClick('Facebook')}
              className="py-2.5 rounded-lg bg-[#EFF1F4] hover:bg-[#E5E8ED] transition-colors flex items-center justify-center cursor-pointer text-[#1877F2]"
              title="Sign in with Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>

          {/* Footer Text & Switcher */}
          <div className="mt-5 text-center space-y-1.5">
            <p className="text-xs text-slate-500 font-normal">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => {
                  setSocialNotice('Office staff access is provisioned by KK Group administrator.');
                  setTimeout(() => setSocialNotice(null), 4000);
                }}
                className="text-[#4338CA] hover:text-[#312E81] font-semibold cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>

            <div>
              <Link
                href="/worker/login"
                className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors hover:underline"
              >
                Are you a field operative? Switch to Worker Sign In →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          FORGOT PASSWORD MODAL
      ======================================================== */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative text-slate-800">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 absolute right-4 top-4 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-[#4338CA] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Reset Staff Password
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your staff username to send a reset dispatch request to your supervisor.
              </p>
            </div>

            {forgotSent ? (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold text-emerald-800">
                  Reset request logged!
                </p>
                <p className="text-[11px] text-slate-600">
                  Please contact KK Group Super Admin or check your staff notifications.
                </p>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="mt-2 text-xs font-bold text-[#4338CA] underline cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Staff Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="abi"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  Send Reset Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
