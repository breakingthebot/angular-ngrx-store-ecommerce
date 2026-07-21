/*
 * components/catalog/catalog.component.ts
 * Renders the product catalog grid with filters, search, and sorting powered by NgRx.
 * Connects to: store/product/product.selectors.ts, store/product/product.actions.ts
 * Created: 2026-07-20
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

// Store & Models
import { Product } from '../../models/product.model';
import * as ProductActions from '../../store/product/product.actions';
import * as CartActions from '../../store/cart/cart.actions';
import {
  selectAllProducts,
  selectProductsLoading,
  selectProductsError
} from '../../store/product/product.selectors';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  // Store Observables
  products$: Observable<Product[]> = this.store.select(selectAllProducts);
  loading$: Observable<boolean> = this.store.select(selectProductsLoading);
  error$: Observable<string | null> = this.store.select(selectProductsError);

  // Filter Signals
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');
  sortOption = signal<string>('featured');

  // Available Categories
  categories: string[] = ['All', 'Gear & Outdoors', 'Electronics', 'Apparel & Shoes'];

  // Filtered & Sorted Products Stream
  filteredProducts$: Observable<Product[]> = combineLatest([
    this.products$,
    // Convert signals to observables for combineLatest reactivity
    new Observable<string>(sub => {
      sub.next(this.searchQuery());
    }),
    new Observable<string>(sub => {
      sub.next(this.selectedCategory());
    }),
    new Observable<string>(sub => {
      sub.next(this.sortOption());
    })
  ]).pipe(
    map(([products, search, category, sort]) => {
      let result = [...products];

      // 1. Filter by Category
      if (category !== 'All') {
        result = result.filter(p => p.category === category);
      }

      // 2. Filter by Search Query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        result = result.filter(
          p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
      }

      // 3. Sort
      if (sort === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      }

      return result;
    })
  );

  ngOnInit(): void {
    // Trigger catalog fetch action via NgRx Effects
    this.store.dispatch(ProductActions.loadProducts());
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.triggerRecompute();
  }

  onCategorySelect(category: string): void {
    this.selectedCategory.set(category);
    this.triggerRecompute();
  }

  onSortChange(option: string): void {
    this.sortOption.set(option);
    this.triggerRecompute();
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product }));
  }

  openProductDetail(product: Product): void {
    this.dialog.open(ProductDetailDialogComponent, {
      data: product,
      maxWidth: '780px',
      width: '92vw'
    });
  }

  private triggerRecompute(): void {
    // Re-evaluates filteredProducts$ stream by triggering a shallow update
    this.filteredProducts$ = combineLatest([
      this.products$,
      new Observable<string>(sub => sub.next(this.searchQuery())),
      new Observable<string>(sub => sub.next(this.selectedCategory())),
      new Observable<string>(sub => sub.next(this.sortOption()))
    ]).pipe(
      map(([products, search, category, sort]) => {
        let result = [...products];
        if (category !== 'All') {
          result = result.filter(p => p.category === category);
        }
        if (search.trim()) {
          const q = search.toLowerCase().trim();
          result = result.filter(
            p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
          );
        }
        if (sort === 'price-low') {
          result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
          result.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
          result.sort((a, b) => b.rating - a.rating);
        }
        return result;
      })
    );
  }
}
