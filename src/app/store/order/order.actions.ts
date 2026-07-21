/*
 * store/order/order.actions.ts
 * Formulates order placement and status actions.
 * Connects to: models/order.model.ts
 * Created: 2026-07-20
 */

import { createAction, props } from '@ngrx/store';
import { ShippingAddress, PaymentDetails, Order } from '../../models/order.model';

export const placeOrder = createAction(
  '[Checkout] Place Order',
  props<{ shipping: ShippingAddress; payment: PaymentDetails }>()
);

export const placeOrderSuccess = createAction(
  '[Checkout] Place Order Success',
  props<{ order: Order }>()
);

export const placeOrderFailure = createAction(
  '[Checkout] Place Order Failure',
  props<{ error: string }>()
);

export const resetCurrentOrder = createAction(
  '[Checkout] Reset Current Order'
);
