'use client';

import React, { useState } from 'react';
import { 
  TreePine, Zap, Droplets, HardHat, Sprout, Flame, 
  Tractor, Wrench, Pickaxe, Building2, Ruler, Hotel, Bird, CheckCircle2, Sparkles, ArrowRight
} from 'lucide-react';
import { EnquiryModal } from './EnquiryModal';

const SERVICES = [
  {
    id: 'cococare',
    title: 'Cococare - Tree Services',
    description: 'Professional coconut tree climbing, trimming, maintenance, and care services. Our trained climbers ensure safe and efficient tree care.',
    icon: TreePine,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    points: ['Tree Climbing', 'Trimming & Pruning', 'Coconut Harvesting', 'Tree Health Assessment']
  },
  {
    id: 'electrical',
    title: 'Electrical Services',
    description: 'Complete electrical solutions for residential and commercial properties. Installation, maintenance, and repair services.',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    points: ['Wiring & Installation', 'Electrical Repairs', 'Panel Upgrades', 'Safety Inspections']
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'Expert plumbing services including installation, repairs, and maintenance for all your water and drainage needs.',
    icon: Droplets,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    points: ['Pipe Installation', 'Leak Repairs', 'Bathroom Fitting', 'Water Treatment']
  },
  {
    id: 'construction',
    title: 'Construction Services',
    description: 'End-to-end construction solutions from foundation to finishing. Building your dreams with quality and precision.',
    icon: HardHat,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    points: ['Residential Construction', 'Commercial Buildings', 'Renovation', 'Interior Work']
  },
  {
    id: 'gardening',
    title: 'Gardening & Landscaping',
    description: 'Transform your outdoor spaces with our professional gardening and landscaping services.',
    icon: Sprout,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    points: ['Garden Design', 'Lawn Maintenance', 'Plant Care', 'Landscaping']
  },
  {
    id: 'welding',
    title: 'Welding Services',
    description: 'Professional welding services for gates, grills, structures, and custom metalwork solutions.',
    icon: Flame,
    color: 'text-red-500',
    bg: 'bg-red-50',
    points: ['Gate Fabrication', 'Structural Welding', 'Grill Work', 'Metal Repairs']
  },
  {
    id: 'jcb',
    title: 'JCB & Excavation',
    description: 'Heavy machinery services for excavation, earthmoving, and site preparation work.',
    icon: Tractor,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    points: ['Excavation', 'Land Levelling', 'Demolition', 'Site Preparation']
  },
  {
    id: 'borewell',
    title: 'Borewell Services',
    description: 'Professional borewell drilling and maintenance services ensuring reliable water supply.',
    icon: Wrench,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    points: ['Borewell Drilling', 'Pump Installation', 'Maintenance', 'Water Testing']
  },
  {
    id: 'materials',
    title: 'Construction Materials',
    description: 'Quality construction materials supply for all your building needs at competitive prices.',
    icon: Pickaxe,
    color: 'text-stone-600',
    bg: 'bg-stone-100',
    points: ['Cement & Sand', 'Steel & Bricks', 'Tiles & Granite', 'Hardware Supplies']
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    description: 'Comprehensive real estate services including property buying, selling, and consultation.',
    icon: Building2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    points: ['Property Sales', 'Rental Services', 'Property Management', 'Legal Assistance']
  },
  {
    id: 'engineering',
    title: 'Engineering Consulting',
    description: 'Expert engineering consultation for structural design, planning, and project management.',
    icon: Ruler,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    points: ['Structural Design', 'Project Planning', 'Quality Assurance', 'Site Supervision']
  },
  {
    id: 'hotel',
    title: 'Hotel Services',
    description: 'Hospitality solutions and hotel management services delivering exceptional guest experiences.',
    icon: Hotel,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    points: ['Hotel Management', 'Facility Maintenance', 'Staff Training', 'Guest Services']
  },
  {
    id: 'farming',
    title: 'Chicken & Egg Farming',
    description: 'Professional poultry farming services including chicken rearing, egg production, and farm management.',
    icon: Bird,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    points: ['Poultry Farming', 'Egg Production', 'Farm Setup', 'Feed Management']
  }
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Our Services</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Comprehensive Solutions <br className="hidden sm:block" /> For Every Need
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            className="bg-white rounded-[2rem] p-8 border border-zinc-200/60 shadow-xl shadow-zinc-200/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
          >
            <div className={`w-14 h-14 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
              <service.icon className="w-7 h-7" />
            </div>
            
            <h3 className="font-bold text-xl text-zinc-900 mb-3">{service.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1">
              {service.description}
            </p>

            <ul className="space-y-3 mb-6 pt-6 border-t border-zinc-100">
              {service.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-700">{point}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedService(service.title)}
              className="w-full mt-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-emerald-600 text-white font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200 group/btn"
            >
              <span>Enquire for Service</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
            </button>
          </div>
        ))}
      </div>

      <EnquiryModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        serviceTitle={selectedService || ''}
      />
    </section>
  );
}

