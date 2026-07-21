/*
 * components/wishlist/wishlist.component.spec.ts
 * Tests wishlist rendering grids, bookmarks removal, and cart dispatches.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WishlistComponent } from './wishlist.component';
import { Product } from '../../models/product.model';
import { selectWishlistItems } from '../../store/wishlist/wishlist.selectors';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';
import * as CartActions from '../../store/cart/cart.actions';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let store: MockStore;

  const mockWishlist: Product[] = [
    {
      id: 'PROD-101',
      name: 'Zenith Carbon Road Bike',
      category: 'Gear & Outdoors',
      price: 1899.99,
      description: 'Ultra-lightweight aerodynamic carbon composite frame.',
      imageUrl: 'https://example.com/bike.jpg',
      stock: 5,
      rating: 4.8
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistComponent],
      providers: [
        provideAnimationsAsync(),
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectWishlistItems, value: mockWishlist }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should create wishlist component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render bookmarked cards', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.product-card').length).toBe(1);
    expect(compiled.querySelector('.product-title')?.textContent).toContain('Zenith Carbon Road Bike');
  });

  it('should dispatch WishlistActions.toggleWishlist on remove click', () => {
    fixture.detectChanges();
    component.onRemove(mockWishlist[0]);
    expect(store.dispatch).toHaveBeenCalledWith(WishlistActions.toggleWishlist({ product: mockWishlist[0] }));
  });

  it('should dispatch CartActions.addToCart on add to cart click', () => {
    fixture.detectChanges();
    component.onAddToCart(mockWishlist[0]);
    expect(store.dispatch).toHaveBeenCalledWith(CartActions.addToCart({ product: mockWishlist[0] }));
  });
});
