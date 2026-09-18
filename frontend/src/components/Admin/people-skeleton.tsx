'use client';

import React from 'react';

interface PeopleSkeletonProps {
  count?: number;
  viewMode?: 'grid' | 'table';
}

export function PeopleSkeleton({ count = 6, viewMode = 'grid' }: PeopleSkeletonProps) {
  if (viewMode === 'table') {
    return (
      <div className="bg-[#14151A] rounded-2xl border border-gray-800 overflow-hidden animate-pulse">
        <div className="p-4 border-b border-gray-800 bg-[#1A1C23]">
          <div className="h-4 w-48 bg-gray-800 rounded-md" />
        </div>
        <div className="divide-y divide-gray-800/50">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-800/80 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-gray-800 rounded" />
                  <div className="h-3 w-24 bg-gray-800/50 rounded" />
                </div>
              </div>
              <div className="h-5 w-20 bg-gray-800 rounded-md hidden sm:block" />
              <div className="h-4 w-16 bg-gray-800 rounded hidden md:block" />
              <div className="h-4 w-24 bg-gray-800 rounded hidden lg:block" />
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800" />
                <div className="w-8 h-8 rounded-lg bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#14151A] rounded-2xl border border-gray-800/80 p-5 flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div>
            {/* Top avatar & role skeleton */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gray-800/80 shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-800 rounded-md" />
                  <div className="h-3 w-20 bg-gray-800/50 rounded" />
                </div>
              </div>
              <div className="h-6 w-20 bg-gray-800/70 rounded-lg" />
            </div>

            {/* Middle details skeleton */}
            <div className="space-y-2.5 py-3 border-y border-gray-800/60 my-3">
              <div className="flex items-center justify-between gap-2">
                <div className="h-3.5 w-36 bg-gray-800/60 rounded" />
                <div className="h-3.5 w-14 bg-gray-800/40 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-16 bg-gray-800/60 rounded" />
                <div className="h-3.5 w-24 bg-gray-800/70 rounded" />
              </div>
            </div>
          </div>

          {/* Bottom actions skeleton */}
          <div className="flex items-center justify-between pt-2 gap-2">
            <div className="h-8 flex-1 bg-gray-800/70 rounded-xl" />
            <div className="w-8 h-8 bg-gray-800/50 rounded-xl shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
