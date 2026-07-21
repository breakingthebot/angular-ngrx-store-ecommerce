/*
 * services/product.service.spec.ts
 * Tests product database service mock emissions.
 * Created: 2026-07-20
 */

import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return catalog products array from getProducts()', (done) => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].name).toBe('Zenith Carbon Road Bike');
      done();
    });
  });
});
