'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Mail,
  Maximize2,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function CosmicConnectionsSection() {
  const [activeSlide, setActiveSlide] = useState(1);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].cosmic;

  return (
    <section className="w-full relative py-14 lg:py-20 bg-[#FAF8F2] text-[#0F172A] overflow-hidden selection:bg-[#70FFD2] selection:text-slate-950">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 relative z-10 flex flex-col gap-10 lg:gap-14">
        {/* ========================================================
            1. TOP PANORAMIC CHASSIS (Astronaut in Mountain Paradise)
        ======================================================== */}
        <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] rounded-[32px] sm:rounded-[40px] overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] group">
          {/* Background Cinematic Mountain Image */}
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=90"
            alt="Alpine Mountain Horizon"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.98] contrast-[1.05] group-hover:scale-102 transition-transform duration-700"
          />

          {/* Foreground Stylized Astronaut on Alpine Ridge */}
          <div className="absolute left-[12%] sm:left-[16%] lg:left-[18%] bottom-0 top-[15%] w-[260px] sm:w-[320px] lg:w-[380px] pointer-events-none z-10">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=85"
              alt="Cosmic Astronaut Explorer"
              className="w-full h-full object-cover object-center mix-blend-screen opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

          {/* Top Header Controls (Over the panoramic image) */}
          <div className="absolute top-5 sm:top-7 inset-x-6 sm:inset-x-8 flex items-center justify-between z-20">
            {/* Left: Pill Menu & Language Switcher */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-xl border border-white/60 rounded-full py-1.5 px-3.5 shadow-md transition-all cursor-pointer">
                <span className="text-xs font-bold text-[#0F172A] tracking-wide">{t.menu}</span>
                <span className="w-5 h-5 rounded-full bg-[#FF9137] shadow-sm flex items-center justify-center text-white text-[10px] font-bold">
                  ●
                </span>
              </div>

              {/* Language Switcher Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 bg-white/90 hover:bg-white backdrop-blur-xl border border-white/60 rounded-full py-1.5 px-3 text-xs text-[#0F172A] shadow-md cursor-pointer transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#FF9137]" />
                <span className={`font-bold text-[11px] ${language === 'en' ? 'text-[#FF9137]' : ''}`}>EN</span>
                <span className="opacity-30">|</span>
                <span className={`font-bold text-[11px] ${language === 'ml' ? 'text-[#FF9137]' : ''}`}>മലയാളം</span>
              </button>
            </div>

            {/* Right: Search Pill & User Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-white/60 rounded-full py-1.5 px-3.5 shadow-md">
                <span className="text-xs text-slate-600 font-medium">{t.searching}</span>
                <div className="w-6 h-6 rounded-full bg-[#FF9137] flex items-center justify-center text-white">
                  <Search className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-white/60 rounded-full py-1 px-2.5 shadow-md cursor-pointer hover:bg-white transition-all">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#FFCC4D]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-[#0F172A] pr-1">Meczy</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Left Vertical Pagination Circles */}
          <div className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
            <button
              type="button"
              onClick={() => setActiveSlide(1)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all cursor-pointer ${
                activeSlide === 1
                  ? 'bg-[#FF9137] text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-md border border-white/60 text-[#0F172A] hover:bg-white shadow-sm'
              }`}
            >
              01
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide(2)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all cursor-pointer ${
                activeSlide === 2
                  ? 'bg-[#FF9137] text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-md border border-white/60 text-[#0F172A] hover:bg-white shadow-sm'
              }`}
            >
              02
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide(3)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all cursor-pointer ${
                activeSlide === 3
                  ? 'bg-[#FF9137] text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-md border border-white/60 text-[#0F172A] hover:bg-white shadow-sm'
              }`}
            >
              03
            </button>
            <div className="w-2 h-2 rounded-full bg-white/70 mt-1 shadow" />
          </div>

          {/* Right Floating Stacked Cards: "With Kids" & "And Pets" */}
          <div className="absolute right-6 sm:right-8 top-24 sm:top-28 flex flex-col gap-3.5 z-20">
            {/* Card 1: With Kids */}
            <div className="relative w-28 sm:w-32 h-24 sm:h-28 rounded-2xl overflow-hidden border border-white/40 shadow-xl backdrop-blur-md group/card cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&auto=format&fit=crop&q=80"
                alt="Child in astronaut helmet"
                className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-md">
                  {t.withKids}
                </span>
              </div>
            </div>

            {/* Card 2: And Pets */}
            <div className="relative w-28 sm:w-32 h-24 sm:h-28 rounded-2xl overflow-hidden border border-white/40 shadow-xl backdrop-blur-md group/card cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&auto=format&fit=crop&q=80"
                alt="Pet dog in astronaut gear"
                className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-md">
                  {t.andPets}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Center Circular Stamp / Cutout Badge */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 translate-y-1/2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFCC4D] border-4 border-[#FAF8F2] shadow-xl flex items-center justify-center text-[#0F172A] group/stamp cursor-pointer hover:scale-105 hover:bg-[#FF9137] hover:text-white transition-all duration-300">
              {/* Rotating Circular Text */}
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_16s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-extrabold uppercase tracking-widest fill-current">
                    <textPath href="#circlePath" startOffset="0%">
                      {t.stampText}
                    </textPath>
                  </text>
                </svg>
              </div>
              <ArrowUpRight className="w-6 h-6 group-hover/stamp:translate-x-0.5 group-hover/stamp:-translate-y-0.5 transition-transform relative z-10" />
            </div>
          </div>
        </div>

        {/* ========================================================
            2. LOWER SECTION: Split Grid (Left Info & 3 Planets, Right 2 Cards)
        ======================================================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 sm:pt-10 items-start">
          {/* ----------------------------------------------------
              LEFT COLUMN: Editorial Headline, 76k Travelers, 3 Planet Cards
          ---------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            {/* Header Title & +76k Social Proof Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-[2px] bg-[#FF9137] rounded-full inline-block" />
                  <span className="text-xs font-extrabold text-[#FF9137] uppercase tracking-wider block">
                    {t.kicker}
                  </span>
                </div>
                <h2
                  className={`${
                    language === 'ml'
                      ? 'text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.25]'
                      : 'text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08]'
                  } text-[#0F172A] tracking-tight`}
                >
                  {t.headlinePart1} <br />
                  {t.headlinePart2} <br />
                  {t.headlinePart3}
                </h2>
              </div>

              {/* +76k Travelers & Avatar Stack */}
              <div className="bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-3.5 sm:p-4 shrink-0 max-w-[240px]">
                <div className="text-sm font-extrabold text-[#0F172A]">
                  {t.enjoyTravel}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                  {t.enjoySub}
                </p>
                {/* Overlapping Avatars */}
                <div className="flex items-center -space-x-2 mt-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="Traveler"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Traveler"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                    alt="Traveler"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-6 h-6 rounded-full bg-[#FF9137] text-white font-bold text-[9px] flex items-center justify-center border-2 border-white shadow-sm">
                    {t.more}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-lg">
              {t.description}
            </p>

            {/* Discover More Button & Social Icons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="rounded-full bg-[#FF9137] hover:bg-[#E57A22] px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {t.discoverMore}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="#facebook"
                  title="Facebook"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-[#FF9137] hover:bg-[#FFFC8C]/30 flex items-center justify-center text-slate-600 hover:text-[#FF9137] transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#email"
                  title="Email"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-[#FF9137] hover:bg-[#FFFC8C]/30 flex items-center justify-center text-slate-600 hover:text-[#FF9137] transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#instagram"
                  title="Instagram"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-[#FF9137] hover:bg-[#FFFC8C]/30 flex items-center justify-center text-slate-600 hover:text-[#FF9137] transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 3 Realistic Planet Feature Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              {/* Planet 1: Jupiter */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 flex flex-col items-center text-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#FFCC4D] transition-all group/planet cursor-pointer">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-md group-hover/planet:scale-110 transition-transform duration-500 my-1">
                  <img
                    src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=200&auto=format&fit=crop&q=80"
                    alt="Jupiter Planet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0F172A] mt-2 leading-tight">
                  {t.planets.jupiter}
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover/planet:bg-[#70FFD2] group-hover/planet:text-slate-950 flex items-center justify-center text-slate-600 mt-3 transition-all shadow-xs">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Planet 2: Mars */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 flex flex-col items-center text-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#FFCC4D] transition-all group/planet cursor-pointer">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-md group-hover/planet:scale-110 transition-transform duration-500 my-1">
                  <img
                    src="https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=200&auto=format&fit=crop&q=80"
                    alt="Mars Planet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0F172A] mt-2 leading-tight">
                  {t.planets.mars}
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover/planet:bg-[#70FFD2] group-hover/planet:text-slate-950 flex items-center justify-center text-slate-600 mt-3 transition-all shadow-xs">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Planet 3: Neptune */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 flex flex-col items-center text-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#FFCC4D] transition-all group/planet cursor-pointer">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-md group-hover/planet:scale-110 transition-transform duration-500 my-1">
                  <img
                    src="https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=200&auto=format&fit=crop&q=80"
                    alt="Neptune Planet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0F172A] mt-2 leading-tight">
                  {t.planets.neptune}
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover/planet:bg-[#70FFD2] group-hover/planet:text-slate-950 flex items-center justify-center text-slate-600 mt-3 transition-all shadow-xs">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------
              RIGHT COLUMN: 2 Stacked Horizontal Planet Cards (Jupiter & Neptune)
          ---------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Card 1: Jupiter in Flower Meadow */}
            <div className="relative rounded-3xl overflow-hidden h-[210px] sm:h-[230px] border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.07)] group/card">
              <img
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&auto=format&fit=crop&q=80"
                alt="Astronaut in flower field - Jupiter"
                className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500 brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

              {/* Top Left: 01 Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-xs font-black text-[#0F172A] bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/80 shadow-sm">
                  01
                </span>
              </div>

              {/* Top Right: User Avatars */}
              <div className="absolute top-4 right-4 z-10 flex items-center -space-x-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-white/80 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
                  alt="Explorer"
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
                  alt="Explorer"
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <span className="text-[9px] font-bold text-slate-800 pl-2">3k+</span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between z-10">
                <div className="max-w-[70%]">
                  <p className="text-[11px] sm:text-xs text-white font-medium leading-snug drop-shadow-md line-clamp-2">
                    {t.planets.jupiterDesc}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 hover:bg-white text-[#0F172A] px-3 py-1 rounded-full transition-all border border-white/60 shadow-sm cursor-pointer"
                  >
                    {t.more}
                  </button>
                </div>

                {/* Frosted Planet Pill Badge */}
                <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-full px-3.5 py-1 text-xs font-black text-[#0F172A] shadow-md">
                  Jupiter
                </div>
              </div>
            </div>

            {/* Card 2: Neptune in Mountain Meadow */}
            <div className="relative rounded-3xl overflow-hidden h-[210px] sm:h-[230px] border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.07)] group/card">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"
                alt="Astronaut in mountain field - Neptune"
                className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500 brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

              {/* Top Left: 02 Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-xs font-black text-[#0F172A] bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/80 shadow-sm">
                  02
                </span>
              </div>

              {/* Top Right: User Avatars */}
              <div className="absolute top-4 right-4 z-10 flex items-center -space-x-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-white/80 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&auto=format&fit=crop&q=80"
                  alt="Explorer"
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&auto=format&fit=crop&q=80"
                  alt="Explorer"
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <span className="text-[9px] font-bold text-slate-800 pl-2">2k+</span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between z-10">
                <div className="max-w-[70%]">
                  <p className="text-[11px] sm:text-xs text-white font-medium leading-snug drop-shadow-md line-clamp-2">
                    {t.planets.neptuneDesc}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 hover:bg-white text-[#0F172A] px-3 py-1 rounded-full transition-all border border-white/60 shadow-sm cursor-pointer"
                  >
                    {t.more}
                  </button>
                </div>

                {/* Frosted Planet Pill Badge */}
                <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-full px-3.5 py-1 text-xs font-black text-[#0F172A] shadow-md">
                  Neptune
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
