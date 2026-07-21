/*
 * components/catalog/catalog.component.spec.ts
 * Tests catalog grid rendering, search filter applications, and NgRx store dispatches.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CatalogComponent } from './catalog.component';
import { Product } from '../../models/product.model';
import * as ProductActions from '../../store/product/product.actions';
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../../store/product/product.selectors';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let store: MockStore;

  const mockProducts: Product[] = [
    {
      id: 'PROD-101',
      name: 'Zenith Carbon Road Bike',
      category: 'Gear & Outdoors',
      price: 1899.99,
      description: 'Ultra-lightweight aerodynamic carbon composite frame.',
      imageUrl: 'https://example.com/bike.jpg',
      stock: 5,
      rating: 4.8
    },
    {
      id: 'PROD-102',
      name: 'Aura Headphones',
      category: 'Electronics',
      price: 349.50,
      description: 'Adaptive noise cancellation headphones.',
      imageUrl: 'https://example.com/headphones.jpg',
      stock: 15,
      rating: 4.9
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent],
      providers: [
        provideAnimationsAsync(),
        provideMockStore({
          selectors: [
            { selector: selectAllProducts, value: mockProducts },
            { selector: selectProductsLoading, value: false },
            { selector: selectProductsError, value: null }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create catalog component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts action on init', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.loadProducts());
  });

  it('should render product cards inside the grid', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.product-card');
    
    expect(cards.length).toBe(2);
    expect(compiled.querySelector('.product-title')?.textContent).toContain('Zenith Carbon Road Bike');
  });

  it('should filter product cards when category is selected', (done) => {
    fixture.detectChanges();

    component.onCategorySelect('Electronics');
    fixture.detectChanges();

    component.filteredProducts$.subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Aura Headphones');
      done();
    });
  });

  it('should filter product cards matching search query input', (done) => {
    fixture.detectChanges();

    component.onSearchChange('Bike');
    fixture.detectChanges();

    component.filteredProducts$.subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Zenith Carbon Road Bike');
      done();
    });
  });
});
