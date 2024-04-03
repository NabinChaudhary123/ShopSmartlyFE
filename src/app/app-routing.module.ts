import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'OurProducts',
    component: OurProductsComponent, 
    canActivate: [authGuardGuard],
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'AdminHome',
        component: AdminHomeComponent
      },
      {
        path: 'AdminCustomer',
        component: AdminCustomersComponent
      },
      {
        path: '',
        redirectTo: 'AdminHome',
        pathMatch: 'full'
      },
      {
        path: 'AdminProduct',
        component: AdminProductsComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
