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

const data = [
  { name: 'Fri', revenue: 17000 },
  { name: 'Sat', revenue: 12000 },
  { name: 'Sun', revenue: 22430 },
  { name: 'Mon', revenue: 13000 },
  { name: 'Thu', revenue: 16000 },
  { name: 'Wen', revenue: 23000 },
  { name: 'Thus', revenue: 16000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#FF5A36] text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg relative">
        ₹{payload[0].value.toLocaleString()}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF5A36] rotate-45"></div>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Revenue analytics</h3>
        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#FF5A36] focus:border-[#FF5A36] block p-2">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="revenue" radius={[20, 20, 20, 20]} barSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#FF5A36"
                  style={
                    entry.name === 'Sun'
                      ? {}
                      : { opacity: 0.8 } // Slight differentiation if needed, keeping simple
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
