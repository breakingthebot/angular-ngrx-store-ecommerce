/*
 * models/product.model.ts
 * Defines the core Product interface schema for catalog store entries.
 * Created: 2026-07-20
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  stock: number;
}
