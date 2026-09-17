import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

export function StatCard({ title, value, trend }: StatCardProps) {
  return (
    <div className="bg-[#14151A] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between hover:bg-[#1A1C23] transition-colors">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
        <button className="text-gray-500 hover:text-gray-300">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-100 mb-2">{value}</h2>
        <p className="text-gray-500 text-xs font-medium flex items-center gap-1">
          <span className="text-gray-300">~ {trend}</span> from last quarter
        </p>
      </div>
    </div>
  );
}
