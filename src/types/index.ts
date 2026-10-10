export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}
