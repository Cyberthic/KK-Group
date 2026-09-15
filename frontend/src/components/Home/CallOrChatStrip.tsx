import React from 'react';
import { Phone } from 'lucide-react';

export function CallOrChatStrip() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-16 pb-4 relative z-10 flex justify-end">
      <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] shadow-2xl shadow-zinc-200/40 border border-zinc-100">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Phone className="w-5 h-5 fill-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Call Or Chat</p>
          <a href="tel:+785657975" className="text-2xl font-extrabold text-zinc-900 tracking-tight hover:text-emerald-600 transition-colors">
            +785-(657)-975
          </a>
        </div>
      </div>
    </div>
  );
}
