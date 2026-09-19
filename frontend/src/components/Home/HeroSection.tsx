'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowRight, ShieldCheck, TreePine, Zap, Droplets, HardHat, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

const HERO_FEATURED = [
  {
    id: 'cococare',
    name: 'Cococare - Tree Services',
    kicker: 'FLAGSHIP TREE & PALM CARE',
    title: 'COCOCARE',
    subtitle: 'TREE HARVESTING & CARE',
    description:
      'Professional coconut tree climbing, precision crown trimming, safe nut harvesting, and health assessment. Certified climbers equipped with modern safety harnesses.',
    rating: '5.0',
    reviewCount: '500+ Reviews',
    price: 'From ₹499',
    image: '/heros/cococare-harvesting.jpg',
    verticalText: 'COCOCARE',
    icon: TreePine,
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    kicker: 'COMMERCIAL & RESIDENTIAL',
    title: 'ELECTRICAL',
    subtitle: 'WIRING & INSTALLATION',
    description:
      'Certified master electricians for end-to-end residential rewiring, breaker panel upgrades, industrial load balancing, and emergency electrical repairs.',
    rating: '4.9',
    reviewCount: '420+ Reviews',
    price: 'Guaranteed Safety',
    image: '/heros/electrical-services.jpg',
    verticalText: 'ELECTRICAL',
    icon: Zap,
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    kicker: 'PRECISION WATER SYSTEMS',
    title: 'PLUMBING',
    subtitle: 'LEAKAGE & PIPING SUITE',
    description:
      'Advanced leak detection, sanitary fixture installation, high-pressure line clearing, and complete borewell pump water management solutions.',
    rating: '4.9',
    reviewCount: '380+ Reviews',
    price: 'Fast Dispatch',
    image: '/heros/plumbing-services.jpg',
    verticalText: 'PLUMBING',
    icon: Droplets,
  },
  {
    id: 'construction',
    name: 'Construction Services',
    kicker: 'STRUCTURAL EXCELLENCE',
    title: 'CONSTRUCTION',
    subtitle: 'FOUNDATION TO FINISH',
    description:
      'Turnkey civil construction, architectural renovation, structural steel reinforcement, and site grading with top-grade certified materials.',
    rating: '5.0',
    reviewCount: '290+ Reviews',
    price: 'Premium Build',
    image: '/images/hero_gardener.jpg',
    verticalText: 'CONSTRUCTION',
    icon: HardHat,
  },
];

export function HeroSection({ onSelectService }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = HERO_FEATURED[activeIndex];

  const handleBookNow = () => {
    if (onSelectService) {
      onSelectService(activeItem.name);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#07190f] text-white pt-24 pb-16 sm:pb-24 lg:pt-28">
      
      {/* Background Ambient Glows & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00754a]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      {/* Floating Organic Elements (Leaves / Sparkles matching reference layout) */}
      <div className="absolute top-20 right-[15%] w-8 h-8 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 animate-float-slow hidden lg:flex items-center justify-center pointer-events-none">
        <Sparkles className="w-4 h-4 text-emerald-300" />
      </div>
      <div className="absolute bottom-32 left-[8%] w-10 h-10 rounded-full bg-emerald-600/20 backdrop-blur-sm border border-emerald-400/20 animate-float-reverse hidden lg:flex items-center justify-center pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Details, Ratings & Switcher */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Top Tagline */}
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-emerald-400/90 mb-2">
              WHERE EVERY PROJECT TELLS A STORY,
            </p>

            {/* Giant Bold Headline matching Starbucks reference */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase mb-6">
              WHAT&apos;S <span className="text-[#00c576] drop-shadow-[0_0_25px_rgba(0,197,118,0.4)]">YOURS?</span>
            </h1>

            {/* Active Service Subheader Card */}
            <div className="bg-[#0a2719]/80 backdrop-blur-md border border-emerald-700/30 rounded-2xl p-5 sm:p-6 mb-6 max-w-xl transition-all duration-300">
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase text-emerald-300 mb-2">
                <activeItem.icon className="w-3 h-3 text-emerald-400" />
                <span>{activeItem.kicker}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                {activeItem.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mt-2 font-normal">
                {activeItem.description}
              </p>
            </div>

            {/* Rating & Highlight Pill */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 bg-black/40 border border-emerald-500/30 px-4 py-2 rounded-full">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">
                  {activeItem.rating} <span className="text-emerald-300/70 font-normal">({activeItem.reviewCount})</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-600/40 px-4 py-2 rounded-full text-xs font-bold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeItem.price}</span>
              </div>
            </div>

            {/* Primary Action Button (White Pill matching reference) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={handleBookNow}
                className="inline-flex items-center gap-3 bg-white hover:bg-zinc-100 text-[#07190f] font-black text-xs sm:text-sm px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 group"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4 text-[#00754a] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-300 hover:text-white px-5 py-4 uppercase tracking-wider transition-colors"
              >
                <span>View All 13 Services &darr;</span>
              </a>
            </div>

            {/* Thumbnail Selector (Matches the 4 small cards in reference hero) */}
            <div className="w-full">
              <p className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest mb-3">
                Featured Categories &bull; Select to preview:
              </p>
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2">
                {HERO_FEATURED.map((item, index) => {
                  const isSelected = activeIndex === index;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex-shrink-0 w-20 sm:w-24 h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${
                        isSelected
                          ? 'border-[#00c576] scale-105 shadow-[0_0_20px_rgba(0,197,118,0.5)] ring-2 ring-emerald-400/30'
                          : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-1.5 inset-x-1 text-center">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight text-white line-clamp-1">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Arched/Curved Visual Showcase + Vertical Typography Ribbon */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Arched Container Card */}
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-[3rem] p-4 bg-gradient-to-b from-[#0a3522] to-[#06180f] border border-emerald-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
              
              {/* Inner Glowing Ring */}
              <div className="absolute inset-3 rounded-[2.5rem] border border-emerald-400/20 overflow-hidden">
                <Image
                  src={activeItem.image}
                  alt={activeItem.name}
                  fill
                  priority
                  className="object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07190f] via-transparent to-black/20" />
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-8 left-8 z-20 bg-white/90 backdrop-blur-md text-[#07190f] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl flex items-center gap-1.5">
                <activeItem.icon className="w-3.5 h-3.5 text-[#00754a]" />
                <span>{activeItem.subtitle}</span>
              </div>

              {/* Bottom Card Pill Tag */}
              <div className="absolute bottom-8 inset-x-8 z-20 bg-[#07190f]/90 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-400">Certified Team</p>
                  <p className="text-sm font-extrabold text-white">{activeItem.name}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00754a] text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Vertical Typographic Ribbon (Matching the reference layout) */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none hidden sm:block">
                <span className="writing-mode-vertical text-white/30 font-black text-2xl sm:text-3xl tracking-[0.35em] uppercase font-mono">
                  {activeItem.verticalText}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
