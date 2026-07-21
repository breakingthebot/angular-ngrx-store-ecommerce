/*
 * store/product/product.reducer.spec.ts
 * Tests catalog slice reducer transitions.
 * Created: 2026-07-20
 */

import { productReducer, initialProductState } from './product.reducer';
import * as ProductActions from './product.actions';
import { Product } from '../../models/product.model';

describe('Product Reducer', () => {
  const mockProducts: Product[] = [
    {
      id: 'PROD-101',
      name: 'Zenith Carbon Road Bike',
      category: 'Gear & Outdoors',
      price: 1899.99,
      description: 'Ultra-lightweight aerodynamic carbon composite frame.',
      imageUrl: 'https://example.com/bike.jpg',
      stock: 5,
      rating: 4.8
    }
  ];

  it('should set loading to true on loadProducts action', () => {
    const action = ProductActions.loadProducts();
    const state = productReducer(initialProductState, action);

    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should populate products and reset loading on loadProductsSuccess', () => {
    const action = ProductActions.loadProductsSuccess({ products: mockProducts });
    const state = productReducer(initialProductState, action);

    expect(state.products).toEqual(mockProducts);
    expect(state.loading).toBeFalse();
  });

  it('should set error message on loadProductsFailure', () => {
    const action = ProductActions.loadProductsFailure({ error: 'Server unavailable' });
    const state = productReducer(initialProductState, action);

    expect(state.error).toBe('Server unavailable');
    expect(state.loading).toBeFalse();
  });
});
