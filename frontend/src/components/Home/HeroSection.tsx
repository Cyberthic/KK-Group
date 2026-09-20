'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Shirt,
  Leaf,
  Gem,
  ShoppingCart,
  Heart,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <div className="w-full relative overflow-visible select-none">
      {/* ========================================================
          1. UPPER SECTION: Giant Typography ("Define Your STYLE" / "Own Your ✦ WORLD")
      ======================================================== */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-2 sm:pt-4 pb-2 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end relative">
          {/* Left Title: "Define Your" + "STYLE" */}
          <div className="flex flex-col z-10 md:pr-16">
            <span className="font-serif italic font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-none mb-1">
              {t.defineYour}
            </span>
            <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[118px] text-[#8B5CF6] tracking-tight leading-[0.88] uppercase">
              {t.style}
            </h1>
          </div>

          {/* Right Title: "Own Your ✦" + "WORLD" */}
          <div className="flex flex-col z-10 md:pl-16 md:items-start">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <span className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-none">
                {t.ownYour}
              </span>
              {/* Purple 4-pointed Sparkle Star */}
              <svg
                viewBox="0 0 24 24"
                fill="#8B5CF6"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#8B5CF6] shrink-0"
              >
                <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
              </svg>
            </div>
            <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[118px] text-[#8B5CF6] tracking-tight leading-[0.88] uppercase">
              {t.world}
            </h1>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. MAIN STAGE: Purple Bento Chassis with Central Model Overlay
      ======================================================== */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative mt-3 sm:mt-5 pb-6">
        {/* The Purple Bento Container Card */}
        <div className="w-full bg-[#8E62ED] rounded-[36px] sm:rounded-[48px] md:rounded-[56px] relative overflow-hidden p-6 sm:p-10 lg:p-14 min-h-[520px] sm:min-h-[560px] lg:min-h-[580px] text-white shadow-2xl flex flex-col justify-between">
          {/* Subtle Ambient Background Gradient Accents inside the card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

          {/* Grid Layout inside the Card: Left Column & Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-between h-full relative z-10">
            {/* ----------------------------------------------------
                LEFT COLUMN: Kicker, Big Headline, Subtitle, CTA, Social Proof
            ---------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between z-10">
              <div>
                {/* ✦ New Collection Kicker */}
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white/90 mb-3 sm:mb-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                  </svg>
                  <span>{t.newCollection}</span>
                </div>

                {/* Main Headline: "Where Comfort Meets Confidence" */}
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold text-white leading-[1.08] tracking-tight max-w-md">
                  {t.cardHeadline1} <br />
                  {t.cardHeadline2}
                </h2>

                {/* Subtitle Paragraph */}
                <p className="text-purple-100/90 text-sm sm:text-base font-normal leading-relaxed max-w-sm mt-3.5 mb-7">
                  {t.cardSubtitle}
                </p>

                {/* Explore Now Black Pill Button */}
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
              <div className="mt-8 sm:mt-12 inline-flex items-center gap-3 bg-white/20 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-2xl p-2.5 px-4 shadow-md transition-all w-fit">
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
                  <span className="font-medium text-purple-100">{t.trendsetters}</span>
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
                RIGHT COLUMN: 3 Features & "Featured Look" Product Card
            ---------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end z-10">
              {/* Top Row: 3 Feature Badges */}
              <div className="flex items-center gap-6 sm:gap-7 w-full justify-start lg:justify-end mb-6 lg:mb-4">
                {/* Feature 1: Premium Quality */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                    <Shirt className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    <span>{t.feat1Title}</span> <br />
                    <span>{t.feat1Sub}</span>
                  </div>
                </div>

                {/* Feature 2: Sustainable Fashion */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                    <Leaf className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    <span>{t.feat2Title}</span> <br />
                    <span>{t.feat2Sub}</span>
                  </div>
                </div>

                {/* Feature 3: Limited Edition */}
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                    <Gem className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    <span>{t.feat3Title}</span> <br />
                    <span>{t.feat3Sub}</span>
                  </div>
                </div>
              </div>

              {/* Bottom: "Featured Look" Product Card */}
              <div className="flex flex-col items-start lg:items-end mt-2">
                <span className="text-[11px] font-bold text-purple-200 uppercase tracking-wider mb-2">
                  {t.featuredLook}
                </span>

                {/* White Floating Product Card */}
                <div className="bg-white text-[#0F172A] rounded-3xl p-3 sm:p-3.5 shadow-2xl w-[190px] sm:w-[215px] flex flex-col gap-2.5 transition-transform hover:-translate-y-1 duration-300">
                  {/* Product Image: Lavender Streetwear Hoodie */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&auto=format&fit=crop&q=80"
                      alt="Graffiti Hoodie"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#0F172A] leading-tight">
                      {t.productTitle}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      {t.productSub}
                    </p>
                  </div>

                  {/* Cart Action Button with Price */}
                  <button
                    type="button"
                    className="bg-[#8E62ED] hover:bg-[#7C3AED] text-white py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t.productPrice}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. CENTERPIECE: The Swirly Organic Shape, Orbit Rings & Model
        ======================================================== */}
        <div className="absolute inset-x-0 bottom-0 top-[-160px] sm:top-[-200px] md:top-[-240px] lg:top-[-280px] flex items-end justify-center pointer-events-none z-20 overflow-visible">
          <div className="relative w-[360px] sm:w-[440px] md:w-[520px] lg:w-[620px] h-[700px] sm:h-[800px] md:h-[880px] lg:h-[940px] flex items-end justify-center">
            {/* 3A. The Organic Lavender "Swirly" / Wavy Shape Behind the Model */}
            <div className="absolute top-[2%] sm:top-[4%] w-[300px] sm:w-[380px] md:w-[450px] lg:w-[500px] h-[600px] sm:h-[700px] lg:h-[780px] z-0 opacity-80">
              <svg
                viewBox="0 0 400 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_15px_35px_rgba(142,98,237,0.35)]"
              >
                <path
                  d="M200 15
                     C290 15, 360 55, 350 110
                     C340 165, 250 185, 280 245
                     C315 305, 395 345, 375 410
                     C355 475, 270 495, 295 560
                     C320 625, 370 665, 330 700
                     C290 715, 110 715, 70 700
                     C30 665, 80 625, 105 560
                     C130 495, 45 475, 25 410
                     C5 345, 85 305, 120 245
                     C150 185, 60 165, 50 110
                     C40 55, 110 15, 200 15 Z"
                  fill="#A78BFA"
                />
              </svg>
            </div>

            {/* 3B. Thin Orbit / Wireframe Celestial Rings behind the Model's Head */}
            <div className="absolute top-[3%] sm:top-[5%] w-[360px] sm:w-[440px] lg:w-[520px] h-[260px] sm:h-[300px] z-0">
              <svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Ring 1 tilted left */}
                <ellipse
                  cx="250"
                  cy="140"
                  rx="220"
                  ry="65"
                  stroke="#8B5CF6"
                  strokeWidth="1.6"
                  strokeOpacity="0.55"
                  transform="rotate(-15 250 140)"
                />
                {/* Ring 2 tilted right */}
                <ellipse
                  cx="250"
                  cy="140"
                  rx="205"
                  ry="60"
                  stroke="#C4B5FD"
                  strokeWidth="1.4"
                  strokeOpacity="0.5"
                  transform="rotate(18 250 140)"
                />
              </svg>
            </div>

            {/* 3C. The Requested Model PNG: /models/pn1.png */}
            <img
              src="/models/pn1.png"
              alt="Nexora Model"
              className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
