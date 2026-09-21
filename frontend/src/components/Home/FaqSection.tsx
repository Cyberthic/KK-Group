'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Phone,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/utils/translations';

interface FaqSectionProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

export function FaqSection({ onOpenEnquiry }: FaqSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full relative py-16 lg:py-24 bg-white text-[#0F172A] overflow-hidden selection:bg-[#2A835F] selection:text-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col gap-12 lg:gap-16">
        {/* ========================================================
            HEADER: Kicker, Sparkle Star, Title & Subtitle
        ======================================================== */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Kicker Pill with Standard 4-Pointed Sparkle Star */}
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#2A835F] uppercase mb-4 bg-[#EBF6F1] px-4 py-1.5 rounded-full border border-[#C3E6D5]">
            <svg viewBox="0 0 24 24" fill="#2A835F" className="w-3.5 h-3.5 text-[#2A835F]">
              <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
            </svg>
            <span>{t.kicker}</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] uppercase tracking-tight ${
              language === 'ml' ? 'leading-tight' : 'leading-tight'
            }`}
            style={{
              fontFamily: language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
            }}
          >
            {t.title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mt-4">
            {t.subtitle}
          </p>
        </div>

        {/* ========================================================
            CONTENT: Interactive FAQ Accordion + Quick Help Sidebar
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT 8 COLS: Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-3.5">
            {t.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-slate-50/80 border-[#2A835F]/40 shadow-md ring-1 ring-[#2A835F]/15'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#2A835F] text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-[#0F172A]' : 'text-slate-800'
                        } ${language === 'ml' ? 'leading-snug' : ''}`}
                        style={{
                          fontFamily: language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
                        }}
                      >
                        {item.q}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#EBF6F1] text-[#2A835F]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-200/60 mt-1 pl-[52px] sm:pl-[60px]">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT 4 COLS: Operations Help Card */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
            {/* 24/7 Operations Support Bento Card */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between gap-6">
              {/* Emerald Ambient Corner Accent */}
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#2A835F]/25 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest text-[#2A835F] uppercase bg-[#EBF6F1]/10 px-3 py-1 rounded-full border border-[#2A835F]/30 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#2A835F] animate-pulse" />
                  <span>24/7 Dispatch Desk</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                  {language === 'ml' ? 'പ്രത്യേക സഹായം ആവശ്യമുണ്ടോ?' : 'Need Custom Squad Dispatch?'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {language === 'ml'
                    ? 'വലിയ പ്രോജക്ടുകൾക്കും മെഷിനറി ആവശ്യങ്ങൾക്കും ഞങ്ങളുടെ ഓപ്പറേഷൻസ് ടീമുമായി നേരിട്ട് സംസാരിക്കാം.'
                    : 'Speak directly with our field coordinators for bulk estate packages, specialized earthmoving, or urgent site mobilizations.'}
                </p>

                {/* Direct Phone Bar */}
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3 mt-2">
                  <div className="w-9 h-9 rounded-xl bg-[#2A835F] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Hotline
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white tracking-wide font-mono">
                      +91 (785) 712-6532
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onOpenEnquiry?.('Custom Operations Enquiry')}
                className="relative z-10 w-full bg-[#2A835F] hover:bg-[#236D4F] text-white py-3.5 px-5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>{t.contactAction}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Assurance Badges */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2A835F]" />
                <span>100% Verified Crew</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2A835F]" />
                <span>15-Min Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
