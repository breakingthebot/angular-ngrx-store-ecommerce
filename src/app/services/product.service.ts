/*
 * services/product.service.ts
 * Supplies mockup database collections and simulates latency network retrievals.
 * Connects to: models/product.model.ts
 * Created: 2026-07-20
 */

import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productsDatabase: Product[] = [
    {
      id: 'PROD-101',
      name: 'Zenith Carbon Road Bike',
      category: 'Gear & Outdoors',
      price: 1899.99,
      description: 'Ultra-lightweight aerodynamic carbon composite frame designed for elite endurance racers.',
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80',
      stock: 5,
      rating: 4.8
    },
    {
      id: 'PROD-102',
      name: 'Aura Noise-Cancelling Headphones',
      category: 'Electronics',
      price: 349.50,
      description: 'Active hybrid adaptive noise cancellation with studio-grade spatial acoustic drivers.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      stock: 15,
      rating: 4.9
    },
    {
      id: 'PROD-103',
      name: 'Ascent Trail Waterproof Boots',
      category: 'Apparel & Shoes',
      price: 145.00,
      description: 'Vibram outsole hiking boots with fully breathable waterproof membrane linings.',
      imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&q=80',
      stock: 8,
      rating: 4.6
    },
    {
      id: 'PROD-104',
      name: 'Horizon Minimalist Smartwatch',
      category: 'Electronics',
      price: 219.00,
      description: 'Always-on sapphire OLED display monitoring biometric tracking and notification synchronization.',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      stock: 12,
      rating: 4.5
    },
    {
      id: 'PROD-105',
      name: 'Titanium Camp Stovetop Kit',
      category: 'Gear & Outdoors',
      price: 79.99,
      description: 'Ultra-compact gas burner kit folding down into a lightweight titanium cookware nest.',
      imageUrl: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&w=400&q=80',
      stock: 20,
      rating: 4.7
    },
    {
      id: 'PROD-106',
      name: 'Vanguard Anti-Theft Backpack',
      category: 'Apparel & Shoes',
      price: 110.00,
      description: 'Ergonomic weather-resistant shell featuring hidden card slots and USB-C power routing hubs.',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
      stock: 25,
      rating: 4.7
    }
  ];

  /**
   * Retrieves products array simulating API response delay.
   */
  getProducts(): Observable<Product[]> {
    return of([...this.productsDatabase]).pipe(
      delay(600) // Simulate network latency
    );
  }
}
