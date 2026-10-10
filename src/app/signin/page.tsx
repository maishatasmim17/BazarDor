'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Lock } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const isProtectedRedirect = callbackUrl !== '/' && (callbackUrl.includes('/product/') || callbackUrl.includes('/profile'));

  const { login, socialLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('সবগুলো ঘর পূরণ করুন');
      return;
    }

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      router.push(callbackUrl);
    } else {
      setErrorMessage('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে');
    }
  };

  return (
    <div className="py-6 sm:py-10 max-w-md mx-auto">
      {/* Page Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          সাইন ইন করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টে প্রবেশ করে বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Protected Route Notice Banner */}
      {isProtectedRedirect && (
        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100/80 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span>পণ্যের বিস্তারিত তথ্য ও বাজার দর দেখতে অনুগ্রহ করে সাইন ইন করুন।</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
          >
            {isSubmitting ? 'প্রবেশ করা হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400 font-medium">অথবা</span>
          </div>
        </div>

        {/* Social Login Buttons with callbackUrl support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => socialLogin('google', callbackUrl)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => socialLogin('github', callbackUrl)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Switch Link with callbackUrl forwarded */}
        <div className="mt-6 text-center text-xs text-gray-500 font-medium">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href={callbackUrl !== '/' ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/signup'}
            className="text-emerald-700 font-bold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Return home */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500">লোড হচ্ছে...</div>}>
      <SignInContent />
    </Suspense>
  );
}
