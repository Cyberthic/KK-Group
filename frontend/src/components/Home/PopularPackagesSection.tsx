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

interface PackageItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: string;
  image: string;
}

const PACKAGES: PackageItem[] = [
  {
    id: 'greek-islands',
    title: 'Greek Islands Escape',
    location: 'Greece',
    duration: '6 Days / 5 Nights',
    price: '$1,299',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&auto=format&fit=crop&q=85',
  },
  {
    id: 'maldives',
    title: 'Maldives Paradise',
    location: 'Maldives',
    duration: '5 Days / 4 Nights',
    price: '$1,599',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&auto=format&fit=crop&q=85',
  },
  {
    id: 'canadian-rockies',
    title: 'Canadian Rockies',
    location: 'Canada',
    duration: '7 Days / 6 Nights',
    price: '$1,799',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=700&auto=format&fit=crop&q=85',
  },
  {
    id: 'japan-discovery',
    title: 'Japan Discovery',
    location: 'Japan',
    duration: '8 Days / 7 Nights',
    price: '$2,199',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&auto=format&fit=crop&q=85',
  },
];

export function PopularPackagesSection() {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cars' | 'experiences'>('flights');
  const [fromLoc, setFromLoc] = useState('New York, USA');
  const [toLoc, setToLoc] = useState('Paris, France');
  const [departDate, setDepartDate] = useState('12 Jun, 2025');
  const [returnDate, setReturnDate] = useState('20 Jun, 2025');
  const [travelers, setTravelers] = useState('2 Adults');

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
          <div className="flex items-end pl-2 sm:pl-4">
            {/* Tab 1: Flights (Active) */}
            <button
              type="button"
              onClick={() => setActiveTab('flights')}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all relative ${
                activeTab === 'flights'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <Plane className={`w-4 h-4 ${activeTab === 'flights' ? 'text-[#FF9137]' : 'text-slate-500'}`} />
              <span>Flights</span>
            </button>

            {/* Tab 2: Hotels */}
            <button
              type="button"
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'hotels'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Hotels</span>
            </button>

            {/* Tab 3: Cars */}
            <button
              type="button"
              onClick={() => setActiveTab('cars')}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'cars'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <Car className="w-4 h-4 text-slate-500" />
              <span>Cars</span>
            </button>

            {/* Tab 4: Experiences */}
            <button
              type="button"
              onClick={() => setActiveTab('experiences')}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'experiences'
                  ? 'bg-white text-[#FF9137] border-t border-x border-slate-200 z-10 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-t border-x border-transparent'
              }`}
            >
              <Ticket className="w-4 h-4 text-slate-500" />
              <span>Experiences</span>
            </button>
          </div>

          {/* Main White Card Form Body */}
          <div className="bg-white rounded-3xl rounded-tl-none p-4 sm:p-6 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 items-center">
              {/* From */}
              <div className="md:col-span-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <div className="flex flex-col w-full pr-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">From</span>
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
                  className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#FF9137] hover:bg-[#FFFC8C]/40 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* To */}
              <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">To</span>
                <input
                  type="text"
                  value={toLoc}
                  onChange={(e) => setToLoc(e.target.value)}
                  className="bg-transparent text-[#0F172A] font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                />
              </div>

              {/* Depart */}
              <div className="md:col-span-2 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Depart</span>
                  <input
                    type="text"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="bg-transparent text-[#0F172A] font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                  />
                </div>
                <Calendar className="w-4 h-4 text-[#FF9137] shrink-0" />
              </div>

              {/* Return */}
              <div className="md:col-span-2 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-4 transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Return</span>
                  <input
                    type="text"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="bg-transparent text-[#0F172A] font-bold text-xs sm:text-sm outline-none w-full mt-0.5"
                  />
                </div>
                <Calendar className="w-4 h-4 text-[#FF9137] shrink-0" />
              </div>

              {/* Travelers & Search Button */}
              <div className="md:col-span-2 flex items-center gap-2">
                {/* Travelers Dropdown */}
                <div className="flex-1 flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl p-3 px-3.5 transition-all cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Travelers</span>
                    <span className="text-[#0F172A] font-bold text-xs sm:text-sm mt-0.5 whitespace-nowrap">
                      {travelers}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {/* Search Button (#FF9137) */}
                <button
                  type="button"
                  className="bg-[#FF9137] hover:bg-[#FFCC4D] text-white hover:text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MIDDLE ROW: 4 ORIGAMI STYLE FEATURE TILES
        ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Tile 1 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFC8C]/50 border border-[#FFCC4D]/40 flex items-center justify-center text-[#FF9137] shadow-inner shrink-0 relative overflow-hidden">
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <polygon points="6,20 34,8 24,34 18,22" fill="#FF9137" />
                <polygon points="18,22 34,8 24,34" fill="#FFCC4D" opacity="0.8" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                Best Price Guarantee
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                Get the best deals or we match it.
              </p>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#70FFD2]/25 border border-[#70FFD2]/50 flex items-center justify-center text-emerald-800 shadow-inner shrink-0 relative overflow-hidden">
              <ShieldCheck className="w-7 h-7 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                Secure Booking
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                Your data is safe with us.
              </p>
            </div>
          </div>

          {/* Tile 3 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFC8C]/50 border border-[#FFCC4D]/40 flex items-center justify-center text-[#FF9137] shadow-inner shrink-0 relative overflow-hidden">
              <Headphones className="w-7 h-7 text-[#FF9137]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                24/7 Customer Support
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                We're here to help, anytime.
              </p>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex items-center gap-4 shadow-sm hover:border-[#FF9137]/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#70FFD2]/25 border border-[#70FFD2]/50 flex items-center justify-center text-emerald-800 shadow-inner shrink-0 relative overflow-hidden">
              <Briefcase className="w-7 h-7 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-tight">
                Custom Travel Packages
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                Tailored experiences just for you.
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
              <span>Popular Packages</span>
            </h3>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-bold text-[#FF9137] hover:underline cursor-pointer group"
            >
              <span>View All Packages</span>
              <div className="w-5 h-5 rounded-full border border-[#FF9137] flex items-center justify-center group-hover:bg-[#FF9137] group-hover:text-white transition-all">
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>
          </div>

          {/* 4 Cards Grid with Signature Top-Right Dog-Ear Fold Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGES.map((pkg) => (
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
                        Per Person
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
