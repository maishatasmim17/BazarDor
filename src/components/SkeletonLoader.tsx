import React from 'react';

export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs animate-pulse"
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-3/4" />
              <div className="h-3 bg-gray-100 rounded-md w-1/3" />
            </div>
          </div>
          <div className="flex items-end justify-between pt-2 border-t border-gray-50">
            <div className="space-y-1.5">
              <div className="h-2.5 bg-gray-100 rounded w-12" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-6 bg-gray-200 rounded-md w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="w-16 h-16 rounded-2xl bg-gray-200" />
          <div className="space-y-2 flex-1">
            <div className="h-7 bg-gray-200 rounded-md w-48" />
            <div className="h-4 bg-gray-100 rounded-md w-32" />
            <div className="h-3 bg-gray-100 rounded-md w-56" />
          </div>
        </div>
        <div className="w-32 h-16 bg-gray-200 rounded-2xl" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 space-y-2">
            <div className="h-4 bg-gray-100 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-28" />
            <div className="h-3 bg-gray-100 rounded w-36" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-50 rounded-lg flex items-center px-4 justify-between">
            <div className="h-4 bg-gray-200 rounded w-28" />
            <div className="h-4 bg-gray-100 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
