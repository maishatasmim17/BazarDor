'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { toBengaliNumber, getUnitShortBn } from '@/lib/utils';

interface PriceTickerProps {
  products: Product[];
}

export function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate items for a continuous looping strip
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-[#f8fafc] border-y border-gray-200/80 overflow-hidden py-2 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {tickerItems.map((p, idx) => {
          const isUp = p.change.dir === 'up';
          const isDown = p.change.dir === 'down';
          const pct = toBengaliNumber(p.change.pct.toFixed(1));
          const unit = getUnitShortBn(p.unit);

          return (
            <Link
              key={`${p.id}-${idx}`}
              href={`/product/${p.slug || p.id}`}
              className="inline-flex items-center gap-2 px-4 text-xs font-medium text-gray-700 hover:text-emerald-700 transition-colors whitespace-nowrap group"
            >
              <span className="text-sm">{p.image || p.categoryIcon || '🛒'}</span>
              <span className="font-semibold text-gray-900 group-hover:text-emerald-700">
                {p.nameBn}
              </span>
              <span className="text-gray-600">
                {toBengaliNumber(p.today)} টাকা/{unit}
              </span>
              {isUp && (
                <span className="font-bold text-red-600 flex items-center gap-0.5">
                  ▲ {pct}%
                </span>
              )}
              {isDown && (
                <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                  ▼ {pct}%
                </span>
              )}
              {!isUp && !isDown && (
                <span className="font-bold text-gray-500 flex items-center gap-0.5">
                  — ০.০%
                </span>
              )}
              <span className="text-gray-300 ml-3">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
