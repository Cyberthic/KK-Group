'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export interface ServiceCardItem {
  id: string;
  image: string;
  titleEn: string;
  titleMl: string;
  subEn: string;
  subMl: string;
  price: string;
}

export const HERO_SERVICES: ServiceCardItem[] = [
  {
    id: 'coco',
    image: '/hero-service-card/coco.png',
    titleEn: 'Cococare Squad',
    titleMl: 'കൊക്കോ കെയർ',
    subEn: 'Palm Tree Harvesting',
    subMl: 'തെങ്ങുകയറ്റ വിളവെടുപ്പ്',
    price: '₹4,500',
  },
  {
    id: 'jcb',
    image: '/hero-service-card/jcb.png',
    titleEn: 'JCB Earthmover',
    titleMl: 'ജെസിബി മെഷിനറി',
    subEn: 'Heavy Excavation',
    subMl: 'എക്സ്കവേഷൻ സർവീസ്',
    price: '₹9,600',
  },
  {
    id: 'plastering',
    image: '/hero-service-card/plastering.png',
    titleEn: 'Plastering Squad',
    titleMl: 'പ്ലാസ്റ്ററിംഗ് സംഘം',
    subEn: 'Wall Masonry & Finish',
    subMl: 'കട്ടകെട്ടും പ്ലാസ്റ്ററിംഗും',
    price: '₹5,800',
  },
  {
    id: 'electrical',
    image: '/hero-service-card/electrical.png',
    titleEn: 'Electrical Squad',
    titleMl: 'ഇലക്ട്രിക്കൽ ജോലികൾ',
    subEn: 'Industrial & Domestic',
    subMl: 'വയറിംഗ് & ഇൻസ്റ്റാളേഷൻ',
    price: '₹2,500',
  },
  {
    id: 'borewell',
    image: '/hero-service-card/borewell.png',
    titleEn: 'Borewell Drilling',
    titleMl: 'ബോർവെൽ ഡ്രില്ലിംഗ്',
    subEn: 'Groundwater Systems',
    subMl: 'കുഴൽക്കിണർ നിർമ്മാണം',
    price: '₹12,000',
  },
];

interface HeroServiceCardProps {
  onSelectService?: (serviceName: string) => void;
}

export function HeroServiceCard({ onSelectService }: HeroServiceCardProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SERVICES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = HERO_SERVICES[currentIndex];
  const title = language === 'ml' ? current.titleMl : current.titleEn;
  const subtitle = language === 'ml' ? current.subMl : current.subEn;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? HERO_SERVICES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % HERO_SERVICES.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-white text-[#0F172A] rounded-3xl p-3 sm:p-3.5 shadow-2xl w-[190px] sm:w-[215px] flex flex-col gap-2.5 transition-transform hover:-translate-y-1 duration-300 relative group"
    >
      {/* Product / Service Image Carousel Frame */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#EBF6F1]">
        {HERO_SERVICES.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-1' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.titleEn}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Carousel Arrow Navigation on Hover */}
        <div className="absolute inset-x-1.5 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer pointer-events-auto shadow-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer pointer-events-auto shadow-xs"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle Carousel Dots Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
          {HERO_SERVICES.map((_, idx) => (
            <span
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-3 h-1 bg-[#2A835F] shadow-xs'
                  : 'w-1 h-1 bg-white/70 shadow-xs'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Service Details */}
      <div className="min-h-[38px] flex flex-col justify-center">
        <h4 className="text-xs sm:text-sm font-black text-[#0F172A] leading-tight truncate">
          {title}
        </h4>
        <p className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
