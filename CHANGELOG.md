# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-07-20

### Added
- Created `OrdersComponent` rendering order history timeline cards at route `/orders`.
- Added reactive status filter chips ("All", "Processing", "Shipped", "Delivered") connected to `selectAllOrders` selector.
- Built order details breakdown displaying recipient info, delivery address, payment method, item receipts, and totals summary.
- Bound top navigation toolbar link for "Orders" with icon badge.
- Wrote unit specs for order history card rendering and status chip filtering.

## [0.4.0] - 2026-07-20

### Added
- Built `CheckoutComponent` displaying a 3-step Angular Material Stepper wizard (`/checkout`).
- Implemented NgRx Order state slice (`order.actions.ts`, `order.reducer.ts`, `order.selectors.ts`, `order.effects.ts`).
- Integrated Angular Reactive Forms for Shipping Details and Payment & Billing validation.
- Built price calculation breakdown table (Subtotal, Shipping Fee $0 if >= $150 else $9.99, Tax 8%, Grand Total).
- Added Order Placement Confirmation Card overlay displaying order reference ID, recipient info, delivery address, and item list.
- Wrote unit specs for order reducer mutations and checkout stepper component interactions.

## [0.3.0] - 2026-07-20

### Added
- Created `CartDrawerComponent` displaying a sliding side drawer for shopping cart management.
- Implemented NgRx Cart state slice (`cart.actions.ts`, `cart.reducer.ts`, `cart.selectors.ts`).
- Added free shipping progress bar dynamically calculating remaining amount to reach $150 threshold.
- Bound navbar shopping cart icon button to live `selectCartTotalItems` badge counter.
- Wrote unit specs for cart reducer mutations and drawer component interactions.

## [0.2.0] - 2026-07-20

### Added
- Created `CatalogComponent` rendering responsive product card grid layouts with hover zoom states.
- Implemented category filter chips, search input lookups, and price/rating sorting selectors.
- Configured sticky navigation top bar in `AppComponent` with brand badges and navigation links.
- Wrote unit specs verifying grid card rendering, search input lookups, and category filter selections.

## [0.1.0] - 2026-07-20

### Added
- Bootstrapped Angular 19 standalone application with NgRx Store, Effects, and Store-DevTools.
- Built `Product` data model and `ProductService` providing 6 detailed e-commerce mock items with simulated network latency.
- Configured catalog state slice actions, reducers, selectors, and async side effect handlers.
- Created `karma.conf.js` specifying `ChromeHeadless` execution for background unit tests.
