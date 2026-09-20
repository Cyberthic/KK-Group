'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShoppingCart,
  Heart,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/utils/translations';
import { HeroServiceCard } from './HeroServiceCard';
import { HeroEnquiryBox } from './HeroEnquiryBox';

interface HeroSectionProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

export function HeroSection({ onOpenEnquiry }: HeroSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <div className="w-full relative overflow-visible select-none">
      {/* ========================================================
          1. MAIN STAGE: Green/Cinematic Bento Chassis with Central Model Overlay
      ======================================================== */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative mt-3 sm:mt-5 pb-6">
        {/* The Bento Container Card with /heros/hero1.png Background */}
        <div className="w-full bg-slate-950 rounded-[36px] sm:rounded-[48px] md:rounded-[56px] relative overflow-visible p-5 sm:p-8 lg:p-12 pb-28 sm:pb-36 lg:pb-16 min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] text-white shadow-2xl flex flex-col justify-between border border-slate-800/40">
          {/* Background Image Container: Clipped to the bento card radius */}
          <div className="absolute inset-0 rounded-[36px] sm:rounded-[48px] md:rounded-[56px] overflow-hidden z-0 pointer-events-none">
            <picture className="w-full h-full">
              <source media="(max-width: 640px)" srcSet="/heros/hero1-mobile.png" />
              <img
                src="/heros/hero1.png"
                alt="KK Group Operations"
                className="w-full h-full object-cover object-center"
              />
            </picture>
            {/* Soft Cinematic Gradient Overlays: vertical for mobile, horizontal for desktop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/75 sm:hidden block" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/50 hidden sm:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
          </div>

          {/* Grid Layout inside the Card: Left Column & Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* ----------------------------------------------------
                LEFT COLUMN: Kicker, Big Headline, Subtitle, CTA, Social Proof
            ---------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-start z-10">
              <div>
                {/* ✦ New Collection Kicker */}
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white/90 mb-3 sm:mb-4">
                  <svg viewBox="0 0 24 24" fill="#2A835F" className="w-3.5 h-3.5 text-[#2A835F]">
                    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                  </svg>
                  <span>{t.newCollection}</span>
                </div>

                {/* Main Headline */}
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-extrabold text-white leading-[1.22] tracking-tight max-w-lg">
                  {t.cardHeadline1} <br />
                  {t.cardHeadline2}
                </h2>

                {/* Subtitle Paragraph */}
                <p className="text-emerald-50/90 text-sm sm:text-base font-semibold leading-relaxed max-w-md mt-3.5 mb-7">
                  {t.cardSubtitle}
                </p>

                {/* Explore Now Pill Button */}
                <Link
                  href="#collections"
                  className="bg-[#0F172A] hover:bg-black text-white px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer group"
                >
                  <span>{t.exploreNow}</span>
                  <div className="w-6 h-6 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>

              {/* Bottom Left Floating Social Proof Glass Pill */}
              <div className="mt-6 sm:mt-8 inline-flex items-center gap-3 bg-white/20 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-2xl p-2.5 px-4 shadow-md transition-all w-fit">
                {/* 3 Overlapping Trendsetter Avatars */}
                <div className="flex items-center -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="Trendsetter"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt="Trendsetter"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                    alt="Trendsetter"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                </div>

                {/* Caption */}
                <div className="flex flex-col text-[11px] font-bold text-white leading-tight">
                  <span>{t.lovedBy}</span>
                  <span className="font-medium text-emerald-100">{t.trendsetters}</span>
                </div>

                {/* White Heart Accent */}
                <Heart className="w-3.5 h-3.5 fill-white text-white ml-1" />
              </div>
            </div>

            {/* ----------------------------------------------------
                CENTER CLEARANCE: Space for the Overlapping Model
            ---------------------------------------------------- */}
            <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

            {/* ----------------------------------------------------
                RIGHT COLUMN: "Featured Look" Product Card
            ---------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col justify-start items-start lg:items-end z-10">
              {/* Top/Right: "Featured Look" / Service Product Card */}
              <div className="flex flex-col items-start lg:items-end">
                <span className="text-[11px] font-bold text-[#A3E5C7] uppercase tracking-wider mb-2">
                  {t.featuredLook}
                </span>

                {/* Extracted Dynamic Hero Service Card with Carousel */}
                <HeroServiceCard onSelectService={onOpenEnquiry} />
              </div>
            </div>
          </div>

          {/* ========================================================
              ENQUIRY BOX: Half inside the hero section rectangle, half outside
              - Desktop: Taller horizontal rectangular floating bar
              - Mobile: Lowered vertical rectangular / squarish card
          ======================================================== */}
          <div className="absolute inset-x-0 bottom-0 translate-y-[74%] sm:translate-y-[68%] lg:translate-y-1/2 z-30 px-3 sm:px-6 lg:px-12 flex justify-center pointer-events-auto">
            <HeroEnquiryBox className="max-w-6xl" />
          </div>
        </div>

        {/* ========================================================
            3. CENTERPIECE: Model Overlay (Desktop / Big screens only)
        ======================================================== */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 top-[-160px] sm:top-[-200px] md:top-[-240px] lg:top-[-280px] items-end justify-center pointer-events-none z-20 overflow-visible">
          <div className="relative w-[360px] sm:w-[440px] md:w-[520px] lg:w-[620px] h-[700px] sm:h-[800px] md:h-[880px] lg:h-[940px] flex items-end justify-center">
            {/* The Main Model PNG: /models/pn1.png */}
            <img
              src="/models/pn1.png"
              alt="KK Group Model"
              className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)]"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-[255px] sm:pt-[265px] lg:pt-20 xl:pt-24 pb-2 relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 items-end relative">
          {/* Left Title: "Building Your" + "TRUST" */}
          <div className="flex flex-col z-10 pr-2 sm:pr-8 md:pr-16">
            <span
              className={`font-extrabold text-[11px] xs:text-xs sm:text-xl md:text-3xl lg:text-[40px] xl:text-[44px] text-[#0F172A] tracking-tight mb-0.5 sm:mb-1 ${
                language === 'ml'
                  ? 'leading-tight'
                  : 'font-serif italic leading-none'
              }`}
              style={{
                fontFamily:
                  language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
              }}
            >
              {t.defineYour}
            </span>
            <h1
              className={`font-black text-[#2A835F] tracking-tight uppercase ${
                language === 'ml'
                  ? 'text-sm xs:text-base sm:text-3xl md:text-5xl lg:text-[68px] xl:text-[78px] leading-[1.05]'
                  : 'text-base xs:text-lg sm:text-4xl md:text-6xl lg:text-[76px] xl:text-[86px] leading-[0.95]'
              }`}
              style={{
                fontFamily:
                  language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
              }}
            >
              {t.style}
            </h1>
          </div>

          {/* Right Title: "Delivering Our ✦" + "STRENGTH" - Aligned to the right edge */}
          <div className="flex flex-col z-10 items-end text-right pl-2 sm:pl-0">
            <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-3 mb-0.5 sm:mb-1">
              <span
                className={`font-black text-[11px] xs:text-xs sm:text-xl md:text-3xl lg:text-[40px] xl:text-[44px] text-[#0F172A] tracking-tight ${
                  language === 'ml' ? 'leading-tight' : 'leading-none'
                }`}
                style={{
                  fontFamily:
                    language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
                }}
              >
                {t.ownYour}
              </span>
              {/* Green 4-pointed Sparkle Star */}
              <svg
                viewBox="0 0 24 24"
                fill="#2A835F"
                className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#2A835F] shrink-0"
              >
                <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
              </svg>
            </div>
            <h1
              className={`font-black text-[#2A835F] tracking-tight uppercase text-right ${
                language === 'ml'
                  ? 'text-sm xs:text-base sm:text-3xl md:text-5xl lg:text-[68px] xl:text-[78px] leading-[1.05]'
                  : 'text-base xs:text-lg sm:text-4xl md:text-6xl lg:text-[76px] xl:text-[86px] leading-[0.95]'
              }`}
              style={{
                fontFamily:
                  language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
              }}
            >
              {t.world}
            </h1>
          </div>
        </div>
      </div>

    </div>
    
  );
}
