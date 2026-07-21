/*
 * app.component.spec.ts
 * Tests application root container creation and navigation header rendering.
 * Created: 2026-07-20
 */

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { selectCartTotalItems, selectIsCartDrawerOpen, selectCartItems, selectCartSubtotal, selectFreeShippingProgress } from './store/cart/cart.selectors';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectCartTotalItems, value: 0 },
            { selector: selectIsCartDrawerOpen, value: false },
            { selector: selectCartItems, value: [] },
            { selector: selectCartSubtotal, value: 0 },
            { selector: selectFreeShippingProgress, value: { subtotal: 0, threshold: 150, remaining: 150, progressPercentage: 0, isQualified: false } }
          ]
        })
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'material-store-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('material-store-app');
  });

  it('should render brand title in navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('PulseMarket');
  });
});
