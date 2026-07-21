/*
 * models/order.model.ts
 * Defines order placement, shipping address, and payment TypeScript schemas.
 * Connects to: models/cart.model.ts
 * Created: 2026-07-20
 */

import { CartItem } from './cart.model';

export interface ShippingAddress {
  fullName: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentDetails {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  createdAt: Date;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
