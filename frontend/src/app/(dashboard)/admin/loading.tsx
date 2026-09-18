import React from 'react';
import { PeopleSkeleton } from '@/components/Admin/people-skeleton';

export default function AdminLoading() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-800" />
            <div className="h-7 w-48 bg-gray-800 rounded-lg" />
          </div>
          <div className="h-4 w-64 bg-gray-800/60 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gray-800 rounded-xl" />
          <div className="h-9 w-32 bg-gray-800 rounded-xl" />
        </div>
      </div>

      {/* Search & Filter Bar skeleton */}
      <div className="flex items-center justify-between gap-4 bg-[#14151A] p-4 rounded-2xl border border-gray-800">
        <div className="h-9 w-full max-w-md bg-[#1A1C23] rounded-xl border border-gray-800" />
        <div className="flex gap-2">
          <div className="h-9 w-16 bg-gray-800/60 rounded-xl hidden sm:block" />
          <div className="h-9 w-20 bg-gray-800 rounded-xl" />
        </div>
      </div>

      {/* Cards Grid skeleton */}
      <PeopleSkeleton count={6} viewMode="grid" />
    </div>
  );
}
