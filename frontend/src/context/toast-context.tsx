'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  Smartphone,
} from 'lucide-react';

export type ToastType = 'warning' | 'error' | 'success' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: {
    type?: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  success: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      type = 'warning',
      title,
      message,
      duration = 5000,
    }: {
      type?: ToastType;
      title: string;
      message?: string;
      duration?: number;
    }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [newToast, ...prev.slice(0, 2)]); // Keep at most 3 large toasts

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
    },
    [dismissToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: 'warning', title, message, duration });
    },
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: 'error', title, message, duration });
    },
    [showToast]
  );

  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: 'success', title, message, duration });
    },
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: 'info', title, message, duration });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ showToast, warning, error, success, info, dismissToast }}
    >
      {children}

      {/* Typical Large Toast Container */}
      <div
        aria-live="polite"
        className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-[99999] pointer-events-none flex flex-col gap-3 max-w-md w-full"
      >
        {toasts.map((toast) => (
          <LargeToastCard
            key={toast.id}
            toast={toast}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

function LargeToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const isWarning = toast.type === 'warning';
  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  // Styling configurations for the large toast card
  const styleConfig = {
    warning: {
      border: 'border-amber-500/40',
      badgeBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      badgeDot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
      iconBoxBg: 'bg-gradient-to-br from-amber-500/25 to-amber-600/10 border-amber-500/30 text-amber-400',
      progressBar: 'bg-gradient-to-r from-amber-500 to-amber-300',
      badgeLabel: 'WARNING',
      icon: AlertTriangle,
    },
    error: {
      border: 'border-rose-500/40',
      badgeBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      badgeDot: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
      iconBoxBg: 'bg-gradient-to-br from-rose-500/25 to-rose-600/10 border-rose-500/30 text-rose-400',
      progressBar: 'bg-gradient-to-r from-rose-500 to-rose-300',
      badgeLabel: 'VALIDATION ERROR',
      icon: AlertCircle,
    },
    success: {
      border: 'border-[#2A835F]/50',
      badgeBg: 'bg-[#2A835F]/20 text-[#4ADE80] border-[#2A835F]/40',
      badgeDot: 'bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)]',
      iconBoxBg: 'bg-gradient-to-br from-[#2A835F]/30 to-[#2A835F]/10 border-[#2A835F]/40 text-[#4ADE80]',
      progressBar: 'bg-gradient-to-r from-[#2A835F] to-[#4ADE80]',
      badgeLabel: 'SUCCESS',
      icon: CheckCircle2,
    },
    info: {
      border: 'border-sky-500/40',
      badgeBg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      badgeDot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]',
      iconBoxBg: 'bg-gradient-to-br from-sky-500/25 to-sky-600/10 border-sky-500/30 text-sky-400',
      progressBar: 'bg-gradient-to-r from-sky-500 to-sky-300',
      badgeLabel: 'NOTICE',
      icon: Info,
    },
  }[toast.type];

  const IconComponent = styleConfig.icon;

  return (
    <div
      role="alert"
      className={`pointer-events-auto w-full bg-slate-950/95 backdrop-blur-2xl border-2 ${styleConfig.border} rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-white relative overflow-hidden transition-all animate-in fade-in slide-in-from-top-4 duration-300`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${styleConfig.badgeBg}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${styleConfig.badgeDot} animate-pulse`}
            />
            <span>{styleConfig.badgeLabel}</span>
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            KK Group Dispatch
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Toast Content: Large Icon + Typography */}
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Large Prominent Icon Box */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg ${styleConfig.iconBoxBg}`}
        >
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-xs sm:text-[13px] font-medium text-slate-300 leading-relaxed mt-1">
              {toast.message}
            </p>
          )}
        </div>
      </div>

      {/* Animated Dismiss Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
          <div
            className={`h-full ${styleConfig.progressBar}`}
            style={{
              animation: `shrinkWidth ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}
