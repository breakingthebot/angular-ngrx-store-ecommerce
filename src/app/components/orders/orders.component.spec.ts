/*
 * components/orders/orders.component.spec.ts
 * Tests order history timeline rendering, empty state placeholders, and status chip filters.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { OrdersComponent } from './orders.component';
import { Order } from '../../models/order.model';
import { selectAllOrders } from '../../store/order/order.selectors';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let store: MockStore;

  const mockOrders: Order[] = [
    {
      id: 'ORD-987654',
      items: [
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
      ],
      shipping: {
        fullName: 'Alex Morgan',
        email: 'alex@example.com',
        addressLine: '123 Main St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601'
      },
      paymentMethod: 'Credit Card (**** 7890)',
      subtotal: 1899.99,
      shippingFee: 0,
      tax: 152.00,
      total: 2051.99,
      createdAt: new Date(),
      status: 'Processing'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent],
      providers: [
        provideAnimationsAsync(),
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectAllOrders, value: mockOrders }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create orders component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render order timeline cards when orders exist in state', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.order-timeline-card');

    expect(cards.length).toBe(1);
    expect(compiled.querySelector('.order-id')?.textContent).toContain('ORD-987654');
  });

  it('should filter order timeline cards when status chip is selected', (done) => {
    fixture.detectChanges();

    component.onStatusFilter('Shipped');
    fixture.detectChanges();

    component.filteredOrders$.subscribe(filtered => {
      expect(filtered.length).toBe(0);
      done();
    });
  });
});
