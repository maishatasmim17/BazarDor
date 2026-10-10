'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Save, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const { user, isLoading, updateProfileName } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('অনুগ্রহ করে আগে সাইন ইন করুন');
      router.replace('/signin?callbackUrl=/profile/update');
    } else if (user) {
      setName(user.name);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="py-16 text-center text-sm text-gray-500 animate-pulse">
        লোড হচ্ছে...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নাম ফাঁকা রাখা যাবে না');
      return;
    }

    setIsSubmitting(true);
    const success = await updateProfileName(name.trim());
    setIsSubmitting(false);

    if (success) {
      router.push('/profile');
    }
  };

  return (
    <div className="py-6 sm:py-10 max-w-md mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Update Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
            <UserIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name-input"
              className="block text-xs font-bold text-gray-700 mb-1.5"
            >
              নাম (Name)
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">
              ইমেইল (অপরিবর্তনযোগ্য)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'আপডেট করা হচ্ছে...' : 'তথ্য আপডেট করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
