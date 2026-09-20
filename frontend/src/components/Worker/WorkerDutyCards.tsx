'use client';

import React from 'react';
import {
  Footprints,
  Activity,
  ArrowRight,
  Loader2,
  HardHat,
  Sparkles,
} from 'lucide-react';

interface WorkerDutyCardsProps {
  isOnDuty?: boolean;
  onToggleDuty?: () => void;
  isTogglingDuty?: boolean;
  activeJobTitle?: string;
  totalTimeWorked?: string;
  onViewActiveJob?: () => void;
}

export function WorkerDutyCards({
  isOnDuty = true,
  onToggleDuty,
  isTogglingDuty = false,
  activeJobTitle = 'Palm Harvesting Squad',
  totalTimeWorked = '748 hr',
  onViewActiveJob,
}: WorkerDutyCardsProps) {
  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* 1. TOP CARD: Daily Field Duty (Purple card matching reference) */}
      <div
        onClick={onToggleDuty}
        className="w-full bg-[#5E42B4] hover:bg-[#5439a8] rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 text-white shadow-[0_15px_35px_rgba(94,66,180,0.25)] flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
      >
        {/* Ambient Subtle Glow */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Squircle Shoe/Duty Icon */}
        <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0 shadow-inner group-hover:bg-white/25 transition-colors">
          {isTogglingDuty ? (
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          ) : (
            <Footprints className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Title & Status */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
            Daily Jogging
          </span>
          <span className="text-[11px] font-semibold text-purple-200 mt-0.5 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnDuty ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>{isOnDuty ? 'On-Field Ready' : 'Off Duty'}</span>
          </span>
        </div>
      </div>

      {/* 2. BOTTOM CARD: My Jogging / Active Work (Vibrant Pink Gradient Card) */}
      <div
        onClick={onViewActiveJob}
        className="w-full bg-gradient-to-br from-[#FF5E88] via-[#FF5481] to-[#FA4777] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 text-white shadow-[0_20px_45px_rgba(255,94,136,0.35)] flex flex-col justify-between min-h-[170px] sm:min-h-[190px] relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
      >
        {/* Subtle Background Waves */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 300 200"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,130 Q 75,100 150,140 T 300,120 L 300,200 L 0,200 Z"
            fill="#FFFFFF"
          />
        </svg>

        {/* Top: Squircle Runner Icon + Title */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black text-white tracking-tight">
              My Jogging
            </span>
            <span className="text-[10px] font-semibold text-pink-100 line-clamp-1 max-w-[140px]">
              {activeJobTitle}
            </span>
          </div>
        </div>

        {/* Bottom Row: Large Stat (748 hr / July) + Circle Arrow Button */}
        <div className="flex items-end justify-between relative z-10 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-100">
              Total Time
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mt-1">
              {totalTimeWorked}
            </span>
            <span className="text-[11px] font-medium text-pink-200 mt-1">
              July
            </span>
          </div>

          {/* Forward Arrow Circle Button */}
          <div className="w-10 h-10 rounded-full border-2 border-white/60 group-hover:border-white group-hover:bg-white/20 flex items-center justify-center transition-all shadow-md">
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
