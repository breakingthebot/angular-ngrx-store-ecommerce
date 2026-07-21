/*
 * store/product/product.effects.spec.ts
 * Tests catalog loading side effects.
 * Created: 2026-07-20
 */

import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ProductEffects } from './product.effects';
import { ProductService } from '../../services/product.service';
import * as ProductActions from './product.actions';
import { Product } from '../../models/product.model';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let actions$: Subject<Action>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

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
    }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['getProducts']);
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        { provide: Actions, useValue: actions$ },
        { provide: ProductService, useValue: spy }
      ]
    });

    effects = TestBed.inject(ProductEffects);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should dispatch loadProductsSuccess on successful retrieval', (done) => {
    productServiceSpy.getProducts.and.returnValue(of(mockProducts));

    effects.loadProducts$.subscribe(resultAction => {
      expect(resultAction).toEqual(ProductActions.loadProductsSuccess({ products: mockProducts }));
      done();
    });

    actions$.next(ProductActions.loadProducts());
  });

  it('should dispatch loadProductsFailure on failed retrieval', (done) => {
    productServiceSpy.getProducts.and.returnValue(throwError(() => new Error('Failed to load')));

    effects.loadProducts$.subscribe(resultAction => {
      expect(resultAction).toEqual(ProductActions.loadProductsFailure({ error: 'Failed to load' }));
      done();
    });

    actions$.next(ProductActions.loadProducts());
  });
});
