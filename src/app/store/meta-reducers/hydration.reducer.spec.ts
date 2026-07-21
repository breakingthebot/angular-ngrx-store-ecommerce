/*
 * store/meta-reducers/hydration.reducer.spec.ts
 * Tests NgRx MetaReducer hydration from and persistence to localStorage.
 * Created: 2026-07-20
 */

import { INIT } from '@ngrx/store';
import { hydrationMetaReducer, STORAGE_KEY } from './hydration.reducer';

describe('Hydration MetaReducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should hydrate state from localStorage on INIT action', () => {
    const mockSavedState = {
      cart: { items: [{ product: { id: 'P1', name: 'Bike' }, quantity: 2 }], isDrawerOpen: false },
      order: { orders: [], currentOrder: null, isPlacingOrder: false, error: null },
      wishlist: { items: [] }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockSavedState));

    const dummyReducer = (state: any) => state;
    const metaReducer = hydrationMetaReducer(dummyReducer);

    const initialState = { catalog: { products: [] } };
    const resultState = metaReducer(initialState, { type: INIT });

    expect(resultState.cart).toEqual(mockSavedState.cart);
    expect(resultState.order).toEqual(mockSavedState.order);
    expect(resultState.wishlist).toEqual(mockSavedState.wishlist);
  });

  it('should persist cart and order slices to localStorage on action dispatch', () => {
    const dummyReducer = (state: any) => ({
      cart: { items: [{ product: { id: 'P2', name: 'Shoes' }, quantity: 1 }], isDrawerOpen: true },
      order: { orders: [], currentOrder: null, isPlacingOrder: false, error: null },
      wishlist: { items: [] }
    });

    const metaReducer = hydrationMetaReducer(dummyReducer);
    metaReducer({}, { type: 'SOME_ACTION' });

    const savedValue = localStorage.getItem(STORAGE_KEY);
    expect(savedValue).not.toBeNull();

    const parsed = JSON.parse(savedValue!);
    expect(parsed.cart.items[0].product.name).toBe('Shoes');
  });
});
