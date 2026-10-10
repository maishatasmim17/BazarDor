import React from 'react';
import Link from 'next/link';
import { getCategory, getCategories, getProducts } from '@/lib/api';
import { CategoryClient } from '@/components/CategoryClient';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  const paths: { slug: string }[] = [];
  categories.forEach((c) => {
    if (c.slug) paths.push({ slug: c.slug });
    if (c.id && c.id !== c.slug) paths.push({ slug: c.id });
  });
  return paths;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'ক্যাটাগরি পাওয়া যায়নি - বাজার দর',
    };
  }

  return {
    title: `${category.nameBn} - আজকের বাজার দর | বাজার দর`,
    description: `${category.nameBn} ক্যাটাগরির আজকের পাইকারি ও খুচরা বাজার দর এবং পরিবর্তনের হার।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ক্যাটাগরি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          অনুরোধকৃত ক্যাটাগরিটি বিদ্যমান নেই অথবা মুছে ফেলা হয়েছে।
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

  const products = await getProducts(category.slug);

  return <CategoryClient category={category} initialProducts={products} />;
}
