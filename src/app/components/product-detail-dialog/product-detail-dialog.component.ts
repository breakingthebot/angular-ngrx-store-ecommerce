/*
 * components/product-detail-dialog/product-detail-dialog.component.ts
 * Renders expanded product details dialog with specs, feature bullet lists, and customer reviews.
 * Connects to: models/product.model.ts, store/cart/cart.actions.ts
 * Created: 2026-07-20
 */

import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';

import { Product } from '../../models/product.model';
import * as CartActions from '../../store/cart/cart.actions';
import { WishlistActions } from '../../store/wishlist/wishlist.actions';
import { selectWishlistItems } from '../../store/wishlist/wishlist.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})
export class ProductDetailDialogComponent {
  private store = inject(Store);
  wishlistItems$: Observable<Product[]> = this.store.select(selectWishlistItems);

  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  isProductInWishlist(wishlist: Product[] | null): boolean {
    return !!wishlist && wishlist.some(item => item.id === this.product.id);
  }

  toggleWishlist(): void {
    this.store.dispatch(WishlistActions.toggleWishlist({ product: this.product }));
  }

  onAddToCart(): void {
    this.store.dispatch(CartActions.addToCart({ product: this.product }));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
