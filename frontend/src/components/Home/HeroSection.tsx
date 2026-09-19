'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Headphones,
  CalendarCheck,
  Lock,
} from 'lucide-react';
import { EnquiryBox } from './EnquiryBox';

export function HeroSection() {
  // ========================================================
  // Services Auto-Scrolling Carousel Data & Engine
  // ========================================================
  const services = [
    {
      id: 'cococare',
      title: 'Cococare Harvesting',
      region: 'Palakkad, Kerala',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'jcb',
      title: 'JCB Heavy Machinery',
      region: 'Ernakulam / Kochi',
      rating: '4.8',
      image:
        'https://images.unsplash.com/photo-1579273166629-9e8c3b9b47e2?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'plastering',
      title: 'Plastering Squads',
      region: 'Thrissur / Malappuram',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'tiling',
      title: 'Tile & Marble Laying',
      region: 'Calicut / Wayanad',
      rating: '4.8',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'painting',
      title: 'Commercial Painting',
      region: 'Coimbatore, TN',
      rating: '4.7',
      image:
        'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'pruning',
      title: 'Crown Cleaning & Care',
      region: 'Pollachi / Alathur',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'excavation',
      title: 'Trenching & Drainage',
      region: 'Palakkad / Ottapalam',
      rating: '4.8',
      image:
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'workforce',
      title: 'Field Squad Units',
      region: 'All Kerala Districts',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f6?w=600&auto=format&fit=crop&q=80',
    },
  ];

  // Carousel Infinite Scrolling State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile Viewport for responsive step width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll one by one every 3.2 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsTransitionEnabled(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Seamless circular loop reset when reaching end of primary array
  useEffect(() => {
    if (currentIndex >= services.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(0);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, services.length]);

  // Manual Previous / Next controls
  const handlePrev = () => {
    setIsTransitionEnabled(true);
    if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(services.length);
      setTimeout(() => {
        setIsTransitionEnabled(true);
        setCurrentIndex(services.length - 1);
      }, 20);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between pt-1 pb-1 relative z-10">
      {/* ========================================================
          1. UPPER HERO ROW: Editorial Headline (Left) & Enquiry Box (Right)
      ======================================================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative my-auto">
        {/* Left Column: Editorial Serif Headline & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center z-20">
          {/* Kicker with Sunset Orange (#FF9137) Line */}
          <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
            <span className="w-6 sm:w-8 h-[2.5px] bg-[#FF9137] rounded-full inline-block" />
            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.28em] text-[#FF9137] uppercase">
              KK GROUP ENTERPRISE SOLUTIONS
            </span>
          </div>

          {/* Main Editorial Headline in Dark Espresso / Navy */}
          <h1 className="font-serif text-5xl sm:text-6xl xl:text-[76px] 2xl:text-[84px] leading-[1.04] tracking-normal text-[#0F172A] font-normal drop-shadow-xs">
            Adventures <br />
            That Stay <br />
            With You
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-3 sm:mt-4 max-w-md leading-relaxed drop-shadow-xs">
            Deploy on-demand verified teams, heavy machinery, coconut harvesting squads, and premium operations across the region.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary Sunset Orange (#FF9137) Button */}
            <button
              onClick={() => {
                const el = document.getElementById('enquiry-card');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FF9137] hover:bg-[#FFCC4D] text-white hover:text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Watch Video Glass Light Button */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <button
                type="button"
                title="Watch Video"
                className="w-11 h-11 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-slate-200/80 flex items-center justify-center text-[#0F172A] transition-all shadow-sm group-hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#0F172A] text-[#0F172A] ml-0.5" />
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0F172A] leading-tight group-hover:text-[#FF9137] transition-colors">
                  Watch Video
                </span>
                <span className="text-[10px] text-slate-600 font-medium">
                  See KK Group in action
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            Center Flight Path Trajectory & Pin
        ======================================================== */}
        <div className="hidden xl:block absolute left-[44%] top-[12%] pointer-events-none z-10 w-[240px] h-[170px]">
          <svg viewBox="0 0 240 170" className="w-full h-full overflow-visible">
            {/* Curved dashed flight line in Sunset Orange */}
            <path
              d="M 210 25 C 130 15, 65 65, 42 140"
              stroke="#FF9137"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeOpacity="0.85"
              fill="none"
            />
            {/* White/Orange Airplane Flying Top-Right */}
            <g transform="translate(212, 23) rotate(35)">
              <path d="M 0,-8 L 3,5 L 0,3 L -3,5 Z" fill="#FF9137" />
              <path d="M -6,0 L 6,0 L 0,-4 Z" fill="#FFCC4D" />
            </g>
          </svg>

          {/* Clean Mint (#70FFD2) Map Pin with Sunset Border */}
          <div className="absolute left-[31px] top-[131px] flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white border-2 border-[#FF9137] shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#70FFD2]" />
            </div>
          </div>
        </div>

        {/* ========================================================
            Right Column: Standalone EnquiryBox Component
        ======================================================== */}
        <div className="lg:col-span-5 flex justify-end z-20 lg:pt-6 xl:pt-8">
          <EnquiryBox />
        </div>
      </div>

      {/* ========================================================
          2. LOWER HERO ROW: Popular Services (Auto-Scrolling 1-by-1) & Trust Bar
      ======================================================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end my-auto pt-2">
        {/* Left: Popular Services Auto-Scrolling Carousel (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-end overflow-hidden">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">
                Popular Services
              </h3>
              <Link
                href="#services"
                className="text-[11px] font-bold text-[#FF9137] hover:underline cursor-pointer"
              >
                View all
              </Link>
            </div>

            {/* Left/Right Light Carousel Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous Service"
                className="w-6 h-6 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-800 transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                title="Next Service"
                className="w-6 h-6 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-800 transition-all shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Auto-Scrolling Sliding Cards Track (One by One) */}
          <div
            className="overflow-hidden w-full py-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex ${
                isTransitionEnabled ? 'transition-transform duration-700 ease-out' : ''
              }`}
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? 50 : 25)}%)`,
              }}
            >
              {/* Render Primary + Duplicate Array for Seamless Infinite Loop */}
              {[...services, ...services].map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="w-1/2 sm:w-1/4 shrink-0 pr-2.5"
                >
                  <div className="group relative rounded-2xl overflow-hidden h-[95px] sm:h-[110px] border border-white/80 shadow-md cursor-pointer flex flex-col justify-end p-2.5 transition-all duration-300 hover:shadow-lg">
                    {/* Background Photo */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    {/* Card Info & Rating */}
                    <div className="relative z-10 flex items-end justify-between">
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {service.title}
                        </div>
                        <div className="text-[10px] text-slate-200 font-medium">
                          {service.region}
                        </div>
                      </div>

                      {/* Star Rating Pill Badge with #FFCC4D Star */}
                      <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                        <Star className="w-2.5 h-2.5 fill-[#FFCC4D] text-[#FFCC4D]" />
                        <span>{service.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Glass Light Trust Features Bar (5 Cols) */}
        <div className="lg:col-span-5 flex items-end">
          <div className="w-full bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-2.5 px-3 sm:px-4 flex items-center justify-between shadow-sm">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#FFFC8C]/60 flex items-center justify-center text-[#FF9137]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] text-slate-800 font-bold leading-tight">
                Verified <br /> Operatives
              </span>
            </div>

            <div className="w-[1px] h-7 bg-slate-200" />

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#70FFD2]/30 flex items-center justify-center text-emerald-800">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] text-slate-800 font-bold leading-tight">
                24/7 Field <br /> Support
              </span>
            </div>

            <div className="w-[1px] h-7 bg-slate-200" />

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#FFFC8C]/60 flex items-center justify-center text-[#FF9137]">
                <CalendarCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] text-slate-800 font-bold leading-tight">
                Flexible <br /> Scheduling
              </span>
            </div>

            <div className="w-[1px] h-7 bg-slate-200" />

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#70FFD2]/30 flex items-center justify-center text-emerald-800">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] text-slate-800 font-bold leading-tight">
                Transparent <br /> Billing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. STATS FOOTER STRIP (Light Crisp Bar)
      ======================================================== */}
      <div className="w-full pt-2.5 pb-1 border-t border-slate-300/80 flex flex-wrap items-center justify-between text-xs text-slate-700 shrink-0">
        <div className="flex items-center gap-6 sm:gap-12">
          <div>
            <span className="text-sm sm:text-base font-extrabold text-[#0F172A]">500+</span>
            <span className="text-[10px] text-slate-600 font-medium ml-1.5">Projects Completed</span>
          </div>

          <div>
            <span className="text-sm sm:text-base font-extrabold text-[#0F172A]">10K+</span>
            <span className="text-[10px] text-slate-600 font-medium ml-1.5">Happy Clients</span>
          </div>

          <div>
            <span className="text-sm sm:text-base font-extrabold text-[#0F172A]">150+</span>
            <span className="text-[10px] text-slate-600 font-medium ml-1.5">Verified Workers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <span className="text-sm sm:text-base font-extrabold text-[#0F172A]">4.9</span>
          <span className="text-[10px] text-slate-600 font-medium">Customer Rating</span>
          <div className="flex items-center text-[#FFCC4D] ml-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#FFCC4D] text-[#FFCC4D]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
