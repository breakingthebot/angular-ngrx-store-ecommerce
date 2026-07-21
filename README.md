# PulseMarket - Reactive E-Commerce Platform with NgRx State Management

PulseMarket is a high-performance, mobile-responsive e-commerce application built with Angular 19, Angular Material, and reactive state management powered by `@ngrx/store`, `@ngrx/effects`, and `@ngrx/store-devtools`.

## Stack
- **Framework**: Angular 19 (Standalone Components, Control Flow `@if/@for`)
- **State Management**: NgRx Store, Effects, Selectors, DevTools & LocalStorage MetaReducer
- **UI Library**: Angular Material 19 (Cards, Toolbar, Stepper, Chips, Badges, Buttons, Form Fields)
- **Styling**: Modern Responsive Vanilla CSS Design System with media query breakpoints
- **Testing**: Karma + Jasmine Headless Chrome execution (`karma.conf.js`)
- **Deployment**: Vercel CLI

## Setup
```bash
# Clone repository
git clone https://github.com/breakingthebot/angular-ngrx-store-ecommerce.git
cd angular-ngrx-store-ecommerce

# Install dependencies
npm install
```

## Environment Variables
Refer to `.env.example`. No external API keys or secrets are required. The app operates in-memory with simulated network latency and localStorage hydration.

```
# .env.example template
NODE_ENV=development
```

## Running Locally
```bash
# Start local development server
npm start

# Navigate to http://localhost:4200
```

## Running Unit Tests
```bash
# Execute headless Chrome unit test suite
npm run test
```

## Production Build
```bash
# Compile optimized production bundle
npm run build
```

## Deployed
- **Vercel Production App**: [https://angular-ngrx-store-ecommerce.vercel.app](https://angular-ngrx-store-ecommerce.vercel.app)
- **GitHub Repository**: [https://github.com/breakingthebot/angular-ngrx-store-ecommerce](https://github.com/breakingthebot/angular-ngrx-store-ecommerce)

## Architecture Notes
PulseMarket is architected cleanly around atomic file separation and reactive state slice decoupling:
1. **Catalog Slice (`product.reducer.ts`)**: Handles asynchronous catalog loading, category filtering, search input queries, and sorting algorithms.
2. **Cart Slice (`cart.reducer.ts`)**: Manages cart line items, quantity adjustments (+/-), item removal, cart clearing, drawer open/close toggles, and dynamic free shipping thresholds ($150 cutoff).
3. **Order Slice (`order.reducer.ts`)**: Manages multi-step checkout orders, customer shipping details, payment recaps, automated total calculations (Subtotal, Shipping, Tax, Grand Total), and order history timelines.
4. **Hydration MetaReducer (`hydration.reducer.ts`)**: Intercepts `@ngrx/store/init` to rehydrate state slices from `localStorage` and automatically serializes state updates on action dispatches.
5. **Multi-Step Stepper Wizard (`CheckoutComponent`)**: Utilizes Angular Reactive Forms for Step 1 (Shipping) and Step 2 (Payment), displaying instant review breakdowns and order confirmation overlays upon dispatching `placeOrder`.

## Data Handling & Privacy Policy
PulseMarket operates under a strict **store minimal / process in-memory** data posture:
- **Data Collection**: No personal information, financial data, or credentials are transmitted to external telemetry or third-party tracking services.
- **LocalStorage Usage**: E-commerce cart items and order receipts are stored locally within your browser (`localStorage`) solely to provide persistent shopping sessions across browser refreshes.
- **Third-Party Services**: No customer data is shared or sold to external third parties.

## Notes
- All 37 unit test specs run headlessly in CI/CD environments via `ChromeHeadless`.
- Responsive layout breakpoints support all modern viewports from mobile smartphones (320px+) to ultra-wide desktop displays (1440px+).
