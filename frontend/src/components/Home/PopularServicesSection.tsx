'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, TreePine, Zap, HardHat, ArrowRight } from 'lucide-react';
import { EnquiryModal } from './EnquiryModal';

const POPULAR_SERVICES = [
  {
    id: 'cococare-popular',
    title: 'Cococare - Tree Services',
    badge: 'COCOCARE HARVEST',
    subtitle: 'Safety-Rigged Tree Climbing',
    description: 'Expert coconut tree climbing, precision leaf pruning, and yield harvesting by licensed professionals.',
    rating: '5.0',
    icon: TreePine,
    image: '/heros/cococare-harvesting.jpg',
    featured: false,
  },
  {
    id: 'electrical-popular',
    title: 'Electrical Services',
    badge: 'ELECTRICAL REWIRE',
    subtitle: 'Master Electrician Suite',
    description: 'Complete high-voltage safety upgrades, surge panels, concealed home wiring, and emergency repair.',
    rating: '4.9',
    icon: Zap,
    image: '/heros/electrical-services.jpg',
    featured: true, // Center highlighted card with circular green backdrop like reference
  },
  {
    id: 'construction-popular',
    title: 'Construction Services',
    badge: 'TURNKEY CONSTRUCTION',
    subtitle: 'Villas & Structural Builds',
    description: 'Full architectural foundation, brickwork, RCC framing, and premium structural finishing.',
    rating: '5.0',
    icon: HardHat,
    image: '/images/hero_gardener.jpg',
    featured: false,
  },
];

export function PopularServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="popular" className="relative w-full bg-[#07190f] text-white py-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: [ POPULAR ] Ribbon Banner (Matches the reference) */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="relative inline-flex items-center bg-white text-[#07190f] font-black text-sm sm:text-base tracking-[0.2em] uppercase px-8 py-2.5 rounded-l-md shadow-2xl">
            <span>POPULAR</span>
            {/* Emerald ribbon corner tag */}
            <div className="absolute -right-3 top-0 bottom-0 w-4 bg-[#00754a] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          </div>
        </div>

        {/* 3 Popular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-end">
          {POPULAR_SERVICES.map((item) => {
            const isFeatured = item.featured;

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center group pt-12"
              >
                {/* Floating Protruding Circular Image Header */}
                <div className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 -mb-12 rounded-full p-1.5 border-4 transition-transform duration-300 group-hover:scale-105 shadow-2xl ${
                  isFeatured
                    ? 'border-[#00c576] bg-[#00754a] shadow-[0_0_35px_rgba(0,197,118,0.4)]'
                    : 'border-white/80 bg-[#0a2719]'
                }`}>
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Small Floating Category Icon Badge */}
                  <div className="absolute -bottom-1 right-0 w-8 h-8 rounded-full bg-[#00754a] border-2 border-white flex items-center justify-center text-white shadow-md">
                    <item.icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Container (Curved rounded container) */}
                <div className={`w-full rounded-[2.5rem] pt-16 pb-8 px-6 text-center flex flex-col items-center justify-between border transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#0a2e1d] border-emerald-500/50 shadow-2xl'
                    : 'bg-[#082216] border-emerald-900/40 shadow-xl'
                }`}>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">{item.rating}</span>
                  </div>

                  {/* Pill Title Badge */}
                  <div className="bg-[#00754a] border border-emerald-400/40 px-5 py-1.5 rounded-full mb-3 shadow-md">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white mb-2">
                    {item.subtitle}
                  </h3>

                  <p className="text-xs text-emerald-200/75 leading-relaxed mb-6 max-w-xs">
                    {item.description}
                  </p>

                  {/* Pill Action Button */}
                  <button
                    onClick={() => setSelectedService(item.title)}
                    className="w-full max-w-[200px] py-3 rounded-full bg-[#00754a] hover:bg-[#00875a] border border-emerald-300/40 text-white font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      <EnquiryModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        serviceTitle={selectedService || ''}
      />
    </section>
  );
}
