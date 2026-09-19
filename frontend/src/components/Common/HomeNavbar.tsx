'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { getDashboardRoute } from '@/lib/auth-routes';
import { ChevronDown, Phone, ArrowRight, Menu, X, LayoutDashboard } from 'lucide-react';

interface HomeNavbarProps {
  setShowPortalModal: (show: boolean) => void;
}

export function HomeNavbar({ setShowPortalModal }: HomeNavbarProps) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-black/20 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image src="/logos/logo-bg.png" alt="KK Group Logo" fill className="object-contain" />
              </div>
              <span className="text-white font-bold text-base tracking-tight leading-none drop-shadow-sm">
                KK Group
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/85">
              <Link
                href="/"
                className="text-white font-semibold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[2px] after:bg-emerald-400 after:rounded-full"
              >
                Home
              </Link>
              <a href="#about-us" className="hover:text-white transition-colors duration-150">
                About
              </a>
              <a href="#services" className="hover:text-white transition-colors duration-150">
                Services
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors duration-150">
                How We Work
              </a>
              <a href="#testimonials" className="hover:text-white transition-colors duration-150">
                Testimonials
              </a>
              <button
                onClick={() => setShowPortalModal(true)}
                className="flex items-center gap-1 hover:text-emerald-300 transition-colors duration-150 group"
              >
                <span>Pages</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-emerald-300 transition-transform group-hover:translate-y-0.5" />
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Phone — hidden on small screens */}
              <a
                href="tel:+17857126532"
                className="hidden md:flex items-center gap-2 mr-1 group"
              >
                <div className="w-7 h-7 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="text-left leading-none">
                  <p className="text-[10px] text-white/60 font-medium">Call Now</p>
                  <p className="text-xs font-bold text-white">(785) 712-6532</p>
                </div>
              </a>

              {/* CTA */}
              {isAuthenticated && user ? (
                <Link
                  href={getDashboardRoute(user.role)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-emerald-500/30 active:scale-95"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <button
                  onClick={() => setShowPortalModal(true)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-emerald-500/30 active:scale-95"
                >
                  <span>Portals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-all duration-200"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-emerald-400"
              >
                Home
              </Link>
              <a
                href="#about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                About
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); setShowPortalModal(true); }}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Enterprise Portals
              </button>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                How We Work
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Testimonials
              </a>
              <div className="pt-3 mt-3 border-t border-white/10">
                <a
                  href="tel:+17857126532"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-300 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (785) 712-6532</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
