/*
 * store/cart/cart.actions.ts
 * Formulates cart manipulation actions.
 * Connects to: models/product.model.ts
 * Created: 2026-07-20
 */

import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: string }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: string; quantity: number }>()
);

export const clearCart = createAction(
  '[Cart] Clear Items'
);

export const toggleCartDrawer = createAction(
  '[Cart] Toggle Drawer'
);

export const openCartDrawer = createAction(
  '[Cart] Open Drawer'
);

export const closeCartDrawer = createAction(
  '[Cart] Close Drawer'
);
