/*
 * store/order/order.selectors.ts
 * Formulates selector queries for orders history and active order confirmations.
 * Connects to: store/order/order.reducer.ts
 * Created: 2026-07-20
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectAllOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);

export const selectCurrentOrder = createSelector(
  selectOrderState,
  (state: OrderState) => state.currentOrder
);

export const selectIsPlacingOrder = createSelector(
  selectOrderState,
  (state: OrderState) => state.isPlacingOrder
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error
);
