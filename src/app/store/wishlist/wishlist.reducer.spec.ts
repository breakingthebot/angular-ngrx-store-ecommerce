/*
 * store/wishlist/wishlist.reducer.spec.ts
 * Asserts wishlist reducer toggling and clearing mutations.
 * Created: 2026-07-20
 */

import { wishlistReducer, initialWishlistState } from './wishlist.reducer';
import { WishlistActions } from './wishlist.actions';
import { Product } from '../../models/product.model';

describe('Wishlist Reducer', () => {
  const dummyProduct: Product = {
    id: 'PROD-101',
    name: 'Zenith Carbon Road Bike',
    category: 'Gear & Outdoors',
    price: 1899.99,
    description: 'Ultra-lightweight aerodynamic carbon composite frame.',
    imageUrl: 'https://example.com/bike.jpg',
    stock: 5,
    rating: 4.8
  };

  it('should toggle adding a product to wishlist', () => {
    const action = WishlistActions.toggleWishlist({ product: dummyProduct });
    const state = wishlistReducer(initialWishlistState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe('PROD-101');
  });

  it('should toggle removing a product from wishlist if it already exists', () => {
    const populatedState = {
      items: [dummyProduct]
    };
    const action = WishlistActions.toggleWishlist({ product: dummyProduct });
    const state = wishlistReducer(populatedState, action);

    expect(state.items.length).toBe(0);
  });

  it('should clear all wishlist items', () => {
    const populatedState = {
      items: [dummyProduct]
    };
    const action = WishlistActions.clearWishlist();
    const state = wishlistReducer(populatedState, action);

    expect(state.items.length).toBe(0);
  });
});
