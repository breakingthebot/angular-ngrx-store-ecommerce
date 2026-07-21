/*
 * store/product/product.actions.ts
 * Configures e-commerce catalog store loading action classes.
 * Created: 2026-07-20
 */

import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction(
  '[Catalog] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Catalog] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Catalog] Load Products Failure',
  props<{ error: string }>()
);
