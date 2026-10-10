'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Category, Product, SortOption } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { toBengaliNumber } from '@/lib/utils';
import { ChevronDown, ArrowLeft, PackageOpen } from 'lucide-react';

interface CategoryClientProps {
  category: Category;
  initialProducts: Product[];
}

export function CategoryClient({ category, initialProducts }: CategoryClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isPending, startTransition] = useTransition();

  // Sort logic (Challenge C1: sort by numeric value, not string)
  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.today - b.today;
    }
    if (sortOption === 'price-desc') {
      return b.today - a.today;
    }
    return 0; // default order
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as SortOption;
    startTransition(() => {
      setSortOption(val);
    });
  };

  const productCountBn = toBengaliNumber(sortedProducts.length);

  return (
    <div className="space-y-6">
      {/* Category Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
          <span>{category.icon || '🛍️'}</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {category.nameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            {productCountBn}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort Control Bar */}
      <div className="bg-white rounded-2xl px-5 py-3.5 border border-gray-100 shadow-xs flex items-center justify-end gap-3">
        <label htmlFor="sort-dropdown" className="text-sm font-semibold text-gray-600">
          সাজান
        </label>
        <div className="relative inline-block">
          <select
            id="sort-dropdown"
            value={sortOption}
            onChange={handleSortChange}
            className="appearance-none bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200 text-gray-800 text-xs sm:text-sm font-medium rounded-xl pl-3.5 pr-8 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Total count subtitle */}
      <div className="text-xs sm:text-sm text-gray-500 font-medium px-1">
        মোট {productCountBn}টি পণ্য দেখানো হচ্ছে
      </div>

      {/* Product List or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-200 ${isPending ? 'opacity-60' : 'opacity-100'}`}>
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            অন্য কোনো ক্যাটাগরি দেখতে পারেন অথবা হোম পেজে ফিরে যান।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}
    </div>
  );
}
