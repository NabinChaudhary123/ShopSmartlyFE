import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { authGuardGuard } from './guard/auth/auth-guard.guard';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CartComponent } from './components/user/cart/cart.component';
import { OrderComponent } from './components/user/order/order.component';
import { AdminordersComponent } from './components/admin/adminorders/adminorders.component';
import { adminGuard } from './guard/admin/admin.guard';
import { loginGuard } from './guard/login/login.guard';
import { PriceDealsComponent } from './components/user/price-deals/price-deals.component';
import { AdmininvoicesComponent } from './components/admin/admininvoices/admininvoices.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'OurProducts',
    component: OurProductsComponent,  
  },
  {
    path: 'Contact',
    component: ContactComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'priceDeals',
    component: PriceDealsComponent
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuardGuard, adminGuard],
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
      },
      {
        path: 'AdminOrder',
        component: AdminordersComponent,
        
      },
      {
        path: 'AdminInvoice',
        component: AdmininvoicesComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
