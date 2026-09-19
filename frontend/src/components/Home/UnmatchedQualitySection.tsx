'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { RibbonTicker } from './RibbonTicker';

export function UnmatchedQualitySection() {
  return (
    <section className="relative w-full bg-[#07190f] text-white pt-16 pb-6 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        {/* Giant Centered Headline matching reference layout */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.02]">
            UNMATCHED <br />
            <span className="text-white drop-shadow-lg">QUALITY</span>
          </h2>
        </div>

        {/* Centerpiece Showcase with Left & Right Curving Annotations */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-6">
          
          {/* Left Annotation Note */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="max-w-xs bg-[#0b291a]/80 border border-emerald-700/30 p-5 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-2 justify-center lg:justify-end text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Master Craftsmanship</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                At KK Group, every task is a journey into absolute safety, verified domain mastery, and durable engineering.
              </p>
            </div>
          </div>

          {/* Centerpiece Spotlight Graphic (Matches the cup in the reference) */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex-shrink-0 flex items-center justify-center">
            
            {/* Glowing outer rings */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-4 rounded-full border border-dashed border-emerald-500/30 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
            
            {/* Center circular badge */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white/90 shadow-[0_0_50px_rgba(0,197,118,0.4)] p-1 bg-[#00754a]">
              <Image
                src="/heros/cococare-harvesting.jpg"
                alt="KK Group Unmatched Quality Showcase"
                fill
                className="object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07190f]/70 via-transparent to-transparent rounded-full" />
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-black/60 px-3 py-1 rounded-full border border-emerald-400/30">
                  ISO Level Standard
                </span>
              </div>
            </div>

            {/* Floating leaf/badge element */}
            <div className="absolute -top-2 right-4 w-9 h-9 rounded-full bg-emerald-500/30 border border-emerald-300/40 backdrop-blur-md flex items-center justify-center animate-float-slow">
              <Award className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="absolute -bottom-2 left-4 w-9 h-9 rounded-full bg-emerald-500/30 border border-emerald-300/40 backdrop-blur-md flex items-center justify-center animate-float-reverse">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            </div>
          </div>

          {/* Right Annotation Note */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="max-w-xs bg-[#0b291a]/80 border border-emerald-700/30 p-5 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Reliability</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                KK Group redefines property maintenance with transparent estimates, on-time arrivals, and zero compromises.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Brand Ribbon Ticker Strip #1 (Tilted across the layout just like reference) */}
      <div className="mt-14">
        <RibbonTicker variant="primary" tilt={true} />
      </div>

    </section>
  );
}
