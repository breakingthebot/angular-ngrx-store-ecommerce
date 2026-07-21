import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { productReducer } from './store/product/product.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { orderReducer } from './store/order/order.reducer';
import { ProductEffects } from './store/product/product.effects';
import { OrderEffects } from './store/order/order.effects';

import { hydrationMetaReducer } from './store/meta-reducers/hydration.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(
      {
        catalog: productReducer,
        cart: cartReducer,
        order: orderReducer
      },
      {
        metaReducers: [hydrationMetaReducer]
      }
    ),
    provideEffects([
      ProductEffects,
      OrderEffects
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
