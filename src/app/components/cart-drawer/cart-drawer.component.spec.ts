/*
 * components/cart-drawer/cart-drawer.component.spec.ts
 * Tests cart side drawer quantity dispatches, item deletions, and close triggers.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartDrawerComponent } from './cart-drawer.component';
import { CartItem } from '../../models/cart.model';
import * as CartActions from '../../store/cart/cart.actions';
import {
  selectCartItems,
  selectIsCartDrawerOpen,
  selectCartSubtotal,
  selectFreeShippingProgress
} from '../../store/cart/cart.selectors';

describe('CartDrawerComponent', () => {
  let component: CartDrawerComponent;
  let fixture: ComponentFixture<CartDrawerComponent>;
  let store: MockStore;

  const mockCartItems: CartItem[] = [
    {
      product: {
        id: 'PROD-101',
        name: 'Zenith Carbon Road Bike',
        category: 'Gear & Outdoors',
        price: 1899.99,
        description: 'Ultra-lightweight aerodynamic carbon composite frame.',
        imageUrl: 'https://example.com/bike.jpg',
        stock: 5,
        rating: 4.8
      },
      quantity: 1
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerComponent],
      providers: [
        provideAnimationsAsync(),
        provideMockStore({
          selectors: [
            { selector: selectCartItems, value: mockCartItems },
            { selector: selectIsCartDrawerOpen, value: true },
            { selector: selectCartSubtotal, value: 1899.99 },
            {
              selector: selectFreeShippingProgress,
              value: {
                subtotal: 1899.99,
                threshold: 150,
                remaining: 0,
                progressPercentage: 100,
                isQualified: true
              }
            }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartDrawerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create cart drawer component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch closeCartDrawer when closeDrawer() is called', () => {
    component.closeDrawer();
    expect(store.dispatch).toHaveBeenCalledWith(CartActions.closeCartDrawer());
  });

  it('should dispatch updateQuantity on incrementQuantity()', () => {
    component.incrementQuantity(mockCartItems[0]);
    expect(store.dispatch).toHaveBeenCalledWith(
      CartActions.updateQuantity({ productId: 'PROD-101', quantity: 2 })
    );
  });

  it('should dispatch removeFromCart on removeItem()', () => {
    component.removeItem('PROD-101');
    expect(store.dispatch).toHaveBeenCalledWith(
      CartActions.removeFromCart({ productId: 'PROD-101' })
    );
  });
});
