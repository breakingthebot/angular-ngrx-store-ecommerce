/*
 * store/order/order.reducer.spec.ts
 * Tests order reducer state transitions.
 * Created: 2026-07-20
 */

import { orderReducer, initialOrderState } from './order.reducer';
import * as OrderActions from './order.actions';
import { Order } from '../../models/order.model';

describe('Order Reducer', () => {
  const mockOrder: Order = {
    id: 'ORD-987654',
    items: [],
    shipping: {
      fullName: 'Alex Morgan',
      email: 'alex@example.com',
      addressLine: '123 Main St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601'
    },
    paymentMethod: 'Credit Card (**** 7890)',
    subtotal: 100,
    shippingFee: 9.99,
    tax: 8.00,
    total: 117.99,
    createdAt: new Date(),
    status: 'Processing'
  };

  it('should set isPlacingOrder to true on placeOrder action', () => {
    const action = OrderActions.placeOrder({
      shipping: mockOrder.shipping,
      payment: { cardholderName: 'Alex', cardNumber: '1234567812347890', expirationDate: '12/28', cvv: '123' }
    });
    const state = orderReducer(initialOrderState, action);

    expect(state.isPlacingOrder).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should store order and set currentOrder on placeOrderSuccess', () => {
    const action = OrderActions.placeOrderSuccess({ order: mockOrder });
    const state = orderReducer(initialOrderState, action);

    expect(state.orders.length).toBe(1);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.isPlacingOrder).toBeFalse();
  });

  it('should reset currentOrder on resetCurrentOrder action', () => {
    const state1 = orderReducer(initialOrderState, OrderActions.placeOrderSuccess({ order: mockOrder }));
    const state2 = orderReducer(state1, OrderActions.resetCurrentOrder());

    expect(state2.currentOrder).toBeNull();
  });
});
