'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { getDashboardRoute } from '@/lib/auth-routes';
import {
  User,
  HardHat,
  Briefcase,
  KeyRound,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    src: '/heros/cococare-harvesting.jpg',
    alt: 'KK Group Cococare Tree Climbing & Harvesting Services',
    title: 'Coconut Harvesting & Tree Care',
    badge: 'Cococare',
  },
  {
    src: '/heros/electrical-services.jpg',
    alt: 'KK Group Professional Electrical Engineering & Panel Services',
    title: 'Electrical Engineering & Maintenance',
    badge: 'Electrical',
  },
  {
    src: '/heros/plumbing-services.jpg',
    alt: 'KK Group Plumbing & Water Solutions',
    title: 'Plumbing & Pipe Installation',
    badge: 'Plumbing',
  },
];

export default function HeroLandingPage() {
  const { user, isAuthenticated } = useAuth();
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-cycle through the hero background images every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#dce1e6] dark:bg-[#0d1117] p-2.5 sm:p-5 flex items-center justify-center font-sans antialiased transition-colors">
      {/* Outer Hero Capsule Container */}
      <main className="relative w-full h-[calc(100vh-20px)] sm:h-[calc(100vh-40px)] min-h-[760px] max-h-[1080px] rounded-[32px] sm:rounded-[48px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-white/40 flex flex-col justify-between p-4 sm:p-7 md:p-8 select-none">
        {/* Dynamic Background Slideshow from public/heros */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              idx === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* High-End Dark Vignette Gradient Overlay for Text & Form Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85 pointer-events-none" />

        {/* ----------------- Top Navigation Bar ----------------- */}
        <header className="relative z-10 w-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-white group">
            {/* Geometric Crown/Hex Emblem */}
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-black text-sm tracking-tighter">KK</span>
            </div>
            <div>
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-white drop-shadow-sm">
                KK Group
              </span>
              
            </div>
          </Link>

          {/* Floating Frosted Glass Capsule Navigation */}
          <nav className="hidden md:flex items-center gap-7 bg-white/20 hover:bg-white/25 backdrop-blur-md border border-white/30 rounded-full px-7 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-all">
            <button
              onClick={() => setShowPortalModal(true)}
              className="hover:text-amber-200 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => setShowPortalModal(true)}
              className="hover:text-amber-200 transition-colors"
            >
              JCB Fleets
            </button>
            <button
              onClick={() => setShowPortalModal(true)}
              className="hover:text-amber-200 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => setShowPortalModal(true)}
              className="hover:text-amber-200 transition-colors"
            >
              Portals
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <Link
                href={getDashboardRoute(user.role)}
                className="bg-black hover:bg-zinc-900 text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Dashboard ({user.role})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                onClick={() => setShowPortalModal(true)}
                className="bg-black hover:bg-zinc-900 text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
              >
                Book a Crew
              </button>
            )}
          </div>
        </header>

        {/* ----------------- Center Hero Typography & CTAs ----------------- */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto px-2 w-full">
          {/* Editorial Serif Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-serif text-white tracking-tight leading-[1.04] drop-shadow-[0_2px_25px_rgba(0,0,0,0.35)]">
            Give your <span className="italic font-serif font-normal">workforce</span> <br />
            somewhere to go.
          </h1>

          {/* Side-by-Side Pill CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary Golden-Amber Button */}
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-zinc-950 font-semibold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
            >
              <span>Book a crew now</span>
              {/* Star Badge */}
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-amber-300 text-[10px]">
                ✦
              </div>
            </Link>

            {/* Secondary Frosted Glass Button */}
            <button
              onClick={() => setShowPortalModal(true)}
              className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/40 text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              Explore role portals
            </button>
          </div>

        </div>

        {/* ----------------- Bottom Bar with Slide Indicators ----------------- */}
        <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/85 font-medium px-2 pointer-events-auto select-none">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">KK Group Field Operations</span>
            <span className="text-white/40">•</span>
            <span className="text-amber-300 font-medium">{HERO_SLIDES[activeSlide].title}</span>
          </div>

          {/* Interactive Slide Selector Pills */}
          <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md p-1 rounded-full border border-white/20">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                  activeSlide === idx
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {slide.badge}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* ENTERPRISE ROLE PORTALS MODAL (Preserves all auth functionality) */}
      {/* ========================================================================= */}
      {showPortalModal && (
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
      )}
    </div>
  );
}
