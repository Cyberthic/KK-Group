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
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

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
    <footer className="w-full relative bg-[#FAF8F2] text-[#0F172A] overflow-hidden border-t border-slate-200/90 selection:bg-[#70FFD2] selection:text-slate-950 pt-16 lg:pt-24 pb-10">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FFFC8C]/30 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 relative z-10 flex flex-col gap-16 lg:gap-20">
        {/* ========================================================
            1. NEWSLETTER CALL-TO-ACTION CHASSIS (Light Warm Sand Card)
        ======================================================== */}
        <div className="w-full bg-gradient-to-br from-[#FFFDF5] via-[#FFF9E6] to-[#F2FBF7] border border-[#FFCC4D]/40 rounded-3xl sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative overflow-hidden">
          {/* Subtle Background Neo-Mint Tint Accent */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#70FFD2]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Headline & Perks */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#FF9137] rounded-full inline-block" />
                <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.25em] text-[#FF9137] uppercase">
                  {t.stayInformed}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {t.newsletterTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xl mt-1">
                {t.newsletterDesc}
              </p>

              {/* 3 Perks Chips */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <Zap className="w-3.5 h-3.5 text-[#FF9137]" />
                  <span>{t.priority}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF9137]" />
                  <span>{t.verified}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <Clock className="w-3.5 h-3.5 text-[#FF9137]" />
                  <span>{t.notice}</span>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Input Form */}
            <div className="lg:col-span-5 flex flex-col">
              {isSubscribed ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 sm:p-6 text-center space-y-2 shadow-sm animate-in fade-in zoom-in duration-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-950">{t.subscribedTitle}</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {t.subscribedMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                  <div className="relative flex items-center bg-white hover:border-slate-300 border border-slate-200 focus-within:border-[#FF9137] rounded-2xl p-1.5 pl-4 transition-all shadow-sm">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-transparent text-[#0F172A] text-xs sm:text-sm font-medium placeholder:text-slate-400 outline-none pr-3"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#FF9137] hover:bg-[#E57A22] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 cursor-pointer disabled:opacity-60"
                    >
                      <span>{isSubmitting ? '...' : t.subscribeBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-2">
                    {t.spamNotice}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MAIN FOOTER DIRECTORY (4 Columns)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-200/90">
          {/* Col 1: Brand Logo & Company Blurb (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              {/* Wireframe Geometric KK Peak Emblem */}
              <div className="w-8 h-8 relative flex items-center justify-center">
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
                  {language === 'ml' ? 'എന്റർപ്രൈസ് സൊല്യൂഷൻസ്' : 'ENTERPRISE SOLUTIONS'}
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mt-1">
              {t.blurb}
            </p>

            <div className="space-y-2 text-xs text-slate-600 font-medium mt-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#FF9137]" />
                <span>{t.operationsDesk}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#FF9137]" />
                <span>dispatch@kkgroup.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF9137]" />
                <span>{t.centralHQ}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-[#0F172A] mb-1">
              {t.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#services" className="hover:text-[#FF9137] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#FF9137]" />
                  <span>{t.servicesList.cococare}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF9137] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#FF9137]" />
                  <span>{t.servicesList.jcb}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF9137] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#FF9137]" />
                  <span>{t.servicesList.plastering}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF9137] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#FF9137]" />
                  <span>{t.servicesList.tiling}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF9137] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#FF9137]" />
                  <span>{t.servicesList.pipeline}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Portals (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-[#0F172A] mb-1">
              {t.companyTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#about" className="hover:text-[#FF9137] transition-colors">
                  {t.companyList.about}
                </a>
              </li>
              <li>
                <Link href="/office-staff/login" className="hover:text-[#FF9137] transition-colors">
                  {t.companyList.staff}
                </Link>
              </li>
              <li>
                <Link href="/worker/dashboard" className="hover:text-[#FF9137] transition-colors">
                  {t.companyList.worker}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#FF9137] transition-colors">
                  {t.companyList.customer}
                </Link>
              </li>
              <li>
                <a href="#careers" className="hover:text-[#FF9137] transition-colors">
                  {t.companyList.careers}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Deployment Centers (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-[#0F172A] mb-1">
              {t.centersTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="font-bold text-[#0F172A]">{t.palakkadHub}</div>
                <div className="text-[11px] text-slate-500">{t.palakkadSub}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="font-bold text-[#0F172A]">{t.kochiYard}</div>
                <div className="text-[11px] text-slate-500">{t.kochiSub}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. BOTTOM SUB-BAR: Copyright, Legal & Socials
        ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} KK Group Enterprises. {t.rights}</p>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#privacy" className="hover:text-[#FF9137] transition-colors">
              {t.privacy}
            </a>
            <a href="#terms" className="hover:text-[#FF9137] transition-colors">
              {t.terms}
            </a>
            <a href="#safety" className="hover:text-[#FF9137] transition-colors">
              {t.safety}
            </a>
            <a href="#compliance" className="hover:text-[#FF9137] transition-colors">
              {t.compliance}
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="#facebook"
              title="Facebook"
              className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-[#FF9137] hover:bg-[#FFFC8C]/30 flex items-center justify-center text-slate-600 hover:text-[#FF9137] transition-all shadow-xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#instagram"
              title="Instagram"
              className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-[#FF9137] hover:bg-[#FFFC8C]/30 flex items-center justify-center text-slate-600 hover:text-[#FF9137] transition-all shadow-xs"
            >
              <svg className="w-3 h-3 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="#email"
              title="Contact Dispatch"
              className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:border-[#FF9137] hover:bg-[#FFFC8C]/30 flex items-center justify-center text-slate-600 hover:text-[#FF9137] transition-all shadow-xs"
            >
              <Mail className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Faint Massive Watermark */}
        <div className="relative w-full overflow-hidden pointer-events-none mt-2 -mb-8 flex justify-center">
          <span className="text-[54px] sm:text-[90px] md:text-[130px] lg:text-[170px] font-black tracking-[0.2em] uppercase text-black/[0.03] select-none whitespace-nowrap font-sans leading-none">
            KK GROUP
          </span>
        </div>
      </div>
    </footer>
  );
}
