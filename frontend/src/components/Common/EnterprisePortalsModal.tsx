import React from 'react';
import Link from 'next/link';
import { User, HardHat, Briefcase, KeyRound, ChevronRight } from 'lucide-react';

interface EnterprisePortalsModalProps {
  setShowPortalModal: (show: boolean) => void;
}

export function EnterprisePortalsModal({ setShowPortalModal }: EnterprisePortalsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-md w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h4 className="font-bold text-base text-zinc-900 dark:text-white">
              Access Enterprise Portals
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Select your designated role to sign in
            </p>
          </div>
          <button
            onClick={() => setShowPortalModal(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5 mt-4">
          <Link
            href="/login"
            onClick={() => setShowPortalModal(false)}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Customer Portal
                </p>
                <p className="text-[11px] text-zinc-400">Email & 6-Digit OTP verification</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/worker/login"
            onClick={() => setShowPortalModal(false)}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Worker Portal
                </p>
                <p className="text-[11px] text-zinc-400">Field assignments & credentials</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/office-staff/login"
            onClick={() => setShowPortalModal(false)}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Office Staff Portal
                </p>
                <p className="text-[11px] text-zinc-400">Operations desk & crew dispatch</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/admin/login"
            onClick={() => setShowPortalModal(false)}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Super Admin Portal
                </p>
                <p className="text-[11px] text-zinc-400">Master controls & worker provisioning</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
