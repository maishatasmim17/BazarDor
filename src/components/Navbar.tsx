'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatBanglaDateFromDate } from '@/lib/utils';
import { Category, Product } from '@/types';
import { PriceTicker } from './PriceTicker';
import { ChevronDown, User as UserIcon, LogOut, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
  products: Product[];
}

export function Navbar({ categories, products }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [banglaDate, setBanglaDate] = useState('মঙ্গলবার, ৬ অক্টোবর, ২০২৬');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBanglaDate(formatBanglaDateFromDate(new Date()));
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-xs sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Row: Logo & Auth */}
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo & Bengali Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-800 transition-colors">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                বাজার দর
              </h1>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium mt-1">
                {banglaDate}
              </p>
            </div>
          </Link>

          {/* Right Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left"
                >
                  <img
                    src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <span className="hidden sm:inline font-semibold text-sm text-gray-800">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 transition-transform duration-200" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }} />
                </button>

                {/* Dropdown Menu matching Figma Screenshot 3 */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2.5 bg-gray-50/70 rounded-xl mb-1">
                      <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-xl transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-emerald-600" />
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50/80 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-emerald-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Navigation Category Links */}
        <nav className="flex items-center gap-1.5 md:gap-2 py-2 overflow-x-auto no-scrollbar border-t border-gray-100/70">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}` || pathname === `/category/${cat.id}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-100/80'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Marquee Price Ticker Below Navbar */}
      <PriceTicker products={products} />
    </header>
  );
}
