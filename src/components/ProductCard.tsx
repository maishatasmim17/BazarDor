'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { toBengaliNumber, formatPriceWithCommas, getUnitLabelBn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';
  const isFlat = product.change.dir === 'flat' || (!isUp && !isDown);

  const pctBengali = toBengaliNumber(product.change.pct.toFixed(1));

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group block bg-white rounded-2xl p-4 border border-gray-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-emerald-200 transition-all duration-200"
    >
      <div className="flex items-start gap-3.5 mb-3">
        {/* Emoji Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-gray-50/90 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-200">
          <span>{product.image || product.categoryIcon || '🛒'}</span>
        </div>

        {/* Product Name & Unit */}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug truncate group-hover:text-emerald-700 transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {getUnitLabelBn(product.unit)}
          </p>
        </div>
      </div>

      {/* Price and Change Badge */}
      <div className="flex items-end justify-between pt-2 border-t border-gray-50">
        <div>
          <div className="text-[11px] text-gray-500 font-medium leading-none mb-1">
            আজকের দাম
          </div>
          <div className="text-lg font-bold text-gray-900 leading-none">
            {formatPriceWithCommas(product.today)}{' '}
            <span className="text-sm font-semibold text-gray-600">টাকা</span>
          </div>
        </div>

        {/* Change Badge */}
        <div>
          {isUp && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-600 border border-red-100/60">
              <span>▲</span> {pctBengali}%
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/60">
              <span>▼</span> {pctBengali}%
            </span>
          )}
          {isFlat && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-100">
              <span>—</span> ০.০%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
