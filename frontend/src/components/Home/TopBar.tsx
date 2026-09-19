'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { getDashboardRoute } from '@/lib/auth-routes';
import { User, MessageSquare, Menu, X, LayoutDashboard, Sparkles } from 'lucide-react';

interface TopBarProps {
  setShowPortalModal: (show: boolean) => void;
  onOpenEnquiry?: () => void;
}

export function TopBar({ setShowPortalModal, onOpenEnquiry }: TopBarProps) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 ${
        scrolled
          ? 'bg-[#07190f]/90 backdrop-blur-xl border-b border-emerald-900/40 shadow-2xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name (Left) */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full bg-[#00754a] border-2 border-emerald-400/40 p-1 flex items-center justify-center shadow-lg shadow-emerald-950 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
            <Image 
              src="/logos/logo-bg.png" 
              alt="KK Group Logo" 
              fill 
              className="object-contain p-1" 
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-lg tracking-wider leading-none uppercase font-sans drop-shadow-md">
              KK GROUP
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase mt-0.5">
              Multi-Services
            </span>
          </div>
        </Link>

        {/* Floating White Pill Navigation Menu (Center) - Matches Image */}
        <nav className="hidden md:flex items-center bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] px-7 py-2.5 rounded-full border border-white/40 gap-7 text-xs font-bold tracking-wide text-zinc-800">
          <Link
            href="/"
            className="text-[#00754a] hover:text-emerald-700 transition-colors uppercase"
          >
            Home
          </Link>
          <a
            href="#services"
            className="hover:text-[#00754a] transition-colors uppercase text-zinc-600"
          >
            Services
          </a>
          <a
            href="#popular"
            className="hover:text-[#00754a] transition-colors uppercase text-zinc-600"
          >
            Popular
          </a>
          <a
            href="#branches"
            className="hover:text-[#00754a] transition-colors uppercase text-zinc-600"
          >
            Branches
          </a>
          <button
            onClick={() => setShowPortalModal(true)}
            className="hover:text-[#00754a] transition-colors uppercase text-zinc-600 flex items-center gap-1"
          >
            <span>Portals</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </button>
          <a
            href="#contact"
            className="hover:text-[#00754a] transition-colors uppercase text-zinc-600"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Icons (User + Action Trigger) */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <Link
              href={getDashboardRoute(user.role)}
              className="flex items-center gap-2 bg-[#00754a] hover:bg-[#00875a] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg shadow-emerald-950 transition-all active:scale-95 border border-emerald-400/30"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          ) : (
            <button
              onClick={() => setShowPortalModal(true)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
              title="Portals & Login"
            >
              <User className="w-4 h-4" />
            </button>
          )}

          {/* Quick Consultation Trigger / Chat Pill */}
          <button
            onClick={onOpenEnquiry || (() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="w-10 h-10 rounded-full bg-[#00754a] hover:bg-[#00875a] border border-emerald-300/40 text-white flex items-center justify-center shadow-lg shadow-emerald-950 transition-all duration-200 active:scale-95"
            title="Enquire Now"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-all"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-[#0a2318] border border-emerald-800/60 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-white/90">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-emerald-900/50 text-emerald-300"
            >
              Home
            </Link>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5"
            >
              Services
            </a>
            <a
              href="#popular"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5"
            >
              Popular
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5"
            >
              Branches
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowPortalModal(true);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-white/5 text-amber-300 flex items-center justify-between"
            >
              <span>Portals & Login</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-emerald-400 font-bold"
            >
              Contact Us &rarr;
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
