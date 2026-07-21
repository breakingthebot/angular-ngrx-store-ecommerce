import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: 'catalog' }
];
