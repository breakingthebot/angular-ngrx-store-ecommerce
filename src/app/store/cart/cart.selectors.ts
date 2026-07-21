/*
 * store/cart/cart.selectors.ts
 * Formulates selector lookups for cart items, counts, subtotals, and shipping thresholds.
 * Connects to: store/cart/cart.reducer.ts
 * Created: 2026-07-20
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectIsCartDrawerOpen = createSelector(
  selectCartState,
  (state: CartState) => state.isDrawerOpen
);

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

export const selectFreeShippingProgress = createSelector(
  selectCartSubtotal,
  (subtotal) => {
    const threshold = 150.0;
    const remaining = Math.max(0, threshold - subtotal);
    const progressPercentage = Math.min(100, (subtotal / threshold) * 100);
    const isQualified = subtotal >= threshold;

    return {
      subtotal,
      threshold,
      remaining,
      progressPercentage,
      isQualified
    };
  }
);
