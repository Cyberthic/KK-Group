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
  Legend,
} from 'recharts';

const data = [
  { name: 'Jan', profit: 30000, loss: 20000 },
  { name: 'Feb', profit: 40000, loss: 15000 },
  { name: 'Mar', profit: 45000, loss: 12000 },
  { name: 'Apr', profit: 35000, loss: 18000 },
  { name: 'May', profit: 42000, loss: 22000 },
  { name: 'Jun', profit: 48000, loss: 28000 },
  { name: 'Jul', profit: 38000, loss: 18000 },
  { name: 'Aug', profit: 32000, loss: 14000 },
];

export function IncomeChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900">Total Income</h3>
        <p className="text-sm text-gray-500">View your income in a certain period of time</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
               cursor={{fill: 'transparent'}}
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              wrapperStyle={{ top: -45, fontSize: '12px' }}
            />
            <Bar dataKey="loss" stackId="a" fill="#111827" radius={[0, 0, 8, 8]} barSize={24} name="Loss" />
            <Bar dataKey="profit" stackId="a" fill="#FF5A36" radius={[8, 8, 0, 0]} barSize={24} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
