'use client';

import React, { useState, useRef } from 'react';
import { 
  TreePine, Zap, Droplets, HardHat, Sprout, Flame, 
  Tractor, Wrench, Pickaxe, Building2, Ruler, Hotel, Bird,
  ChevronLeft, ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react';
import { EnquiryModal } from './EnquiryModal';

export interface ServiceItem {
  id: string;
  category: 'tree' | 'mep' | 'construction' | 'specialty';
  title: string;
  shortTitle: string;
  description: string;
  image?: string;
  icon: any;
  points: string[];
}

export const ALL_SERVICES: ServiceItem[] = [
  {
    id: 'cococare',
    category: 'tree',
    title: 'Cococare - Tree Services',
    shortTitle: 'COCOCARE TREE CARE',
    description: 'Professional coconut tree climbing, trimming, and certified harvesting.',
    image: '/heros/cococare-harvesting.jpg',
    icon: TreePine,
    points: ['Tree Climbing & Harvesting', 'Crown Trimming & Pruning', 'Pest & Beetle Treatment', 'Safety Inspected Rigging']
  },
  {
    id: 'electrical',
    category: 'mep',
    title: 'Electrical Services',
    shortTitle: 'ELECTRICAL WORK',
    description: 'Complete commercial and residential electrical installations and emergency repairs.',
    image: '/heros/electrical-services.jpg',
    icon: Zap,
    points: ['Complete Home Rewiring', 'Breaker Panel Upgrades', 'Lighting & Surge Safety', 'Industrial Load Systems']
  },
  {
    id: 'plumbing',
    category: 'mep',
    title: 'Plumbing Services',
    shortTitle: 'PLUMBING SUITE',
    description: 'Expert plumbing solutions, high-pressure line clearing, and leak detection.',
    image: '/heros/plumbing-services.jpg',
    icon: Droplets,
    points: ['Concealed Leak Repairs', 'Sanitary & Bath Fitting', 'High-Flow Water Lines', 'Drainage Inspection']
  },
  {
    id: 'construction',
    category: 'construction',
    title: 'Construction Services',
    shortTitle: 'CIVIL CONSTRUCTION',
    description: 'Turnkey structural building from foundation laying to precision architectural finishing.',
    image: '/images/hero_gardener.jpg',
    icon: HardHat,
    points: ['Residential Villas', 'Commercial Structures', 'Modern Renovations', 'Interior Remodeling']
  },
  {
    id: 'gardening',
    category: 'tree',
    title: 'Gardening & Landscaping',
    shortTitle: 'GARDEN & LANDSCAPE',
    description: 'Bespoke garden landscaping, lawn rejuvenation, and manicured green spaces.',
    image: '/images/about_gardener.jpg',
    icon: Sprout,
    points: ['Lawn Turf Installation', 'Ornamental Tree Care', 'Automated Drip Irrigation', 'Seasonal Weed & Feed']
  },
  {
    id: 'welding',
    category: 'construction',
    title: 'Welding Services',
    shortTitle: 'WELDING & FABRICATION',
    description: 'Precision metal fabrication, architectural gates, decorative grills, and beam welding.',
    icon: Flame,
    points: ['Custom Steel Gates', 'Safety Window Grills', 'Structural Truss Welding', 'On-Site Metal Repairs']
  },
  {
    id: 'jcb',
    category: 'construction',
    title: 'JCB & Excavation',
    shortTitle: 'JCB & EXCAVATION',
    description: 'Heavy earthmoving, site grading, trenching, and foundation excavation.',
    icon: Tractor,
    points: ['Basement Excavation', 'Land Leveling & Clearing', 'Safe Structure Demolition', 'Debris Hauling & Loading']
  },
  {
    id: 'borewell',
    category: 'mep',
    title: 'Borewell Services',
    shortTitle: 'BOREWELL & DRILLING',
    description: 'Scientific underground water exploration, deep drilling, and submersible motor repairs.',
    icon: Wrench,
    points: ['Geological Groundwater Survey', 'Deep Borewell Drilling', 'Submersible Pump Fitting', 'Desilting & Deep Cleaning']
  },
  {
    id: 'materials',
    category: 'construction',
    title: 'Construction Materials',
    shortTitle: 'BUILDING MATERIALS',
    description: 'Certified cement, river/M-sand, TMT steel bars, bricks, and direct wholesale supply.',
    icon: Pickaxe,
    points: ['Direct Factory TMT Steel', 'Grade 53/43 Cement', 'Washed M-Sand & Aggregates', 'Clay & Flyash Bricks']
  },
  {
    id: 'realestate',
    category: 'specialty',
    title: 'Real Estate Services',
    shortTitle: 'REAL ESTATE ADVISORY',
    description: 'Verified residential plots, commercial properties, and clear-title agricultural farmlands.',
    icon: Building2,
    points: ['Clear Title Land Buying', 'Verified Commercial Spaces', 'Rental Property Advisory', 'Legal Document Scrutiny']
  },
  {
    id: 'engineering',
    category: 'specialty',
    title: 'Engineering Consulting',
    shortTitle: 'STRUCTURAL CONSULTING',
    description: 'Chartered structural design, 3D elevation plans, and municipal permit clearance.',
    icon: Ruler,
    points: ['Structural Load Analysis', '3D Architectural Blueprints', 'Government Plan Approvals', 'Quality Audit & QA/QC']
  },
  {
    id: 'hotel',
    category: 'specialty',
    title: 'Hotel Services',
    shortTitle: 'HOTEL MANAGEMENT',
    description: 'Comprehensive hospitality property maintenance, HVAC management, and staff training.',
    icon: Hotel,
    points: ['Full Facility Maintenance', 'Commercial Kitchen Upkeep', 'Hospitality Staff Protocols', 'Guest Room Operations']
  },
  {
    id: 'farming',
    category: 'specialty',
    title: 'Chicken & Egg Farming',
    shortTitle: 'POULTRY & FARMING',
    description: 'Organic free-range poultry development, egg logistics, and feed management.',
    icon: Bird,
    points: ['Hygienic Poultry Sheds', 'Organic Egg Supply', 'Veterinary Bio-Security', 'Balanced Feed Formulation']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'ALL SERVICES' },
  { id: 'tree', label: 'TREE & GARDENING' },
  { id: 'mep', label: 'ELECTRICAL & PLUMBING' },
  { id: 'construction', label: 'CONSTRUCTION & HEAVY' },
  { id: 'specialty', label: 'SPECIALTY & FARMING' },
];

export function ServicesCarousel() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredServices = activeCategory === 'all' 
    ? ALL_SERVICES 
    : ALL_SERVICES.filter(s => s.category === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="services" className="relative w-full py-20 bg-[#07190f] text-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/15 via-[#07190f] to-[#07190f] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Pills (Matches the DRINKS / FOOD / AT HOME bar in reference) */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-[#0d2a1c] border border-emerald-800/40 p-1.5 rounded-full shadow-2xl overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#07190f] shadow-lg shadow-black/30 scale-100'
                      : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Container with Left/Right Chevrons */}
        <div className="relative">
          
          {/* Left Scroll Button */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#00754a] border border-emerald-400/40 text-white flex items-center justify-center shadow-2xl hover:bg-[#00875a] hover:scale-110 active:scale-95 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#00754a] border border-emerald-400/40 text-white flex items-center justify-center shadow-2xl hover:bg-[#00875a] hover:scale-110 active:scale-95 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Scrolling Card Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto no-scrollbar py-6 px-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredServices.map((service, index) => {
              // Give the middle/second card in default view an elevated accent style matching reference center card
              const isHighlight = index === 1;

              return (
                <div
                  key={service.id}
                  className={`snap-center flex-shrink-0 w-[280px] sm:w-[310px] rounded-[2.5rem] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                    isHighlight
                      ? 'bg-gradient-to-b from-[#00754a] to-[#043d26] border-2 border-emerald-300/40 shadow-[0_20px_50px_rgba(0,117,74,0.35)] -translate-y-2'
                      : 'bg-[#0a2318] border border-emerald-800/40 hover:border-emerald-500/50 shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top Arched Icon Badge */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300 ${
                        isHighlight 
                          ? 'bg-white text-[#00754a] shadow-lg shadow-black/20' 
                          : 'bg-[#00754a]/30 border border-emerald-500/40 text-emerald-300'
                      }`}>
                        <service.icon className="w-9 h-9" />
                      </div>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-center font-black text-lg tracking-wide uppercase text-white mb-2 line-clamp-1">
                      {service.shortTitle}
                    </h3>
                    
                    <p className="text-center text-xs text-emerald-100/70 mb-6 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                      {service.points.slice(0, 4).map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                            isHighlight ? 'text-emerald-200' : 'text-emerald-400'
                          }`} />
                          <span className="text-xs font-semibold text-white/90">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Pill CTA Button */}
                  <button
                    onClick={() => setSelectedServiceForModal(service.title)}
                    className={`w-full py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-lg ${
                      isHighlight
                        ? 'bg-white text-[#00754a] hover:bg-zinc-100 shadow-black/30 hover:shadow-xl'
                        : 'bg-[#00754a] hover:bg-[#00875a] text-white border border-emerald-400/30'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Enquiry Modal integration */}
      <EnquiryModal
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        serviceTitle={selectedServiceForModal || ''}
      />
    </section>
  );
}
