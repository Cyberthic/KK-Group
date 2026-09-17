'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

const data = [
  { name: 'Present', value: 12562, color: '#7B4DFF' },
  { name: 'On Leave', value: 10, color: '#EAB308' },
  { name: 'On Holiday', value: 25, color: '#22C55E' },
  { name: 'Absent', value: 4, color: '#A78BFA' }, // Lighter purple for absent
];

export function AttendanceChart() {
  return (
    <div className="bg-[#14151A] p-6 rounded-2xl border border-gray-800 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-200">Employee Attendance</h3>
        <button className="flex items-center gap-2 bg-[#1A1C23] border border-gray-800 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400">
          <Calendar className="w-3 h-3" />
          4 June 2024
        </button>
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-2xl font-bold text-gray-100">12600</span>
             <span className="text-xs text-gray-500">Total Employee</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
           {data.map((item) => (
             <div key={item.name}>
                <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                   <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                   {item.name}
                </div>
                <div className="font-semibold text-gray-200 text-lg pl-4">{item.value}</div>
             </div>
           ))}
        </div>
      </div>

      <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-800 bg-[#1A1C23] text-gray-300 text-sm font-medium hover:bg-[#2A2D35] transition-colors">
         View Full Details
      </button>
    </div>
  );
}
