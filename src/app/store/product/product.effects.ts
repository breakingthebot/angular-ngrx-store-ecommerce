/*
 * store/product/product.effects.ts
 * Intercepts catalog loading triggers to initiate async product queries via ProductService.
 * Connects to: services/product.service.ts, store/product/product.actions.ts
 * Created: 2026-07-20
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((err) =>
            of(
              ProductActions.loadProductsFailure({
                error: err.message || 'Failed to fetch catalog entries.'
              })
            )
          )
        )
      )
    )
  );
}
