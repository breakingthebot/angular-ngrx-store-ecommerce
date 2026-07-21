/*
 * store/cart/cart.reducer.ts
 * Formulates shopping cart state transformations.
 * Connects to: models/cart.model.ts, store/cart/cart.actions.ts
 * Created: 2026-07-20
 */

import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models/cart.model';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

export const initialCartState: CartState = {
  items: [],
  isDrawerOpen: false
};

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addToCart, (state, { product }) => {
    const existingIndex = state.items.findIndex(item => item.product.id === product.id);
    let updatedItems: CartItem[];

    if (existingIndex > -1) {
      updatedItems = state.items.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...state.items, { product, quantity: 1 }];
    }

    return {
      ...state,
      items: updatedItems,
      isDrawerOpen: true
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.product.id !== productId)
  })),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId)
      };
    }

    return {
      ...state,
      items: state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    };
  }),

  on(CartActions.clearCart, (state) => ({
    ...state,
    items: []
  })),

  on(CartActions.toggleCartDrawer, (state) => ({
    ...state,
    isDrawerOpen: !state.isDrawerOpen
  })),

  on(CartActions.openCartDrawer, (state) => ({
    ...state,
    isDrawerOpen: true
  })),

  on(CartActions.closeCartDrawer, (state) => ({
    ...state,
    isDrawerOpen: false
  }))
);
