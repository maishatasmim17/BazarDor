import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-gray-200/80 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-medium">
        <div>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
