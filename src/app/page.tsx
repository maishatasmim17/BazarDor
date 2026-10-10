import React from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

export default async function HomePage() {
  const products = await getProducts();

  // Top 6 risers: dir === 'up', sorted descending by pct
  const risers = products
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 fallers: dir === 'down', sorted descending by pct
  const fallers = products
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10 md:space-y-14">
      {/* 2. Hero Banner */}
      <HeroBanner />

      {/* 3. Section A — আজ দাম বেড়েছে ▲ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 font-bold text-lg">▲</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            আজ দাম বেড়েছে
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Section B — আজ দাম কমেছে ▼ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-emerald-600 font-bold text-lg">▼</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            আজ দাম কমেছে
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Section C — সব পণ্য */}
      <section id="সব-পণ্য" className="scroll-mt-24 pt-2">
        <div className="mb-5">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            প্রতি কেজিতে / প্যাকেটে আজকের বাজার দর
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
