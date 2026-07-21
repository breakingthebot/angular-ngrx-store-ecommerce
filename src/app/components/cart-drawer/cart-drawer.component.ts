/*
 * components/cart-drawer/cart-drawer.component.ts
 * Manages side-drawer overlays, quantity increments, item removals, and free shipping triggers.
 * Connects to: store/cart/cart.selectors.ts, store/cart/cart.actions.ts
 * Created: 2026-07-20
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Store & Models
import { CartItem } from '../../models/cart.model';
import * as CartActions from '../../store/cart/cart.actions';
import {
  selectCartItems,
  selectIsCartDrawerOpen,
  selectCartSubtotal,
  selectFreeShippingProgress
} from '../../store/cart/cart.selectors';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.css'
})
export class CartDrawerComponent {
  private store = inject(Store);

  isOpen$: Observable<boolean> = this.store.select(selectIsCartDrawerOpen);
  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  subtotal$: Observable<number> = this.store.select(selectCartSubtotal);
  freeShipping$ = this.store.select(selectFreeShippingProgress);

  closeDrawer(): void {
    this.store.dispatch(CartActions.closeCartDrawer());
  }

  incrementQuantity(item: CartItem): void {
    this.store.dispatch(
      CartActions.updateQuantity({
        productId: item.product.id,
        quantity: item.quantity + 1
      })
    );
  }

  decrementQuantity(item: CartItem): void {
    this.store.dispatch(
      CartActions.updateQuantity({
        productId: item.product.id,
        quantity: item.quantity - 1
      })
    );
  }

  removeItem(productId: string): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}
