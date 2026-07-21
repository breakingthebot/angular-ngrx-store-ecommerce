/*
 * store/wishlist/wishlist.reducer.ts
 * Mutates wishlist bookmarking array states.
 * Created: 2026-07-20
 */

import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { WishlistActions } from './wishlist.actions';

export interface WishlistState {
  items: Product[];
}

export const initialWishlistState: WishlistState = {
  items: []
};

export const wishlistReducer = createReducer(
  initialWishlistState,
  on(WishlistActions.toggleWishlist, (state, { product }) => {
    const exists = state.items.some(item => item.id === product.id);
    const updatedItems = exists
      ? state.items.filter(item => item.id !== product.id)
      : [...state.items, product];
    return {
      ...state,
      items: updatedItems
    };
  }),
  on(WishlistActions.clearWishlist, () => initialWishlistState)
);
