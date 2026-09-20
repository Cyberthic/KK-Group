'use client';

import React, { useState } from 'react';
import {
  Plane,
  Building2,
  Car,
  Ticket,
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Headphones,
  Briefcase,
  MapPin,
  Clock,
  Star,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

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
}

const RAW_PACKAGES: PackageItem[] = [
  {
    id: 'cococare',
    titleEn: 'Cococare Elite Palm Squad (50 Palms)',
    titleMl: 'കൊക്കോ കെയർ പാക്കേജ് (50 തെങ്ങ്)',
    locationEn: 'Palakkad, Kerala',
    locationMl: 'പാലക്കാട്, കേരളം',
    durationEn: 'Full Day Shift',
    durationMl: 'ഫുൾ ഡേ ഷിഫ്റ്റ്',
    price: '₹4,500',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=85',
  },
  {
    id: 'jcb',
    titleEn: 'JCB 3DX Heavy Excavation Squad',
    titleMl: 'ജെസിബി 3DX എക്സ്കവേഷൻ',
    locationEn: 'Ernakulam & Kochi',
    locationMl: 'എറണാകുളം & കൊച്ചി',
    durationEn: '8-Hour Day Shift',
    durationMl: '8 മണിക്കൂർ ഷിഫ്റ്റ്',
    price: '₹9,600',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1579273166629-9e8c3b9b47e2?w=700&auto=format&fit=crop&q=85',
  },
  {
    id: 'plastering',
    titleEn: 'Plastering & Wall Masonry Squad',
    titleMl: 'പ്ലാസ്റ്ററിംഗ് & മേസൺ സംഘം',
    locationEn: 'Thrissur & Malappuram',
    locationMl: 'തൃശ്ശൂർ & മലപ്പുറം',
    durationEn: '4 Workers Squad',
    durationMl: '4 തൊഴിലാളികൾ',
    price: '₹5,800',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=85',
  },
  {
    id: 'tiling',
    titleEn: 'Tile, Marble & Granite Precision Laying',
    titleMl: 'ടൈൽ & മാർബിൾ വർക്ക്',
    locationEn: 'Calicut & Wayanad',
    locationMl: 'കോഴിക്കോട് & വയനാട്',
    durationEn: '3 Master Setters',
    durationMl: '3 വിദഗ്ദ്ധർ',
    price: '₹6,200',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&auto=format&fit=crop&q=85',
  },
];

