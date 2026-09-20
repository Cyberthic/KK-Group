'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface HomeLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export function HomeLoader({
  onComplete,
  minDurationMs = 1400,
}: HomeLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress tick
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Start sleek zoom-fade exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 650);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 300);
  };

  if (isDone) return null;

  // Dynamic Malayalam status messages based on loading milestones
  let statusText = 'സിസ്റ്റം പരിശോധിക്കുന്നു...';
  if (progress > 28 && progress <= 62) {
    statusText = 'ഫീൽഡ് സർവീസ് നെറ്റ്‌വർക്ക് ബന്ധിപ്പിക്കുന്നു...';
  } else if (progress > 62 && progress < 95) {
    statusText = 'ലൈവ് സ്ക്വാഡുകൾ സജ്ജമാക്കുന്നു...';
  } else if (progress >= 95) {
    statusText = 'സ്വാഗതം! തയ്യാറായിക്കഴിഞ്ഞു...';
  }

  return (
    <div
      aria-label="Loading KK Group"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Emerald Radiance in Background */}
      <div className="absolute w-[520px] h-[520px] rounded-full bg-[#2A835F]/20 blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute w-[280px] h-[280px] rounded-full bg-emerald-400/15 blur-[90px] pointer-events-none" />

      {/* Modern High-Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* Central Glassmorphic Bento Chassis */}
      <div className="relative max-w-md w-[92%] sm:w-[440px] bg-slate-900/80 backdrop-blur-3xl border border-emerald-500/25 rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85),0_0_50px_rgba(42,131,95,0.25)] flex flex-col items-center text-center z-10">
        {/* Glowing Logo Emblem */}
        <div className="relative mb-4 group">
          {/* Animated Halo Glow */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#2A835F] to-emerald-400 opacity-40 blur-lg group-hover:opacity-75 transition duration-500 animate-pulse" />

          {/* Logo Frame */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950/90 border border-emerald-500/30 p-2.5 flex items-center justify-center shadow-xl shadow-black/50 overflow-hidden">
            <img
              src="/logos/named-logo-bg.png"
              alt="KK Group Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(42,131,95,0.5)]"
            />
            {/* Shimmer line sweep */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bilingual Brand Titles */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
          കെ കെ ഗ്രൂപ്പ്
        </h1>
        <p className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-emerald-400 mt-1">
          KK GROUP ENTERPRISES
        </p>

        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mt-4 rounded-full bg-emerald-950/70 border border-emerald-500/35 text-emerald-300 text-xs font-semibold shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="truncate max-w-[260px] sm:max-w-[300px]">
            കേരളത്തിന്റെ വിശ്വസ്ത സേവന ശൃംഖല
          </span>
        </div>

        {/* High-Tech Progress Track */}
        <div className="w-full mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-0.5">
            <span className="text-slate-300 text-xs truncate max-w-[260px]">
              {statusText}
            </span>
            <span className="font-mono text-emerald-400 font-bold ml-2">
              {progress}%
            </span>
          </div>

          <div className="w-full bg-slate-950/90 border border-slate-800 rounded-full h-2.5 p-0.5 overflow-hidden shadow-inner relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2A835F] via-[#34D399] to-[#2A835F] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(52,211,153,0.8)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Highlight Glint at head */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-80 blur-[1px]" />
            </div>
          </div>
        </div>

        {/* Verified Security Tagline & Skip Action */}
        <div className="w-full mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2A835F]" />
            <span>സുരക്ഷിതം & വെരിഫൈഡ്</span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer py-0.5 px-2 rounded-md hover:bg-slate-800/60"
          >
            <span>Skip</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
