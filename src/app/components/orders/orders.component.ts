/*
 * components/orders/orders.component.ts
 * Renders order history timeline cards, status badges, and item receipts powered by NgRx.
 * Connects to: store/order/order.selectors.ts, models/order.model.ts
 * Created: 2026-07-20
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Store & Models
import { Order } from '../../models/order.model';
import { selectAllOrders } from '../../store/order/order.selectors';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  private store = inject(Store);

  orders$: Observable<Order[]> = this.store.select(selectAllOrders);
  selectedStatus = signal<string>('All');
  statusFilters: string[] = ['All', 'Processing', 'Shipped', 'Delivered'];

  filteredOrders$: Observable<Order[]> = combineLatest([
    this.orders$,
    new Observable<string>(sub => sub.next(this.selectedStatus()))
  ]).pipe(
    map(([orders, status]) => {
      if (status === 'All') {
        return orders;
      }
      return orders.filter(order => order.status === status);
    })
  );

  onStatusFilter(status: string): void {
    this.selectedStatus.set(status);
    this.filteredOrders$ = combineLatest([
      this.orders$,
      new Observable<string>(sub => sub.next(this.selectedStatus()))
    ]).pipe(
      map(([orders, stat]) => {
        if (stat === 'All') {
          return orders;
        }
        return orders.filter(order => order.status === stat);
      })
    );
  }
}
