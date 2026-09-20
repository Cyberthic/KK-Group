'use client';

import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/utils/translations';
import { StylishDropdown } from '@/components/Common/StylishDropdown';

interface PackageItem {
  id: string;
  titleEn: string;
  titleMl: string;
  locationEn: string;
  locationMl: string;
  durationEn: string;
  durationMl: string;
  price: string;
  rating: string;
  image: string;
  tagEn: string;
  tagMl: string;
}

const RAW_PACKAGES: PackageItem[] = [
  {
    id: 'cococare',
    titleEn: 'Cococare Elite Palm Squad (50 Palms)',
    titleMl: 'കൊക്കോ കെയർ പാക്കേജ് (50 തെങ്ങ്)',
    locationEn: 'Palakkad, Kerala • Full Day',
    locationMl: 'പാലക്കാട്, കേരളം • ഫുൾ ഡേ',
    durationEn: '4 Certified Climbers',
    durationMl: '4 വിദഗ്ദ്ധ തൊഴിലാളികൾ',
    price: '₹4,500',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=85',
    tagEn: 'Agriculture',
    tagMl: 'കൃഷി',
  },
  {
    id: 'jcb',
    titleEn: 'JCB 3DX Heavy Excavation Squad',
    titleMl: 'ജെസിബി 3DX എക്സ്കവേഷൻ',
    locationEn: 'Ernakulam & Kochi • 8h Shift',
    locationMl: 'എറണാകുളം & കൊച്ചി • 8 മണിക്കൂർ',
    durationEn: 'Heavy Machine + Pilot',
    durationMl: 'മെഷീൻ + പൈലറ്റ്',
    price: '₹9,600',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1579273166629-9e8c3b9b47e2?w=700&auto=format&fit=crop&q=85',
    tagEn: 'Machinery',
    tagMl: 'മെഷിനറി',
  },
  {
    id: 'plastering',
    titleEn: 'Plastering & Wall Masonry Squad',
    titleMl: 'പ്ലാസ്റ്ററിംഗ് & മേസൺ സംഘം',
    locationEn: 'Thrissur & Malappuram • 4 Workers',
    locationMl: 'തൃശ്ശൂർ & മലപ്പുറം • 4 തൊഴിലാളികൾ',
    durationEn: '4 Craft Operatives',
    durationMl: '4 ക്രാഫ്റ്റ് വിദഗ്ദ്ധർ',
    price: '₹5,800',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=85',
    tagEn: 'Construction',
    tagMl: 'നിർമ്മാണം',
  },
  {
    id: 'tiling',
    titleEn: 'Tile, Marble & Granite Precision Laying',
    titleMl: 'ടൈൽ & മാർബിൾ പ്രിസിഷൻ വർക്ക്',
    locationEn: 'Calicut & Wayanad • 3 Technicians',
    locationMl: 'കോഴിക്കോട് & വയനാട് • 3 വിദഗ്ദ്ധർ',
    durationEn: '3 Master Setters',
    durationMl: '3 മാസ്റ്റർ വിദഗ്ദ്ധർ',
    price: '₹6,200',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&auto=format&fit=crop&q=85',
    tagEn: 'Finishing',
    tagMl: 'ഫിനിഷിംഗ്',
  },
];

interface PopularPackagesSectionProps {
  onSelectPackage?: (packageName: string) => void;
}

