'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { getDashboardRoute } from '@/lib/auth-routes';
import { ChevronDown, Phone, ArrowRight, Menu, X } from 'lucide-react';

interface HomeNavbarProps {
  setShowPortalModal: (show: boolean) => void;
}

export function HomeNavbar({ setShowPortalModal }: HomeNavbarProps) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Glassy Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex items-center justify-between px-5 sm:px-8 py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-all duration-300">
        {/* Brand Pill / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-2 rounded-full transition-all duration-200 group"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm font-bold text-xs group-hover:scale-105 transition-transform">
            KK
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base sm:text-lg tracking-tight leading-none">
              KK Group
            </span>
            <span className="text-[10px] text-emerald-300 font-medium tracking-wide uppercase">
              Field & Lawn Care
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
          <Link
            href="/"
            className="text-white font-semibold relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-emerald-400 after:rounded-full"
          >
            Home
          </Link>
          <a href="#about-us" className="hover:text-emerald-300 transition-colors">
            About
          </a>
          <button
            onClick={() => setShowPortalModal(true)}
            className="flex items-center gap-1 hover:text-emerald-300 transition-colors group"
          >
            <span>Pages</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/70 group-hover:text-emerald-300 transition-transform group-hover:translate-y-0.5" />
          </button>
          <a href="#services" className="hover:text-emerald-300 transition-colors">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-emerald-300 transition-colors">
            How We Works
          </a>
          <a href="#testimonials" className="hover:text-emerald-300 transition-colors">
            Testimonials
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Phone Pill */}
          <a
            href="tel:+17857126532"
            className="hidden sm:flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-4 py-2 rounded-full transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-white text-[#16a34a] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4 fill-[#16a34a]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-white/75 font-medium leading-none">Call Now</p>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">
                (785) 712-6532
              </p>
            </div>
          </a>

          {/* Role Portal / Dashboard Action */}
          {isAuthenticated && user ? (
            <Link
              href={getDashboardRoute(user.role)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Dashboard ({user.role})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              onClick={() => setShowPortalModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
            >
              Portals
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] lg:hidden z-40 p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 text-white space-y-3 animate-in fade-in duration-200 shadow-2xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-emerald-400 py-1"
          >
            Home
          </Link>
          <a
            href="#about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1"
          >
            About
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setShowPortalModal(true);
            }}
            className="block text-left w-full text-white/90 hover:text-white py-1"
          >
            Enterprise Portals
          </button>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1"
          >
            How We Works
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1"
          >
            Testimonials
          </a>
          <div className="pt-2 border-t border-white/10">
            <a
              href="tel:+17857126532"
              className="flex items-center gap-2 text-sm text-emerald-300 font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Call (785) 712-6532</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
