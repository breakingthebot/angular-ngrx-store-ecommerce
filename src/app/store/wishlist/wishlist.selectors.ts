/*
 * store/wishlist/wishlist.selectors.ts
 * Selector functions query wishlist items and favorites checks.
 * Created: 2026-07-20
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.reducer';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectWishlistItems = createSelector(
  selectWishlistState,
  (state: WishlistState) => state?.items || []
);

export const selectWishlistTotalItems = createSelector(
  selectWishlistItems,
  (items) => items.length
);

export const selectIsProductInWishlist = (productId: string) => createSelector(
  selectWishlistItems,
  (items) => items.some(item => item.id === productId)
);
