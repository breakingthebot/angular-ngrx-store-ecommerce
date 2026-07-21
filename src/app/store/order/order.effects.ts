/*
 * store/order/order.effects.ts
 * Intercepts placeOrder actions, computes totals, clears cart state, and emits order confirmations.
 * Connects to: store/order/order.actions.ts, store/cart/cart.selectors.ts, store/cart/cart.actions.ts
 * Created: 2026-07-20
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import * as OrderActions from './order.actions';
import * as CartActions from '../cart/cart.actions';
import { selectCartItems, selectCartSubtotal } from '../cart/cart.selectors';
import { Order } from '../../models/order.model';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrder),
      withLatestFrom(
        this.store.select(selectCartItems),
        this.store.select(selectCartSubtotal)
      ),
      mergeMap(([{ shipping, payment }, items, subtotal]) => {
        const shippingFee = subtotal >= 150 ? 0 : 9.99;
        const tax = Number((subtotal * 0.08).toFixed(2));
        const total = Number((subtotal + shippingFee + tax).toFixed(2));
        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const cardLast4 = payment.cardNumber ? payment.cardNumber.slice(-4) : '4242';

        const order: Order = {
          id: orderId,
          items: [...items],
          shipping,
          paymentMethod: `Credit Card (**** ${cardLast4})`,
          subtotal,
          shippingFee,
          tax,
          total,
          createdAt: new Date(),
          status: 'Processing'
        };

        // Clear shopping cart items
        this.store.dispatch(CartActions.clearCart());

        return [OrderActions.placeOrderSuccess({ order })];
      })
    )
  );
}
