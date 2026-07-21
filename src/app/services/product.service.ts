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
      rating: 4.8,
      reviewsCount: 18,
      features: [
        'Monocoque T800 Carbon Composite Frame',
        'Shimano 105 Di2 12-Speed Electronic Shifting',
        'Hydraulic Flat-Mount Disc Brakes',
        'Tubeless-Ready Aero Carbon Wheelset'
      ],
      reviews: [
        {
          id: 'REV-1',
          author: 'Marcus Vance',
          rating: 5,
          date: '2026-07-10',
          comment: 'Absurdly light and responsive! Shifted smoother than any mechanical group I have ridden.'
        },
        {
          id: 'REV-2',
          author: 'Elena Rostova',
          rating: 4.5,
          date: '2026-07-02',
          comment: 'Incredible speed on climbs. Assembly was straightforward out of the box.'
        }
      ]
    },
    {
      id: 'PROD-102',
      name: 'Aura Noise-Cancelling Headphones',
      category: 'Electronics',
      price: 349.50,
      description: 'Active hybrid adaptive noise cancellation with studio-grade spatial acoustic drivers.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      stock: 15,
      rating: 4.9,
      reviewsCount: 42,
      features: [
        '40mm Custom Titanium Film Drivers',
        'Adaptive ANC with Transparency Mode',
        '40-Hour Battery Life with Fast Charge (5min = 4hrs)',
        'Plush Memory Foam Protein Leather Earcups'
      ],
      reviews: [
        {
          id: 'REV-3',
          author: 'Sarah Jenkins',
          rating: 5,
          date: '2026-07-14',
          comment: 'Best ANC headphones on the market. Silence on long flights is unmatched!'
        }
      ]
    },
    {
      id: 'PROD-103',
      name: 'Ascent Trail Waterproof Boots',
      category: 'Apparel & Shoes',
      price: 145.00,
      description: 'Vibram outsole hiking boots with fully breathable waterproof membrane linings.',
      imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&q=80',
      stock: 8,
      rating: 4.6,
      reviewsCount: 14,
      features: [
        'eVent Waterproof Breathable Membrane',
        'Vibram Megagrip High-Traction Outsole',
        'Anodized Metal Lace Hardware',
        'Dual-Density EVA Shock Cushioning'
      ],
      reviews: [
        {
          id: 'REV-4',
          author: 'David K.',
          rating: 4,
          date: '2026-06-28',
          comment: 'Handled muddy trails with ease. Zero blisters on a 12-mile inaugural hike.'
        }
      ]
    },
    {
      id: 'PROD-104',
      name: 'Horizon Minimalist Smartwatch',
      category: 'Electronics',
      price: 219.00,
      description: 'Always-on sapphire OLED display monitoring biometric tracking and notification synchronization.',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      stock: 12,
      rating: 4.5,
      reviewsCount: 29,
      features: [
        '1.4" Sapphire Crystal OLED Display',
        'Continuous Heart Rate & SpO2 Biometrics',
        'Water Resistant to 50 Meters (5 ATM)',
        '7-Day Battery Life in Smart Mode'
      ]
    },
    {
      id: 'PROD-105',
      name: 'Titanium Camp Stovetop Kit',
      category: 'Gear & Outdoors',
      price: 79.99,
      description: 'Ultra-compact gas burner kit folding down into a lightweight titanium cookware nest.',
      imageUrl: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&w=400&q=80',
      stock: 20,
      rating: 4.7,
      reviewsCount: 11,
      features: [
        'Grade-1 Ultralight Titanium Construction',
        'Piezo Electric Auto-Ignition System',
        'Boils 1 Liter of Water in 3.2 Minutes',
        'Includes Mesh Storage Pouch & Pot Stand'
      ]
    },
    {
      id: 'PROD-106',
      name: 'Vanguard Anti-Theft Backpack',
      category: 'Apparel & Shoes',
      price: 110.00,
      description: 'Ergonomic weather-resistant shell featuring hidden card slots and USB-C power routing hubs.',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
      stock: 25,
      rating: 4.7,
      reviewsCount: 33,
      features: [
        'Slash-Proof Kevlar Reinforced Outer Lining',
        'TSA-Compliant 180-Degree Laptop Compartment',
        'Pass-Through Luggage Strap & Hidden RFID Slot',
        'Integrated Waterproof Rain Fly Cover'
      ]
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