export function PopularPackagesSection({ onSelectPackage }: PopularPackagesSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].popularPackages;

  const [activeTab, setActiveTab] = useState<'all' | 'cococare' | 'jcb' | 'plastering' | 'tiling'>('all');
  const [district, setDistrict] = useState('Palakkad');
  const [executionDate, setExecutionDate] = useState('Immediate / Next 48h');
  const [squadScale, setSquadScale] = useState('Standard Squad (2-4)');

  const filteredPackages = RAW_PACKAGES.filter((pkg) => {
    if (activeTab === 'all') return true;
    return pkg.id === activeTab;
  });

  return (
    <section className="w-full relative py-16 lg:py-24 bg-white text-[#0F172A] overflow-hidden selection:bg-[#2A835F] selection:text-white">
      {/* Subtle Ambient Emerald Glow in Background */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EBF6F1]/60 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[#2A835F]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col gap-10 lg:gap-14">
        {/* ========================================================
            1. SECTION HEADER: Cinematic Bilingual Title
        ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
          <div className="flex flex-col">
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#2A835F] uppercase mb-2">
              <svg viewBox="0 0 24 24" fill="#2A835F" className="w-4 h-4 text-[#2A835F] shrink-0">
                <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
              </svg>
              <span>{t.badge}</span>
            </div>

            {/* Main Headline */}
            <h2
              className={`font-black text-[#0F172A] tracking-tight uppercase ${
                language === 'ml'
                  ? 'text-2xl sm:text-4xl lg:text-[42px] leading-tight'
                  : 'text-3xl sm:text-5xl lg:text-[48px] leading-[1.05]'
              }`}
              style={{
                fontFamily:
                  language === 'ml' ? 'var(--font-anek-malayalam)' : undefined,
              }}
            >
              {t.headline}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 font-semibold text-xs sm:text-sm lg:text-base max-w-2xl mt-2 leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-[#EBF6F1] border border-[#C3E6D5] rounded-2xl p-3 px-5 w-fit shrink-0 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A835F] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase text-[#2A835F] tracking-wider">
                {language === 'ml' ? 'തത്സമയ ലഭ്യത' : 'Live Fleet Status'}
              </span>
              <span className="text-xs font-bold text-slate-800">
                {language === 'ml' ? '14 ജില്ലകളിലും സുസജ്ജം' : 'Active Across 14 Districts'}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. INTERACTIVE FILTER TABS & SEARCH CHASSIS
        ======================================================== */}
        <div className="w-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
          {/* Filter Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: language === 'ml' ? 'എല്ലാ പാക്കേജുകളും' : 'All Packages' },
              { id: 'cococare', label: `🌴 ${t.tabs.cococare}` },
              { id: 'jcb', label: `🚜 ${t.tabs.jcb}` },
              { id: 'plastering', label: `🧱 ${t.tabs.plastering}` },
              { id: 'tiling', label: `✨ ${t.tabs.tiling}` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeTab === tab.id
                    ? 'bg-[#2A835F] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Card Chassis */}
          <div className="mt-3 bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border-2 border-slate-200/80 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Field 1: District */}
              <div className="md:col-span-4 flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl p-3 px-4 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#2A835F]" />
                </div>
                <div className="flex flex-col w-full min-w-0">
                  <StylishDropdown
                    options={[
                      { id: 'Palakkad', label: language === 'ml' ? 'പാലക്കാട്' : 'Palakkad Division', badge: 'Active' },
                      { id: 'Ernakulam & Kochi', label: language === 'ml' ? 'എറണാകുളം & കൊച്ചി' : 'Ernakulam & Kochi', badge: 'Active' },
                      { id: 'Thrissur', label: language === 'ml' ? 'തൃശ്ശൂർ' : 'Thrissur Division' },
                      { id: 'Malappuram', label: language === 'ml' ? 'മലപ്പുറം' : 'Malappuram Division' },
                      { id: 'Calicut (Kozhikode)', label: language === 'ml' ? 'കോഴിക്കോട്' : 'Calicut Division' },
                      { id: 'Wayanad', label: language === 'ml' ? 'വയനാട്' : 'Wayanad Division' },
                      { id: 'Kannur', label: language === 'ml' ? 'കണ്ണൂർ' : 'Kannur Division' },
                      { id: 'Kottayam', label: language === 'ml' ? 'കോട്ടയം' : 'Kottayam Division' },
                      { id: 'Alappuzha', label: language === 'ml' ? 'ആലപ്പുഴ' : 'Alappuzha Division' },
                      { id: 'Trivandrum', label: language === 'ml' ? 'തിരുവനന്തപുരം' : 'Trivandrum Central' },
                    ]}
                    value={district}
                    onChange={setDistrict}
                    label={t.search.locationLabel}
                    variant="inline"
                  />
                </div>
              </div>

              {/* Field 2: Date */}
              <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl p-3 px-4 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#2A835F]" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    {t.search.dateLabel}
                  </span>
                  <input
                    type="text"
                    value={executionDate}
                    onChange={(e) => setExecutionDate(e.target.value)}
                    placeholder="Immediate / Date"
                    className="bg-transparent text-slate-900 font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                  />
                </div>
              </div>

              {/* Field 3: Squad Scale */}
              <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl p-3 px-4 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-[#2A835F]" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    {t.search.squadLabel}
                  </span>
                  <span className="text-slate-900 font-bold text-xs sm:text-sm mt-0.5 truncate">
                    {squadScale}
                  </span>
                </div>
              </div>

              {/* CTA Search Button */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => onSelectPackage?.('General Squad Query')}
                  className="w-full bg-[#2A835F] hover:bg-[#236D4F] text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>{t.search.searchBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. PACKAGE CARDS GRID (Luxury Dark-Glass / Card Aesthetic)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => {
            const title = language === 'ml' ? pkg.titleMl : pkg.titleEn;
            const location = language === 'ml' ? pkg.locationMl : pkg.locationEn;
            const duration = language === 'ml' ? pkg.durationMl : pkg.durationEn;
            const tag = language === 'ml' ? pkg.tagMl : pkg.tagEn;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-[28px] sm:rounded-[32px] border-2 border-slate-200/80 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                {/* Card Image Stage */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="bg-white/90 backdrop-blur-md text-[#2A835F] px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm">
                      {tag}
                    </span>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{pkg.rating}</span>
                    </div>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-white/90 truncate block">
                      {location}
                    </span>
                  </div>
                </div>

                {/* Card Content Stage */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-[#2A835F] transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-[#2A835F]" />
                      <span>{duration}</span>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {t.from}
                      </span>
                      <span className="text-xl font-black text-[#2A835F]">
                        {pkg.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPackage?.(title)}
                      className="bg-[#0F172A] group-hover:bg-[#2A835F] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>{t.reserveBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            4. FOUR PERKS BANNER (Emerald Tints & Clean Vectors)
        ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {[
            {
              icon: ShieldCheck,
              title: t.features.f1Title,
              desc: t.features.f1Desc,
            },
            {
              icon: Clock,
              title: t.features.f2Title,
              desc: t.features.f2Desc,
            },
            {
              icon: CheckCircle2,
              title: t.features.f3Title,
              desc: t.features.f3Desc,
            },
            {
              icon: Briefcase,
              title: t.features.f4Title,
              desc: t.features.f4Desc,
            },
          ].map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7FCF9] border border-[#C3E6D5] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF6F1] flex items-center justify-center shrink-0 border border-[#C3E6D5]/60">
                  <IconComponent className="w-5 h-5 text-[#2A835F]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {f.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
