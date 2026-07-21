/*
 * store/cart/cart.reducer.spec.ts
 * Tests cart reducer action handlers.
 * Created: 2026-07-20
 */

import { cartReducer, initialCartState } from './cart.reducer';
import * as CartActions from './cart.actions';
import { Product } from '../../models/product.model';

describe('Cart Reducer', () => {
  const mockProduct: Product = {
    id: 'PROD-101',
    name: 'Zenith Carbon Road Bike',
    category: 'Gear & Outdoors',
    price: 1899.99,
    description: 'Ultra-lightweight aerodynamic carbon composite frame.',
    imageUrl: 'https://example.com/bike.jpg',
    stock: 5,
    rating: 4.8
  };

  it('should add a new product to cart items and open drawer', () => {
    const action = CartActions.addToCart({ product: mockProduct });
    const state = cartReducer(initialCartState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].product.id).toBe('PROD-101');
    expect(state.items[0].quantity).toBe(1);
    expect(state.isDrawerOpen).toBeTrue();
  });

  it('should increment quantity if product already exists in cart', () => {
    const state1 = cartReducer(initialCartState, CartActions.addToCart({ product: mockProduct }));
    const state2 = cartReducer(state1, CartActions.addToCart({ product: mockProduct }));

    expect(state2.items.length).toBe(1);
    expect(state2.items[0].quantity).toBe(2);
  });

  it('should remove item when removeFromCart is dispatched', () => {
    const state1 = cartReducer(initialCartState, CartActions.addToCart({ product: mockProduct }));
    const state2 = cartReducer(state1, CartActions.removeFromCart({ productId: 'PROD-101' }));

    expect(state2.items.length).toBe(0);
  });

  it('should update quantity when updateQuantity is dispatched', () => {
    const state1 = cartReducer(initialCartState, CartActions.addToCart({ product: mockProduct }));
    const state2 = cartReducer(state1, CartActions.updateQuantity({ productId: 'PROD-101', quantity: 5 }));

    expect(state2.items[0].quantity).toBe(5);
  });

  it('should remove item if updateQuantity is set to 0', () => {
    const state1 = cartReducer(initialCartState, CartActions.addToCart({ product: mockProduct }));
    const state2 = cartReducer(state1, CartActions.updateQuantity({ productId: 'PROD-101', quantity: 0 }));

    expect(state2.items.length).toBe(0);
  });

  it('should clear all items on clearCart action', () => {
    const state1 = cartReducer(initialCartState, CartActions.addToCart({ product: mockProduct }));
    const state2 = cartReducer(state1, CartActions.clearCart());

    expect(state2.items.length).toBe(0);
  });

  it('should toggle isDrawerOpen property', () => {
    const state1 = cartReducer(initialCartState, CartActions.toggleCartDrawer());
    expect(state1.isDrawerOpen).toBeTrue();

    const state2 = cartReducer(state1, CartActions.toggleCartDrawer());
    expect(state2.isDrawerOpen).toBeFalse();
  });
});
