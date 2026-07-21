/*
 * store/product/product.selectors.ts
 * Builds selector targets for catalog arrays, loading conditions, and errors.
 * Connects to: store/product/product.reducer.ts
 * Created: 2026-07-20
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('catalog');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);
