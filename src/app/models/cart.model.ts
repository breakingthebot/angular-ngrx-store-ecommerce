/*
 * models/cart.model.ts
 * Defines shopping cart item and calculation TypeScript schemas.
 * Connects to: models/product.model.ts
 * Created: 2026-07-20
 */

import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
