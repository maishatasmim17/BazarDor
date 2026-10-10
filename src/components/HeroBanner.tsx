'use client';

import React, { useState, useEffect } from 'react';
import { HeroIllustration } from './HeroIllustration';
import { formatBanglaDateFromDate } from '@/lib/utils';

export function HeroBanner() {
  const [banglaDate, setBanglaDate] = useState('মঙ্গলবার, ৬ অক্টোবর, ২০২৬');

  useEffect(() => {
    setBanglaDate(formatBanglaDateFromDate(new Date()));
  }, []);

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('সব-পণ্য');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 sm:p-10 md:p-12 mb-8 md:mb-12 overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Content */}
        <div className="max-w-xl text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 mb-4 border border-emerald-100/50">
            <span>{banglaDate}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-gray-900 tracking-tight leading-tight mb-3">
            আজকের বাজারের দাম এক নজরে
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Primary CTA Button */}
          <a
            href="#সব-পণ্য"
            onClick={handleScrollToProducts}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm sm:text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Hero Illustration */}
        <div className="w-full md:w-auto flex justify-center shrink-0">
          <HeroIllustration className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80" />
        </div>
      </div>
    </section>
  );
}
