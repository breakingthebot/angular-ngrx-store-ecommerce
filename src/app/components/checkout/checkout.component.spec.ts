/*
 * components/checkout/checkout.component.spec.ts
 * Tests checkout stepper forms validation and order placement store dispatches.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CheckoutComponent } from './checkout.component';
import * as OrderActions from '../../store/order/order.actions';
import { selectCartItems, selectCartSubtotal } from '../../store/cart/cart.selectors';
import { selectCurrentOrder, selectIsPlacingOrder } from '../../store/order/order.selectors';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        provideAnimationsAsync(),
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectCartItems, value: [] },
            { selector: selectCartSubtotal, value: 0 },
            { selector: selectCurrentOrder, value: null },
            { selector: selectIsPlacingOrder, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create checkout component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize valid shipping and payment reactive forms', () => {
    fixture.detectChanges();
    expect(component.shippingForm.valid).toBeTrue();
    expect(component.paymentForm.valid).toBeTrue();
  });

  it('should dispatch placeOrder on submitOrder() call', () => {
    fixture.detectChanges();
    component.submitOrder();

    expect(store.dispatch).toHaveBeenCalledWith(
      OrderActions.placeOrder({
        shipping: component.shippingForm.value,
        payment: component.paymentForm.value
      })
    );
  });
});