export function PopularPackagesSection() {
  const { language } = useLanguage();
  const t = translations[language].popularPackages;

  const [activeTab, setActiveTab] = useState<'cococare' | 'jcb' | 'plastering' | 'tiling'>('cococare');
  const [fromLoc, setFromLoc] = useState(language === 'ml' ? 'പാലക്കാട്, കേരളം' : 'Palakkad, Kerala');
  const [toLoc, setToLoc] = useState(language === 'ml' ? 'കൊച്ചി, എറണാകുളം' : 'Kochi, Ernakulam');
  const [departDate, setDepartDate] = useState('12 Jun, 2025');
  const [returnDate, setReturnDate] = useState('20 Jun, 2025');
  const [travelers, setTravelers] = useState(language === 'ml' ? '2-4 തൊഴിലാളികൾ' : 'Standard Squad (2-4)');

  const packages = RAW_PACKAGES.map((pkg) => ({
    id: pkg.id,
    title: language === 'ml' ? pkg.titleMl : pkg.titleEn,
    location: language === 'ml' ? pkg.locationMl : pkg.locationEn,
    duration: language === 'ml' ? pkg.durationMl : pkg.durationEn,
    price: pkg.price,
    rating: pkg.rating,
    image: pkg.image,
  }));

  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  return (
    <section className="w-full relative py-14 lg:py-20 bg-[#FAF8F2] text-[#0F172A] overflow-hidden selection:bg-[#70FFD2] selection:text-slate-950">
      {/* Ambient Warm Facets in Palette Tints (#FFFC8C, #FFCC4D, #70FFD2) */}
      <div className="absolute top-0 right-0 w-[600px] h-[360px] pointer-events-none opacity-30 mix-blend-multiply z-0">
        <svg viewBox="0 0 550 320" fill="none" className="w-full h-full">
          <polygon points="100,0 260,80 180,180" fill="#FFFC8C" opacity="0.6" />
          <polygon points="260,80 420,20 350,140" fill="#FFCC4D" opacity="0.5" />
          <polygon points="420,20 550,0 550,120 450,120" fill="#70FFD2" opacity="0.4" />
          <polygon points="350,140 450,120 550,180 430,240" fill="#FFFC8C" opacity="0.5" />
          <polygon points="180,180 260,80 350,140 280,240" fill="#FFCC4D" opacity="0.4" />
          <polygon points="280,240 350,140 430,240 360,310" fill="#70FFD2" opacity="0.3" />
        </svg>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 relative z-10 flex flex-col gap-10 lg:gap-14">
        {/* ========================================================
            1. TOP HORIZONTAL SEARCH CHASSIS WITH STEPPED TAB
        ======================================================== */}
        <div className="w-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          {/* Top Asymmetric Tabs Bar */}
          <div className="flex items-end pl-2 sm:pl-4 overflow-x-auto">
            {/* Tab 1: Cococare Harvesting */}
            <button
              type="button"
              onClick={() => setActiveTab('cococare')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer relative ${
                activeTab === 'cococare'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <span>🌴 {t.tabs.cococare}</span>
            </button>

            {/* Tab 2: JCB Earthmoving */}
            <button
              type="button"
              onClick={() => setActiveTab('jcb')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer relative ${
                activeTab === 'jcb'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <span>🚜 {t.tabs.jcb}</span>
            </button>

            {/* Tab 3: Masonry & Plastering */}
            <button
              type="button"
              onClick={() => setActiveTab('plastering')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer relative ${
                activeTab === 'plastering'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <span>🧱 {t.tabs.plastering}</span>
            </button>

            {/* Tab 4: Tiling */}
            <button
              type="button"
              onClick={() => setActiveTab('tiling')}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer relative ${
                activeTab === 'tiling'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <span>✨ {t.tabs.tiling}</span>
            </button>
          </div>

          {/* Main White Search Body */}
          <div className="bg-white rounded-3xl rounded-tl-none p-5 sm:p-6 border border-slate-200 shadow-sm relative z-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Origin / Site Location */}
              <div className="md:col-span-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {t.search.locationLabel}
                  </span>
                  <input
                    type="text"
                    value={fromLoc}
                    onChange={(e) => setFromLoc(e.target.value)}
                    className="bg-transparent text-[#0F172A] font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Swap Locations"
                  className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-all shadow-xs cursor-pointer"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#FF9137]" />
                </button>
              </div>

              {/* Destination Area */}
              <div className="md:col-span-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'ml' ? 'മേഖല' : 'Target Region'}
                  </span>
                  <input
                    type="text"
                    value={toLoc}
                    onChange={(e) => setToLoc(e.target.value)}
                    className="bg-transparent text-[#0F172A] font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                  />
                </div>
                <MapPin className="w-4 h-4 text-[#FF9137] shrink-0" />
              </div>

              {/* Deployment Date */}
              <div className="md:col-span-2 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {t.search.dateLabel}
                  </span>
                  <input
                    type="text"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="bg-transparent text-[#0F172A] font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                  />
                </div>
                <Calendar className="w-4 h-4 text-[#FF9137] shrink-0" />
              </div>

              {/* Squad Size & Search Button */}
              <div className="md:col-span-4 flex items-center gap-2">
                {/* Squad Size Dropdown */}
                <div className="flex-1 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-3.5 transition-all cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {t.search.squadLabel}
                    </span>
                    <span className="text-[#0F172A] font-bold text-xs sm:text-sm mt-0.5 whitespace-nowrap">
                      {travelers}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {/* Search Button (#FF9137) */}
                <button
                  type="button"
                  className="bg-[#FF9137] hover:bg-[#FFCC4D] text-white hover:text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {t.search.searchBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MIDDLE ROW: 4 FEATURE TILES
        ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Tile 1 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFC8C]/50 border border-[#FFCC4D]/40 flex items-center justify-center text-[#FF9137] shadow-inner shrink-0 relative overflow-hidden">
              <ShieldCheck className="w-7 h-7 text-[#FF9137]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                {t.features.f1Title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                {t.features.f1Desc}
              </p>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#70FFD2]/25 border border-[#70FFD2]/50 flex items-center justify-center text-emerald-800 shadow-inner shrink-0 relative overflow-hidden">
              <Clock className="w-7 h-7 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                {t.features.f2Title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                {t.features.f2Desc}
              </p>
            </div>
          </div>

          {/* Tile 3 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFC8C]/50 border border-[#FFCC4D]/40 flex items-center justify-center text-[#FF9137] shadow-inner shrink-0 relative overflow-hidden">
              <Briefcase className="w-7 h-7 text-[#FF9137]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                {t.features.f3Title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                {t.features.f3Desc}
              </p>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#70FFD2]/25 border border-[#70FFD2]/50 flex items-center justify-center text-emerald-800 shadow-inner shrink-0 relative overflow-hidden">
              <Headphones className="w-7 h-7 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                {t.features.f4Title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                {t.features.f4Desc}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. BOTTOM SECTION: POPULAR PACKAGES (White Card Frame)
        ======================================================== */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-wider uppercase flex items-center gap-2">
              <span className="w-5 h-[2.5px] bg-[#FF9137] rounded-full inline-block" />
              <span>{t.headline}</span>
            </h3>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-bold text-[#FF9137] hover:underline cursor-pointer group"
            >
              <span>{language === 'ml' ? 'എല്ലാ പാക്കേജുകളും' : 'View All Packages'}</span>
              <div className="w-5 h-5 rounded-full border border-[#FF9137] flex items-center justify-center group-hover:bg-[#FF9137] group-hover:text-white transition-all">
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>
          </div>

          {/* 4 Cards Grid with Signature Top-Right Dog-Ear Fold Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Top-Right Folded Corner */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dog-Ear Fold Accent Top-Right in #FFFC8C & #70FFD2 */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="w-full h-full bg-[#FFFC8C] [clip-path:polygon(0_0,100%_0,100%_100%)] shadow-sm border-b border-l border-[#FFCC4D]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
                      {pkg.title}
                    </h4>

                    {/* Metadata Row: Location & Duration */}
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF9137]" />
                        <span>{pkg.location}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF9137]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Rating Bottom Row */}
                  <div className="flex items-end justify-between pt-2.5 border-t border-slate-100">
                    <div>
                      <div className="text-base sm:text-lg font-black text-[#FF9137] leading-none">
                        {pkg.price}
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        {language === 'ml' ? 'നിശ്ചിത നിരക്ക്' : 'Fixed Rate'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                        <Star className="w-3 h-3 fill-[#FFCC4D] text-[#FFCC4D]" />
                        <span>{pkg.rating}</span>
                      </div>

                      {/* Circular Action Button */}
                      <button
                        type="button"
                        title={t.reserveBtn}
                        className="w-7 h-7 rounded-full bg-[#70FFD2]/30 hover:bg-[#FF9137] text-slate-900 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
