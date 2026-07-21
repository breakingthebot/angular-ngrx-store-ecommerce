/*
 * components/product-detail-dialog/product-detail-dialog.component.spec.ts
 * Tests ProductDetailDialogComponent rendering, specs lists, and cart dispatching.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductDetailDialogComponent } from './product-detail-dialog.component';
import { Product } from '../../models/product.model';
import * as CartActions from '../../store/cart/cart.actions';

import { selectWishlistItems } from '../../store/wishlist/wishlist.selectors';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';

describe('ProductDetailDialogComponent', () => {
  let component: ProductDetailDialogComponent;
  let fixture: ComponentFixture<ProductDetailDialogComponent>;
  let store: MockStore;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ProductDetailDialogComponent>>;

  const mockProduct: Product = {
    id: 'PROD-101',
    name: 'Zenith Carbon Road Bike',
    category: 'Gear & Outdoors',
    price: 1899.99,
    description: 'Ultra-lightweight aerodynamic carbon composite frame.',
    imageUrl: 'https://example.com/bike.jpg',
    stock: 5,
    rating: 4.8,
    reviewsCount: 2,
    features: ['T800 Carbon Frame', 'Electronic Shifting'],
    reviews: [
      { id: 'R1', author: 'Marcus', rating: 5, date: '2026-07-10', comment: 'Great bike!' }
    ]
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailDialogComponent],
      providers: [
        provideAnimationsAsync(),
        provideMockStore({
          selectors: [
            { selector: selectWishlistItems, value: [] }
          ]
        }),
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockProduct }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should create product detail dialog component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render product title, features, and reviews', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.dialog-title')?.textContent).toContain('Zenith Carbon Road Bike');
    expect(compiled.querySelectorAll('.features-list li').length).toBe(2);
    expect(compiled.querySelector('.rev-comment')?.textContent).toContain('Great bike!');
  });

  it('should dispatch CartActions.addToCart and close dialog on button click', () => {
    fixture.detectChanges();
    component.onAddToCart();

    expect(store.dispatch).toHaveBeenCalledWith(CartActions.addToCart({ product: mockProduct }));
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should dispatch WishlistActions.toggleWishlist on wishlist button click', () => {
    fixture.detectChanges();
    component.toggleWishlist();

    expect(store.dispatch).toHaveBeenCalledWith(WishlistActions.toggleWishlist({ product: mockProduct }));
  });
});
