import React from 'react';
import { Phone, Snowflake } from 'lucide-react';

export function EmergencyBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 my-8 sm:my-12">
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#16a34a] p-8 sm:p-12 md:p-14 text-white shadow-xl shadow-emerald-900/15 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Subtle Snowflake/Leaf Graphic Motif Overlay */}
        <div className="absolute right-1/3 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
          <Snowflake className="w-64 h-64 text-white stroke-[1]" />
        </div>

        {/* Left Text */}
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            Stay Safe This Winter Let <br className="hidden sm:inline" />
            Us Handle the Snow
          </h3>
        </div>

        {/* Right Call Badge Card */}
        <div className="relative z-10 bg-white rounded-full sm:rounded-2xl p-3 sm:px-6 sm:py-3.5 shadow-lg flex items-center gap-4 text-zinc-900">
          <div className="w-12 h-12 rounded-full bg-[#16a34a] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Phone className="w-5 h-5 fill-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
              Call Us for Emergency
            </p>
            <a
              href="tel:9195558247"
              className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight hover:text-[#16a34a] transition-colors"
            >
              919-555-8247
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
