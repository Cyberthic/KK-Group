'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: '1 June', value: 55 },
  { name: '2 June', value: 45 },
  { name: '3 June', value: 50 },
  { name: '4 June', value: 75 },
  { name: '5 June', value: 48 },
  { name: '6 June', value: 50 },
  { name: '7 June', value: 45 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2A2D35]/90 backdrop-blur-sm text-gray-200 p-4 rounded-xl text-xs shadow-xl border border-gray-700 w-48">
        <p className="font-semibold text-gray-400 mb-2">June {label.split(' ')[0]}, 2024</p>
        <div className="space-y-1.5">
           <div className="flex justify-between items-center">
              <span>UI/UX Team</span>
              <span className="font-bold">58%</span>
           </div>
           <div className="flex justify-between items-center">
              <span>Motion Design</span>
              <span className="font-bold">65%</span>
           </div>
           <div className="flex justify-between items-center">
              <span>Marketing Team</span>
              <span className="font-bold">49%</span>
           </div>
        </div>
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  return (
    <div className="bg-[#14151A] p-6 rounded-2xl border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-200">Employees Performance</h3>
        <button className="flex items-center gap-2 bg-[#1A1C23] border border-gray-800 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors">
          Weekly
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A881FF" stopOpacity={1}/>
                <stop offset="100%" stopColor="#4A1C40" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" opacity={0.5} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1F2937', opacity: 0.2 }} />
            <Bar dataKey="value" fill="url(#colorValue)" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
