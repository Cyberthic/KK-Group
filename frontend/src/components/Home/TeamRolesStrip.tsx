import React from 'react';

const TEAM_ROLES = ['Lead Landscaper', 'Lawn Care Specialist', 'Snow Removal Supervisor', 'Customer Care Manager'];

export function TeamRolesStrip() {
  return (
    <div className="bg-zinc-900 py-8 my-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-around gap-6 text-sm font-bold text-white uppercase tracking-widest relative z-10">
        {TEAM_ROLES.map((role, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>{role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
