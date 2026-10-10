import { Category, Product } from '@/types';
import backupData from './data-backup.json';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';

async function fetchFromBazar(endpoint: string) {
  const urls = [BASE_URL_1, BASE_URL_2];
  for (const base of urls) {
    try {
      const res = await fetch(`${base}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // try next url
    }
  }
  return null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromBazar('/categories');
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return (backupData.categories as Category[]) || [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const data = await fetchFromBazar(`/categories/${slug}`);
  if (data && data.slug) {
    return data;
  }
  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const endpoint = categorySlug ? `/products?category=${categorySlug}` : '/products';
  const data = await fetchFromBazar(endpoint);
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  const allBackup = (backupData.products as Product[]) || [];
  if (categorySlug) {
    return allBackup.filter(
      (p) => p.category === categorySlug || p.slug === categorySlug
    );
  }
  return allBackup;
}

export async function getProduct(slugOrId: string): Promise<Product | null> {
  // If numeric, try /products/:id directly
  if (!isNaN(Number(slugOrId))) {
    const singleData = await fetchFromBazar(`/products/${slugOrId}`);
    if (singleData && singleData.id) {
      return singleData;
    }
  }

  // Otherwise, fetch all products and find matching slug or id
  const all = await getProducts();
  const found = all.find(
    (p) => p.slug === slugOrId || p.id.toString() === slugOrId
  );
  if (found) return found;

  // Also check single endpoint in case it works with slug
  const direct = await fetchFromBazar(`/products/${slugOrId}`);
  if (direct && direct.id) {
    return direct;
  }

  return null;
}
