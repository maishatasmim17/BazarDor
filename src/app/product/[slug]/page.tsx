import React from 'react';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/api';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  const paths: { slug: string }[] = [];
  products.forEach((p) => {
    if (p.slug) paths.push({ slug: p.slug });
    if (p.id) paths.push({ slug: p.id.toString() });
  });
  return paths;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি - বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} - আজকের বাজার দর ও মূল্য তালিকা | বাজার দর`,
    description: `${product.nameBn}-এর আজকের গড়, সর্বনিম্ন ও সর্বাধিক বাজার দর।`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          অনুরোধকৃত পণ্যটি ডেটাবেজে নেই অথবা লিঙ্কটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return <ProductDetailClient product={product} slug={slug} />;
}
