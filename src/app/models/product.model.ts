/*
 * models/product.model.ts
 * Defines the core Product and ProductReview interface schemas for catalog entries.
 * Created: 2026-07-20
 */

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  stock: number;
  reviewsCount?: number;
  features?: string[];
  reviews?: ProductReview[];
}
