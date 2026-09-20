'use client';

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface WorkerLiveMapProps {
  onViewMap?: () => void;
}

export function WorkerLiveMap({ onViewMap }: WorkerLiveMapProps) {
  const handleOpenGoogleMaps = () => {
    // Open Kerala site coordinates in GPS
    window.open(
      'https://maps.google.com/?q=9.9816,76.2999',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="w-full flex flex-col pt-4 border-t border-slate-100 select-none shrink-0">
      {/* Header: Live map + View */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-purple-50 text-[#5E42B4] flex items-center justify-center font-black">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight leading-tight">
              Live Map
            </h3>
            <span className="text-[10px] font-semibold text-slate-400">
              Kochi, Kerala &bull; Active Hub
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenGoogleMaps}
          className="text-xs font-bold text-[#5E42B4] hover:underline cursor-pointer flex items-center gap-1"
        >
          <Navigation className="w-3 h-3" />
          <span>GPS</span>
        </button>
      </div>

      {/* Styled Map Thumbnail Canvas matching reference */}
      <div
        onClick={onViewMap || handleOpenGoogleMaps}
        className="relative w-full h-32 sm:h-36 bg-[#F3F5F9] rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden cursor-pointer group shadow-xs"
      >
        {/* Abstract Stylized Road Network SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 240 120"
          preserveAspectRatio="none"
        >
          {/* Subtle Park/Site polygons */}
          <path d="M 0,0 L 70,0 L 50,40 L 0,30 Z" fill="#E8F4EC" opacity="0.8" />
          <path d="M 170,80 L 240,70 L 240,120 L 150,120 Z" fill="#E8F4EC" opacity="0.8" />

          {/* Road Lines */}
          <path
            d="M -10,35 Q 80,45 130,20 T 250,50"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 60,-10 Q 70,60 110,80 T 140,130"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 120,20 Q 160,50 190,40 T 260,110"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 30,130 Q 90,80 180,95 T 250,85"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Thin Road Dividers */}
          <path
            d="M -10,35 Q 80,45 130,20 T 250,50"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Location Label Badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-extrabold text-slate-700 tracking-tight">
            Kochi Ops Sector
          </span>
        </div>

        {/* Avatar Pin 1 (Left Road) */}
        <div className="absolute left-[20%] top-[45%] -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
          <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
              alt="Operative 1"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Avatar Pin 2 (Lower Road) */}
        <div className="absolute left-[58%] bottom-[12%] -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
          <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
              alt="Operative 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Orange/Coral Live Beacon Destination Target (Right Road) */}
        <div className="absolute right-[14%] top-[42%] -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
          <div className="relative w-9 h-9 rounded-full bg-[#FF5E4D] text-white flex items-center justify-center shadow-lg shadow-[#FF5E4D]/40">
            <span className="w-2 h-2 rounded-full bg-white animate-ping absolute" />
            <Navigation className="w-4 h-4 text-white fill-white rotate-45" />
          </div>
        </div>
      </div>

      {/* Quick Launch Directions Pill */}
      <button
        type="button"
        onClick={handleOpenGoogleMaps}
        className="w-full mt-3 py-2 px-3 rounded-2xl bg-purple-50 hover:bg-[#5E42B4] text-[#5E42B4] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <Navigation className="w-3.5 h-3.5" />
        <span>Open Navigation Directions</span>
      </button>
    </div>
  );
}
