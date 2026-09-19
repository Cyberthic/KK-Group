'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Globe,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  onPlanTrip?: () => void;
}

export function Navbar({ onPlanTrip }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#FAF8F2]/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.05)] py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 flex items-center justify-between">
        {/* Brand Logo: KK Group */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          {/* Wireframe Geometric KK Peak Emblem in #FF9137 and #70FFD2 */}
          <div className="w-8 h-8 relative flex items-center justify-center text-[#FF9137]">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M3 25L13 7L23 25H3Z"
                stroke="#FF9137"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 25L23 14L29 25H17Z"
                stroke="#70FFD2"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 7L17 25"
                stroke="#FFCC4D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="2 2"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-widest text-[#0F172A] uppercase leading-none font-sans">
              KK GROUP
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#FF9137] font-extrabold tracking-[0.2em] uppercase mt-0.5">
              ENTERPRISE SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-1 hover:text-[#FF9137] transition-colors cursor-pointer group">
            <span>Destinations</span>
            <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-[#FF9137] transition-colors" />
          </div>

          <div className="flex items-center gap-1 hover:text-[#FF9137] transition-colors cursor-pointer group">
            <span>Experiences</span>
            <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-[#FF9137] transition-colors" />
          </div>

          <Link href="#trips" className="hover:text-[#FF9137] transition-colors">
            Trips
          </Link>

          <Link href="#about" className="hover:text-[#FF9137] transition-colors">
            About Us
          </Link>

          <Link
            href="/office-staff/login"
            className="hover:text-[#FF9137] text-slate-700 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF9137]" />
            <span>Staff Portal</span>
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Ghost Button */}
          <button
            title="Search"
            type="button"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-700 hover:text-[#0F172A] transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Language Selector */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-800 hover:text-[#FF9137] py-1 px-2 rounded-lg hover:bg-black/5 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {/* Primary Warm Sunset CTA: Plan Your Trip (#FF9137) */}
          <button
            type="button"
            onClick={onPlanTrip}
            className="hidden sm:flex bg-[#FF9137] hover:bg-[#FFCC4D] text-white hover:text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full shadow-md items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-800 hover:text-[#FF9137] transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FAF8F2]/98 border-t border-slate-200/80 px-6 py-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="#destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 hover:text-[#FF9137] transition-colors py-1 border-b border-slate-100"
          >
            Destinations
          </Link>
          <Link
            href="#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 hover:text-[#FF9137] transition-colors py-1 border-b border-slate-100"
          >
            Experiences
          </Link>
          <Link
            href="#trips"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 hover:text-[#FF9137] transition-colors py-1 border-b border-slate-100"
          >
            Trips
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 hover:text-[#FF9137] transition-colors py-1 border-b border-slate-100"
          >
            About Us
          </Link>
          <Link
            href="/office-staff/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-[#FF9137] flex items-center gap-1.5 py-1"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Staff Portal Login</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onPlanTrip?.();
            }}
            className="w-full mt-2 bg-[#FF9137] hover:bg-[#FFCC4D] text-white hover:text-slate-950 font-bold text-xs py-3 rounded-full shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
}
