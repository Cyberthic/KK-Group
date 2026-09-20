'use client';

import React from 'react';
import {
  Bell,
  Home,
  FileText,
  BarChart2,
  Activity,
  PlayCircle,
  LogOut,
  HardHat,
  Users,
  MapPin,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  badge?: string | number;
}

interface WorkerNavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLogout?: () => void;
  hasNotifications?: boolean;
  assignedJobsCount?: number;
  isOnDuty?: boolean;
  onToggleDuty?: () => void;
  isTogglingDuty?: boolean;
  userName?: string;
}

export function WorkerNavbar({
  activeTab = 'home',
  onTabChange,
  onLogout,
  hasNotifications = true,
  assignedJobsCount,
  isOnDuty = true,
  onToggleDuty,
  isTogglingDuty = false,
  userName = 'Operative',
}: WorkerNavbarProps) {
  const desktopNavItems: NavItem[] = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    {
      id: 'tasks',
      icon: FileText,
      label: 'Work Orders',
      badge: assignedJobsCount && assignedJobsCount > 0 ? assignedJobsCount : undefined,
    },
    { id: 'crew', icon: Users, label: 'Squad & Map' },
    { id: 'analytics', icon: BarChart2, label: 'Performance' },
    { id: 'activity', icon: Activity, label: 'Live Operations' },
  ];

  const mobileNavItems: NavItem[] = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    {
      id: 'tasks',
      icon: FileText,
      label: 'Orders',
      badge: assignedJobsCount && assignedJobsCount > 0 ? assignedJobsCount : undefined,
    },
    { id: 'crew', icon: Users, label: 'Squad & Map' },
    { id: 'analytics', icon: BarChart2, label: 'Stats' },
  ];

  return (
    <>
      {/* ========================================================
          1. FIXED TOP NAVBAR (Zero Movement on Scroll)
          Pinned permanently at the top of the viewport
      ======================================================== */}
      <header className="fixed top-0 inset-x-0 z-50 w-full select-none pt-2 sm:pt-3 px-2 sm:px-4 bg-[#E5E8F2]/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xs">
        <div className="w-full max-w-[1480px] mx-auto pb-2 sm:pb-2.5">
          <nav
            aria-label="Worker primary navigation"
            className="w-full bg-[#5E42B4] border border-white/20 rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 px-3 sm:px-5 shadow-[0_15px_35px_rgba(94,66,180,0.3)] text-white flex items-center justify-between gap-3 transition-all"
          >
          {/* Left: Brand Emblem + Worker Info */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-inner">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black tracking-tight leading-none text-white">
                  KK GROUP
                </span>
                <span className="hidden sm:inline text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                  OPERATIVE
                </span>
              </div>
              <span className="text-[10px] font-semibold text-purple-200 uppercase tracking-wider mt-0.5">
                {userName} &bull; കേരളം
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar with Icons and Names */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 overflow-x-auto scrollbar-none py-0.5">
            {desktopNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange?.(item.id)}
                  className={`flex items-center gap-2 px-3.5 lg:px-4 py-2 rounded-xl lg:rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm scale-[1.02] ring-1 ring-white/35 font-extrabold'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>

                  {item.badge !== undefined && (
                    <span className="ml-0.5 bg-[#FF5E88] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Quick Duty Toggle, Alerts & Sign Out */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Duty Status Pill Toggle */}
            <button
              type="button"
              onClick={onToggleDuty}
              disabled={isTogglingDuty}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-xs border ${
                isOnDuty
                  ? 'bg-emerald-500/90 hover:bg-emerald-400 text-white border-emerald-400/40'
                  : 'bg-white/15 hover:bg-white/25 text-white/90 border-white/20'
              }`}
            >
              {isTogglingDuty ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnDuty ? 'bg-white animate-pulse' : 'bg-slate-300'
                  }`}
                />
              )}
              <span className="hidden sm:inline">
                {isOnDuty ? 'On Duty' : 'Off Duty'}
              </span>
              <span className="inline sm:hidden text-[11px]">
                {isOnDuty ? 'Duty ON' : 'Duty OFF'}
              </span>
            </button>

            {/* Notifications Alert Button */}
            <button
              type="button"
              onClick={() => onTabChange?.('notifications')}
              aria-label="Alerts"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4 text-white" />
              {hasNotifications && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF5E88] ring-2 ring-[#5E42B4]" />
              )}
            </button>

            {/* Desktop Sign Out Button with Icon and Name */}
            <button
              type="button"
              onClick={onLogout}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-rose-500/80 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
        </div>
      </header>

      {/* ========================================================
          2. UTMOST MOBILE-FRIENDLY FIXED BOTTOM THUMB NAVIGATION BAR
          Optimized for workers holding smartphone with one hand on field!
      ======================================================== */}
      <div
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-2 py-1.5 flex items-center justify-around select-none"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange?.(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative cursor-pointer min-w-[58px] ${
                isActive ? 'text-[#5E42B4]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#5E42B4] text-white shadow-md shadow-[#5E42B4]/30' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-black text-[#5E42B4]' : 'font-semibold'}`}>
                {item.label}
              </span>

              {item.badge !== undefined && (
                <span className="absolute top-0.5 right-2 bg-[#FF5E88] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Mobile Quick Duty Switch */}
        <button
          type="button"
          onClick={onToggleDuty}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer min-w-[58px] ${
            isOnDuty ? 'text-emerald-600' : 'text-slate-400'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              isOnDuty ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {isTogglingDuty ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <HardHat className="w-4 h-4" />
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">
            {isOnDuty ? 'On Duty' : 'Off Duty'}
          </span>
        </button>

        {/* Mobile Quick Sign Out Button */}
        <button
          type="button"
          onClick={onLogout}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-slate-400 hover:text-rose-600 transition-colors cursor-pointer min-w-[58px]"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">
            Exit
          </span>
        </button>
      </div>
    </>
  );
}
