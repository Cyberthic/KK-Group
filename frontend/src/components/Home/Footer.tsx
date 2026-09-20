'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/utils/translations';

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 600);
  };

  return (
    <footer className="w-full relative bg-slate-950 text-white overflow-hidden border-t border-slate-800/80 selection:bg-[#2A835F] selection:text-white pt-16 lg:pt-24 pb-12">
      {/* Subtle Top Ambient Emerald Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#2A835F]/10 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col gap-14 lg:gap-18">
        {/* ========================================================
            1. NEWSLETTER / PRIORITY DISPATCH BENTO CHASSIS
        ======================================================== */}
        <div className="w-full bg-slate-900/90 border border-slate-800/80 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow Inside Card */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#2A835F]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Headline & Perks */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#2A835F] uppercase bg-[#EBF6F1]/10 px-3 py-1 rounded-full border border-[#2A835F]/30 w-fit">
                <svg viewBox="0 0 24 24" fill="#2A835F" className="w-3.5 h-3.5 text-[#2A835F]">
                  <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                </svg>
                <span>{t.stayInformed}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.newsletterTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl mt-1">
                {t.newsletterDesc}
              </p>

              {/* 3 Perks Chips */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <Zap className="w-4 h-4 text-[#2A835F]" />
                  <span>{t.priority}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#2A835F]" />
                  <span>{t.verified}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <Clock className="w-4 h-4 text-[#2A835F]" />
                  <span>{t.notice}</span>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Input Form */}
            <div className="lg:col-span-5 flex flex-col">
              {isSubscribed ? (
                <div className="bg-[#EBF6F1]/10 border border-[#2A835F]/40 rounded-2xl p-5 sm:p-6 text-center space-y-2 shadow-sm animate-in fade-in zoom-in duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#2A835F] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{t.subscribedTitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.subscribedMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                  <div className="relative flex items-center bg-slate-950 border border-slate-800 focus-within:border-[#2A835F] rounded-2xl p-1.5 pl-4 transition-all shadow-inner">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-transparent text-white text-xs sm:text-sm font-medium outline-none placeholder:text-slate-500 pr-2"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#2A835F] hover:bg-[#236D4F] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? '...' : t.subscribeBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 pl-2">
                    {t.spamNotice}
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MASTER BRANDING & DIRECTORY NAVIGATION
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-4">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <img
                src="/logos/named-logo-bg.png"
                alt="KK Group Logo"
                className="h-9 sm:h-10 w-auto object-contain brightness-110"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              {t.blurb}
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2A835F] shrink-0" />
                <span>{t.operationsDesk}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2A835F] shrink-0" />
                <span>{t.centralHQ}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Specialized Services */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-black tracking-widest text-[#2A835F] uppercase mb-1">
              {t.servicesTitle}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-400">
              {Object.entries(t.servicesList).map(([key, val]) => (
                <li key={key}>
                  <Link
                    href={`/services#${key}`}
                    className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#2A835F]" />
                    <span>{val}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals & Roles */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black tracking-widest text-[#2A835F] uppercase mb-1">
              {t.companyTitle}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  {t.companyList.customer}
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  {t.companyList.worker}
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  {t.companyList.staff}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.companyList.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Regional Deployment Hubs */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-black tracking-widest text-[#2A835F] uppercase mb-1">
              {language === 'ml' ? 'റീജിയണൽ ഹബ്ബുകൾ' : 'Regional Hubs'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ml'
                ? 'പാലക്കാട്, എറണാകുളം, തൃശ്ശൂർ, കോഴിക്കോട് ഡിവിഷനുകളിൽ ഉടനടി ലഭ്യമായ സേവന ശൃംഖല.'
                : 'Primary coordination centers operating round the clock across Palakkad, Ernakulam, Thrissur, Calicut, and Southern divisions.'}
            </p>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl mt-2 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A835F] animate-ping" />
              <span className="text-xs font-bold text-slate-200">
                {language === 'ml' ? 'ഓപ്പറേഷൻസ് കൺട്രോൾ റൂം സജീവം' : 'Central Control Active'}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. BOTTOM LEGAL / COPYRIGHT BAR
        ======================================================== */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-slate-500">
          <span>
            © {new Date().getFullYear()} KK Group Operations Ltd. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">
              Security Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
