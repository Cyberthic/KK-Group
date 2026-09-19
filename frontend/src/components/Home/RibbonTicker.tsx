import React from 'react';
import { Sparkles, ShieldCheck, Zap, Award, Star } from 'lucide-react';

interface RibbonTickerProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  tilt?: boolean;
}

export function RibbonTicker({ variant = 'primary', className = '', tilt = false }: RibbonTickerProps) {
  const items = [
    { text: 'KK GROUP', icon: Star },
    { text: 'CERTIFIED EXPERTS', icon: ShieldCheck },
    { text: 'COCOCARE & TREE CARE', icon: Sparkles },
    { text: '24/7 RAPID DISPATCH', icon: Zap },
    { text: '10,000+ COMPLETED PROJECTS', icon: Award },
    { text: 'QUALITY GUARANTEED', icon: Star },
    { text: 'PRECISION CRAFTSMANSHIP', icon: Sparkles },
    { text: 'ZERO HIDDEN FEES', icon: ShieldCheck },
  ];

  const bgColor = variant === 'primary' 
    ? 'bg-[#00754a] text-white' 
    : 'bg-[#0e3b28] border-y border-emerald-600/30 text-emerald-100';

  return (
    <div 
      className={`relative w-full overflow-hidden py-3.5 sm:py-4 select-none ${bgColor} ${
        tilt ? '-rotate-1 scale-[1.02] shadow-2xl z-20 my-4' : 'z-10'
      } ${className}`}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap gap-8">
        {/* Render multiple sets to ensure seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="inline-flex items-center gap-3">
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              {item.text}
            </span>
            <item.icon className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
