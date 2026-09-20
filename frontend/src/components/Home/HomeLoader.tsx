'use client';

import React, { useState, useEffect } from 'react';

interface HomeLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export function HomeLoader({
  onComplete,
  minDurationMs = 600,
}: HomeLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 350);
      return () => clearTimeout(exitTimer);
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs, onComplete]);

  if (isDone) return null;

  return (
    <div
      aria-label="Loading KK Group"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-slate-800 transition-opacity duration-300 ease-out select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center gap-3 max-w-xs px-6">
        {/* Simple Brand Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/90 p-2.5 flex items-center justify-center shadow-sm">
          <img
            src="/logos/named-logo-bg.png"
            alt="KK Group"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Clean Typography */}
        <div className="flex flex-col items-center mt-1">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            KK GROUP
          </h1>
          <p className="text-[11px] font-semibold text-[#2A835F] tracking-wide mt-0.5">
            കേരളത്തിന്റെ വിശ്വസ്ത സേവന ശൃംഖല
          </p>
        </div>

        {/* Minimal Standard Spinner */}
        <div className="mt-3 flex items-center gap-2.5">
          <div className="w-4 h-4 border-2 border-slate-200 border-t-[#2A835F] rounded-full animate-spin" />
          <span className="text-xs font-medium text-slate-500 tracking-wide">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
