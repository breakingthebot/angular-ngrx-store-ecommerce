/*
 * components/checkout/checkout.component.ts
 * Multi-step checkout wizard with Reactive Forms validation and NgRx order dispatching.
 * Connects to: store/order/order.actions.ts, store/order/order.selectors.ts, store/cart/cart.selectors.ts
 * Created: 2026-07-20
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

// Material Imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Store & Models
import { CartItem } from '../../models/cart.model';
import { Order } from '../../models/order.model';
import * as OrderActions from '../../store/order/order.actions';
import { selectCartItems, selectCartSubtotal } from '../../store/cart/cart.selectors';
import { selectCurrentOrder, selectIsPlacingOrder } from '../../store/order/order.selectors';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  subtotal$: Observable<number> = this.store.select(selectCartSubtotal);
  currentOrder$: Observable<Order | null> = this.store.select(selectCurrentOrder);
  isPlacingOrder$: Observable<boolean> = this.store.select(selectIsPlacingOrder);

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      fullName: ['Alex Morgan', [Validators.required, Validators.minLength(3)]],
      email: ['alex.morgan@example.com', [Validators.required, Validators.email]],
      addressLine: ['742 Evergreen Terrace', [Validators.required]],
      city: ['Springfield', [Validators.required]],
      state: ['IL', [Validators.required]],
      zipCode: ['62704', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });

    this.paymentForm = this.fb.group({
      cardholderName: ['Alex Morgan', [Validators.required]],
      cardNumber: ['4532 8912 3456 7890', [Validators.required, Validators.minLength(16)]],
      expirationDate: ['12/28', [Validators.required]],
      cvv: ['888', [Validators.required, Validators.minLength(3)]]
    });
  }

  submitOrder(): void {
    if (this.shippingForm.valid && this.paymentForm.valid) {
      this.store.dispatch(
        OrderActions.placeOrder({
          shipping: this.shippingForm.value,
          payment: this.paymentForm.value
        })
      );
    }
  }

  continueShopping(): void {
    this.store.dispatch(OrderActions.resetCurrentOrder());
    this.router.navigate(['/catalog']);
  }
}
