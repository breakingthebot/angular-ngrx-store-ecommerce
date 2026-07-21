# E-commerce Store with NgRx State Management

Product catalog, interactive cart, and multi-step checkout with full Redux pattern state management utilizing NgRx.

## Stack
- Angular 19 (Standalone component architecture)
- NgRx Store, NgRx Effects, NgRx Store DevTools (v19)
- Angular Material Design
- HTML5 / CSS3 / TypeScript

## Setup
1. Open the project root folder `Build_36`
2. Install npm dependency packages:
   ```bash
   npm install --legacy-peer-deps
   ```

## Environment Variables
Refer to `.env.example`:
- `STORE_API_URL`: Simulated REST API endpoints URL.
- `PORT`: Port configuration to run locally.

## Running Locally
Launch the local Angular development server:
```bash
npm start
```
By default, the application runs at `http://localhost:4200/`.

## Deployed
*To be deployed on Vercel*

## Architecture Notes
*To be written at the end of initial iterations*

## Notes
- State slices: catalog, cart, orders.
- Uses functional Router configuration patterns.
