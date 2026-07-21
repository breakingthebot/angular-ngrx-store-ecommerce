/*
 * components/wishlist/wishlist.component.ts
 * Renders user's saved wishlist items with add-to-cart actions.
 * Connects to: store/wishlist/wishlist.selectors.ts, store/wishlist/wishlist.actions.ts
 * Created: 2026-07-20
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Store & Models
import { Product } from '../../models/product.model';
import { selectWishlistItems } from '../../store/wishlist/wishlist.selectors';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private store = inject(Store);

  wishlistItems$: Observable<Product[]> = this.store.select(selectWishlistItems);

  onRemove(product: Product): void {
    this.store.dispatch(WishlistActions.toggleWishlist({ product }));
  }

  onAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product }));
  }
}
