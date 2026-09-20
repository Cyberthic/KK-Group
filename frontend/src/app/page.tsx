'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Home/Navbar';
import { HeroSection } from '@/components/Home/HeroSection';
import { PopularPackagesSection } from '@/components/Home/PopularPackagesSection';
import { CosmicConnectionsSection } from '@/components/Home/CosmicConnectionsSection';
import { Footer } from '@/components/Home/Footer';

export default function HomePage() {

  return (
    <div className="w-full min-h-screen bg-white text-[#0F172A] font-sans antialiased selection:bg-[#8B5CF6] selection:text-white flex flex-col scroll-smooth">
      {/* Fixed Navbar */}
      <Navbar />

      {/* ========================================================
          1. FIRST SECTION: Nexora Hero Section (Clean Light Canvas)
      ======================================================== */}
      <section className="w-full pt-16 sm:pt-20 bg-white relative overflow-visible flex flex-col">
        <HeroSection />
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
