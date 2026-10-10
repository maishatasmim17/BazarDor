import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Suspense } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCategories, getProducts } from '@/lib/api';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'বাজার দর - প্রয়োজনীয় পণ্যের আজকের বাজার দর এক নজরে',
  description: 'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, হ্রাস-বৃদ্ধি ও বাজারভিত্তিক তুলনামূলক দাম।',
  keywords: ['বাজার দর', 'bazardor', 'market price bangladesh', 'chal dal sobji macher dam', 'bazar dor'],
  authors: [{ name: 'BazarDor' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <html lang="bn" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-gray-900 font-sans antialiased">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <Suspense fallback={<div className="h-28 bg-white border-b border-gray-100" />}>
            <Navbar categories={categories} products={products} />
          </Suspense>
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
            <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500">লোড হচ্ছে...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
