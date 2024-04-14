import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './AngularMaterialModule';
import { OrderComponent } from './components/user/order/order.component';
import { AdminordersComponent } from './components/admin/adminorders/adminorders.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PriceDealsComponent } from './components/user/price-deals/price-deals.component';


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
    OurProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent,
    AdminordersComponent,
    FooterComponent,
    ProfileComponent,
    PriceDealsComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FontAwesomeModule,
    FormsModule
    
    
    
  ],

  providers: [   
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
