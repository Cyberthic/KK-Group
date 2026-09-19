'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Home/Navbar';
import { HeroSection } from '@/components/Home/HeroSection';
import { PopularPackagesSection } from '@/components/Home/PopularPackagesSection';
import { CosmicConnectionsSection } from '@/components/Home/CosmicConnectionsSection';
import { Footer } from '@/components/Home/Footer';

const HERO_BACKGROUNDS = [
  {
    src: '/heros/cococare-harvesting.jpg',
    alt: 'Cococare Palm Tree Harvesting Squads',
  },
  {
    src: '/heros/electrical-services.jpg',
    alt: 'Industrial and Domestic Electrical Systems',
  },
  {
    src: '/heros/plumbing-services.jpg',
    alt: 'Plumbing and Pipeline Infrastructure',
  },
  {
    src: '/heros/residential-electrical-work-services.jpg',
    alt: 'Residential Electrical Solutions',
  },
];

export default function HomePage() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAF8F2] text-[#0F172A] font-sans antialiased selection:bg-[#70FFD2] selection:text-slate-950 flex flex-col scroll-smooth">
      {/* Fixed Navbar (Stays fixed across entire page on scroll) */}
      <Navbar />

      {/* ========================================================
          1. FIRST SECTION: Single-Screen Hero Viewport (Light Canvas)
      ======================================================== */}
      <section className="h-screen w-full min-h-[700px] relative flex flex-col justify-between overflow-hidden shrink-0 pt-16 sm:pt-20">
        {/* Full-Bleed Panoramic Backgrounds from /heros with Smooth Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {HERO_BACKGROUNDS.map((bg, index) => (
            <div
              key={bg.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentBg ? 'opacity-100 z-1' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={bg.src}
                alt={bg.alt}
                className="w-full h-full object-cover object-center brightness-[1.02] contrast-[1.02]"
              />
            </div>
          ))}

          {/* Luminous Left Vignette for Dark Headline Contrast */}
          <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#FAF8F2]/95 via-[#FAF8F2]/65 to-transparent z-10" />
          {/* Subtle Top & Bottom Light Ambiance */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF8F2]/80 via-[#FAF8F2]/25 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FAF8F2]/95 via-[#FAF8F2]/40 to-transparent z-10" />
        </div>

        {/* Containerized Customer Side Chassis with Left & Right Breathing Space */}
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 relative z-10">
          {/* Hero Section */}
          <HeroSection />

          {/* Background Image Carousel Pagination Indicator */}
          <div className="absolute bottom-2 sm:bottom-3 right-6 sm:right-10 lg:right-14 z-20 hidden md:flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-sm transition-all">
            <span className="text-[10px] font-bold text-slate-600 mr-1 uppercase tracking-wider">
              {currentBg + 1} / {HERO_BACKGROUNDS.length}
            </span>
            {HERO_BACKGROUNDS.map((bg, index) => (
              <button
                key={bg.src}
                type="button"
                onClick={() => setCurrentBg(index)}
                title={bg.alt}
                aria-label={`Switch to hero background ${index + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  index === currentBg
                    ? 'w-5 h-2 bg-[#FF9137] shadow-xs'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SECOND SECTION: Popular Packages, Search Bar & Origami Features
      ======================================================== */}
      <PopularPackagesSection />

      {/* ========================================================
          3. THIRD SECTION: Cosmic Connections & Planetary Horizons
      ======================================================== */}
      <CosmicConnectionsSection />

      {/* ========================================================
          4. FOURTH SECTION: Newsletter Call-To-Action & Master Footer
      ======================================================== */}
      <Footer />
    </div>
  );
}
