/*
 * app.component.ts
 * Main application shell managing top toolbar layout and shopping cart drawer trigger.
 * Connects to: components/cart-drawer/cart-drawer.component.ts, store/cart/cart.selectors.ts
 * Created: 2026-07-20
 */

import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

// Components & Store
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import * as CartActions from './store/cart/cart.actions';
import { selectCartTotalItems } from './store/cart/cart.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    CartDrawerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'material-store-app';
  private store = inject(Store);

  cartTotalItems$: Observable<number> = this.store.select(selectCartTotalItems);

  toggleCart(): void {
    this.store.dispatch(CartActions.toggleCartDrawer());
  }
}
