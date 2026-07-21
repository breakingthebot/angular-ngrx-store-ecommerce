/*
 * store/product/product.reducer.ts
 * Formulates state transformations and initial properties for the catalog slice.
 * Connects to: store/product/product.actions.ts, models/product.model.ts
 * Created: 2026-07-20
 */

import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import * as ProductActions from './product.actions';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
