/*
 * store/order/order.reducer.ts
 * Formulates order history and placement state transformations.
 * Connects to: models/order.model.ts, store/order/order.actions.ts
 * Created: 2026-07-20
 */

import { createReducer, on } from '@ngrx/store';
import { Order } from '../../models/order.model';
import * as OrderActions from './order.actions';

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isPlacingOrder: boolean;
  error: string | null;
}

export const initialOrderState: OrderState = {
  orders: [],
  currentOrder: null,
  isPlacingOrder: false,
  error: null
};

export const orderReducer = createReducer(
  initialOrderState,

  on(OrderActions.placeOrder, (state) => ({
    ...state,
    isPlacingOrder: true,
    error: null
  })),

  on(OrderActions.placeOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [order, ...state.orders],
    currentOrder: order,
    isPlacingOrder: false
  })),

  on(OrderActions.placeOrderFailure, (state, { error }) => ({
    ...state,
    isPlacingOrder: false,
    error
  })),

  on(OrderActions.resetCurrentOrder, (state) => ({
    ...state,
    currentOrder: null
  }))
);
