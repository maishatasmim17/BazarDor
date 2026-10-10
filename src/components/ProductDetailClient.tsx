'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { DetailSkeleton } from '@/components/SkeletonLoader';
import {
  toBengaliNumber,
  formatPriceWithCommas,
  getUnitLabelBn,
  getUnitShortBn,
  formatPriceNumber,
} from '@/lib/utils';
import toast from 'react-hot-toast';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  slug: string;
}

export function ProductDetailClient({ product, slug }: ProductDetailClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('পণ্য বিবরণ দেখতে অনুগ্রহ করে সাইন ইন করুন');
      router.replace(`/signin?callbackUrl=/product/${slug}`);
    }
  }, [user, isLoading, router, slug]);

  if (isLoading || !user) {
    return <DetailSkeleton />;
  }

  // Calculations for market stats
  const markets = product.markets || [];
  const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  
  // Calculate market average
  const avgPrice = markets.length > 0 
    ? markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length 
    : product.today;

  // Price difference vs yesterday
  const diff = product.today - (product.yesterday || product.today);
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';
  const pctBn = toBengaliNumber(product.change.pct.toFixed(1));
  const unitShort = getUnitShortBn(product.unit);

  let differenceText = 'গতকালের তুলনায় আজ দাম অপরিবর্তিত';
  if (diff > 0) {
    differenceText = `গতকালের তুলনায় আজ দাম বেড়েছে • ${toBengaliNumber(Math.abs(diff))} টাকা`;
  } else if (diff < 0) {
    differenceText = `গতকালের তুলনায় আজ দাম কমেছে • ${toBengaliNumber(Math.abs(diff))} টাকা`;
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation matching Figma Screenshot 5 */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate">
          {product.nameBn}
        </span>
      </nav>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
            <span>{product.image || product.categoryIcon || '🛒'}</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {getUnitLabelBn(product.unit)} • {product.categoryNameBn}
            </p>
            <p className="text-xs font-semibold text-gray-600 mt-2 flex items-center gap-1.5">
              <span>{differenceText}</span>
            </p>
          </div>
        </div>

        {/* Right Price Box */}
        <div className="w-full md:w-auto bg-gray-50/80 rounded-2xl p-4 sm:px-6 sm:py-4 border border-gray-100 text-center md:min-w-[160px] shrink-0">
          <div className="text-[11px] font-semibold text-gray-500">
            আজকের দাম
          </div>
          <div className="text-3xl sm:text-4xl font-black text-gray-900 my-0.5">
            {formatPriceWithCommas(product.today)}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            টাকা / {unitShort}
          </div>
          <div className="mt-2">
            {isUp && (
              <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                <span>▲</span> {pctBn}%
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span>▼</span> {pctBn}%
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-gray-100 text-gray-600">
                <span>—</span> ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            দামের সারসংক্ষেপ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Minimum Price */}
          <div className="bg-gray-50/70 rounded-2xl p-5 border border-gray-100">
            <span className="text-xs font-semibold text-gray-500">
              সর্বনিম্ন দাম
            </span>
            <div className="text-2xl font-black text-emerald-600 mt-1 mb-0.5">
              {formatPriceWithCommas(minPrice)} টাকা
            </div>
            <p className="text-xs text-gray-500 font-medium">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Maximum Price */}
          <div className="bg-gray-50/70 rounded-2xl p-5 border border-gray-100">
            <span className="text-xs font-semibold text-gray-500">
              সর্বাধিক দাম
            </span>
            <div className="text-2xl font-black text-red-500 mt-1 mb-0.5">
              {formatPriceWithCommas(maxPrice)} টাকা
            </div>
            <p className="text-xs text-gray-500 font-medium">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average Price */}
          <div className="bg-gray-50/70 rounded-2xl p-5 border border-gray-100">
            <span className="text-xs font-semibold text-gray-500">
              গড় দাম
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1 mb-0.5">
              {formatPriceNumber(Math.round(avgPrice))} টাকা
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {getUnitLabelBn(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market-wise Price Table */}
        <div className="pt-4">
          <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-4">
            বাজারভিত্তিক আজকের দাম
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-gray-200/70">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-600 font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                  <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">সর্বনিম্ন</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">সর্বাধিক</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-800">
                {markets.map((m, idx) => {
                  const mAvg = (m.min + m.max) / 2;
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                        {formatPriceWithCommas(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                        {formatPriceWithCommas(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-gray-900">
                        {formatPriceNumber(mAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div>
        <Link
          href={`/category/${product.category}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{product.categoryNameBn} ক্যাটাগরিতে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
