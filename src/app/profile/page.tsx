'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, ShieldCheck, Edit3, LogOut, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('প্রোফাইল দেখতে সাইন ইন করুন');
      router.replace('/signin?callbackUrl=/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="py-16 text-center text-sm text-gray-500 animate-pulse">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700" />

        {/* User Avatar */}
        <div className="relative inline-block mb-4 mt-2">
          <img
            src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
            alt={user.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md mx-auto"
          />
          <div className="absolute bottom-0 right-1 w-6 h-6 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-white" title="সক্রিয়">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* User Info */}
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {user.name}
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1 flex items-center justify-center gap-1.5">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{user.email}</span>
        </p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 my-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>যাচাইকৃত ইউজার প্রোফাইল</span>
        </div>

        {/* Information Fields */}
        <div className="bg-gray-50/70 rounded-2xl p-4 sm:p-5 text-left space-y-3.5 my-6 border border-gray-100">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-500 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              পূর্ণ নাম:
            </span>
            <span className="font-bold text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-gray-200/60">
            <span className="text-gray-500 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              ইমেইল অ্যাড্রেস:
            </span>
            <span className="font-bold text-gray-900">{user.email}</span>
          </div>
        </div>

        {/* Action Buttons: Challenge C3 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Update button takes user to /profile/update */}
          <Link
            href="/profile/update"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all duration-150"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য পরিবর্তন করুন</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100/80 border border-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
