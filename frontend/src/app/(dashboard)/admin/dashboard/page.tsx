'use client';
import React from 'react';
import { Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { StatCard } from '@/components/Admin/stat-card';
import { PerformanceChart } from '@/components/Admin/performance-chart';
import { AttendanceChart } from '@/components/Admin/attendance-chart';
import { EmployeesTable } from '@/components/Admin/employees-table';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-1">Dashboard</h1>
           <p className="text-gray-500 text-sm">Here is today's report and performances</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1A1C23] border border-gray-800 px-4 py-2 rounded-xl text-sm font-medium text-gray-300">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Jun 1 - Jun 30</span>
            <span className="w-px h-4 bg-gray-700 mx-1"></span>
            <span>Monthly</span>
            <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
          </div>
          
          <button className="flex items-center gap-2 bg-[#1A1C23] border border-gray-800 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-[#2A2D35] transition-colors">
            All Segment
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          <button className="flex items-center gap-2 bg-[#7B4DFF] hover:bg-[#6A3DEE] px-4 py-2 rounded-xl text-sm font-medium text-white shadow-[0_0_15px_rgba(123,77,255,0.3)] transition-all">
            <Sparkles className="w-4 h-4" />
            AI Assistant
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value="12600"
          trend="+2%"
        />
        <StatCard
          title="Job Application"
          value="1186"
          trend="+15%"
        />
        <StatCard
          title="New Employees"
          value="22"
          trend="+2%"
        />
        <StatCard
          title="Satisfaction Rate"
          value="89.9%"
          trend="+5%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
      </div>

      {/* Employees Table */}
      <div>
        <EmployeesTable />
      </div>
    </div>
  );
}
