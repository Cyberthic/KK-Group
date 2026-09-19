'use client';

import React from 'react';
import { MapPin, Phone, CheckCircle2, ChevronRight } from 'lucide-react';
import { RibbonTicker } from './RibbonTicker';

const BRANCHES = [
  {
    id: 'coimbatore',
    city: 'COIMBATORE',
    name: 'Central Headquarters & Ops Hub',
    address: '42/1 Avinashi Road, Civil Aerodrome Post, Coimbatore - 641014',
    phone: '+91 (785) 712-6532',
    timing: '24/7 Emergency Dispatch',
    mapCoords: '11.0168° N, 76.9558° E',
  },
  {
    id: 'tirupur',
    city: 'TIRUPUR',
    name: 'Industrial & MEP Regional Depot',
    address: '18 Palladam Road, Cotton City Plaza, Tirupur - 641604',
    phone: '+91 (785) 712-6533',
    timing: '6:00 AM - 10:00 PM Daily',
    mapCoords: '11.1085° N, 77.3411° E',
  },
  {
    id: 'erode',
    city: 'ERODE',
    name: 'Heavy Equipment & Excavation Hub',
    address: '88 Brough Road, Perundurai Bypass, Erode - 638001',
    phone: '+91 (785) 712-6534',
    timing: '24/7 Equipment Dispatch',
    mapCoords: '11.3410° N, 77.7172° E',
  },
  {
    id: 'pollachi',
    city: 'POLLACHI',
    name: 'Cococare Plantation & Agricultural Center',
    address: '105 Palakkad Main Road, Anaimalai Junction, Pollachi - 642001',
    phone: '+91 (785) 712-6535',
    timing: '5:00 AM - 8:00 PM Daily',
    mapCoords: '10.6582° N, 77.0080° E',
  },
];

export function BranchesSection() {
  return (
    <section id="branches" className="relative w-full bg-[#07190f] text-white py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout: Vertical "OUR BRANCHES" card on Left + 2x2 Branch Grid on Right */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
          
          {/* Vertical White Block (Matches reference design) */}
          <div className="lg:w-32 bg-white text-[#07190f] rounded-3xl p-6 flex items-center justify-center shadow-2xl flex-shrink-0 min-h-[140px] lg:min-h-auto">
            <h2 className="font-black text-xl lg:text-2xl tracking-[0.25em] uppercase text-center lg:writing-mode-vertical">
              OUR BRANCHES
            </h2>
          </div>

          {/* 2x2 Branch Cards Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {BRANCHES.map((branch) => (
              <div
                key={branch.id}
                className="bg-[#0b271a] border border-emerald-800/40 hover:border-emerald-500/50 rounded-3xl p-4 sm:p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 shadow-lg group"
              >
                {/* Mini Stylized Map Preview Graphic */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0e3b28] border border-emerald-600/30 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                  {/* Stylized Grid Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                  <div className="absolute w-full h-[1px] bg-emerald-500/30 top-1/3" />
                  <div className="absolute w-full h-[1px] bg-emerald-500/30 top-2/3" />
                  <div className="absolute h-full w-[1px] bg-emerald-500/30 left-1/2" />
                  
                  {/* Pin in center */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[#00754a] border-2 border-white flex items-center justify-center text-white shadow-lg animate-bounce">
                    <MapPin className="w-4 h-4" />
                  </div>
                  
                  <span className="absolute bottom-1 right-1 text-[8px] font-mono text-emerald-400/80">
                    HUB
                  </span>
                </div>

                {/* Branch Details */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 bg-[#00754a] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1">
                    <span>{branch.city}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {branch.name}
                  </h3>
                  <p className="text-[11px] text-emerald-200/70 line-clamp-2 mt-1 leading-snug">
                    {branch.address}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {branch.phone}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Centered "MORE" Link */}
        <div className="flex justify-center mt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors"
          >
            <span>MORE LOCATIONS & DISPATCH FLEET</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Brand Ribbon Ticker Strip #2 (Below Branches matching reference) */}
      <div className="mt-16">
        <RibbonTicker variant="secondary" />
      </div>

    </section>
  );
}
