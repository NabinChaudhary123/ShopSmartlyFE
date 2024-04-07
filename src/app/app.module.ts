import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './AngularMaterialModule';
import { OrderComponent } from './components/user/order/order.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    AdminDashboardComponent,
    AdminCustomersComponent,
    AdminHomeComponent,
    AdminProductsComponent,
    UserDashboardComponent,
    OurProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule
    
    
    
  ],

  providers: [   
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
