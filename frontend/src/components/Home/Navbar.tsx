'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Globe,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

interface NavbarProps {
  onCartClick?: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].navbar;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs py-3'
          : 'bg-white/90 backdrop-blur-xs py-3.5 sm:py-4'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between">
        {/* Left Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-[#0F172A]">
          <Link
            href="#shop"
            className="hover:text-purple-600 transition-colors tracking-tight"
          >
            {t.shop}
          </Link>
          <Link
            href="#new-in"
            className="hover:text-purple-600 transition-colors tracking-tight"
          >
            {t.newIn}
          </Link>
          <Link
            href="#collections"
            className="hover:text-purple-600 transition-colors tracking-tight"
          >
            {t.collections}
          </Link>
          <Link
            href="#about"
            className="hover:text-purple-600 transition-colors tracking-tight"
          >
            {t.about}
          </Link>
          <Link
            href="#contact"
            className="hover:text-purple-600 transition-colors tracking-tight"
          >
            {t.contact}
          </Link>
        </nav>

        {/* Center Brand Logo: KK Group with Golden Emblem */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 group select-none hover:opacity-95 transition-opacity"
        >
          <img
            src="/logos/logo-bg.png"
            alt="KK Group Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-xs transition-transform group-hover:scale-105"
          />
          <span className="font-black text-lg sm:text-xl md:text-2xl tracking-[0.16em] text-[#0F172A] uppercase">
            {t.brand}
          </span>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Button */}
          <button
            type="button"
            title={t.search}
            aria-label="Search"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-purple-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Profile Avatar Pill */}
          <Link
            href="/dashboard"
            title="Account"
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/90 shadow-xs hover:border-purple-400 transition-all flex items-center justify-center bg-slate-100 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Shopping Cart Pill Button ("1 item") */}
          <button
            type="button"
            onClick={onCartClick}
            aria-label="Shopping Cart"
            className="flex items-center gap-2 bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] text-[#7C3AED] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{t.cartItems}</span>
          </button>

          {/* Bilingual Language Switcher Button (Customer Portal) */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={language === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span
              className={`transition-colors text-[11px] ${
                language === 'en' ? 'text-[#8B5CF6] font-black' : 'opacity-65'
              }`}
            >
              EN
            </span>
            <span className="opacity-25">|</span>
            <span
              className={`transition-colors text-[11px] ${
                language === 'ml' ? 'text-[#8B5CF6] font-black' : 'opacity-65'
              }`}
            >
              മലയാളം
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-800 hover:text-purple-600 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-t border-slate-100 px-6 py-5 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-600">Language / ഭാഷ:</span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] rounded-full px-3 py-1 text-xs font-bold shadow-xs cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#7C3AED]" />
              <span className={language === 'en' ? 'font-black' : ''}>EN</span>
              <span className="opacity-30">|</span>
              <span className={language === 'ml' ? 'font-black' : ''}>മലയാളം</span>
            </button>
          </div>

          <Link
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors py-1"
          >
            {t.shop}
          </Link>
          <Link
            href="#new-in"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors py-1"
          >
            {t.newIn}
          </Link>
          <Link
            href="#collections"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors py-1"
          >
            {t.collections}
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors py-1"
          >
            {t.about}
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors py-1"
          >
            {t.contact}
          </Link>
        </div>
      )}
    </header>
  );
}
