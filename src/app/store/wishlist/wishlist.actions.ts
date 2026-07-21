/*
 * store/wishlist/wishlist.actions.ts
 * Formulates wishlist bookmarking action creators.
 * Created: 2026-07-20
 */

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const WishlistActions = createActionGroup({
  source: 'Wishlist',
  events: {
    'Toggle Wishlist': props<{ product: Product }>(),
    'Clear Wishlist': emptyProps()
  }
});
