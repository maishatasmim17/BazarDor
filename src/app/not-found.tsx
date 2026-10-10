import React from 'react';
import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
        <SearchX className="w-10 h-10" />
      </div>

      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 mb-3">
        ৪০৪ - পৃষ্ঠাটি পাওয়া যায়নি
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
        কাঙ্ক্ষিত পাতা খুঁজে পাওয়া যায়নি
      </h1>

      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        আপনি যে পাতাটি খুঁজছেন তা মুছে ফেলা হয়েছে, লিঙ্কটি পরিবর্তিত হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all duration-150"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
