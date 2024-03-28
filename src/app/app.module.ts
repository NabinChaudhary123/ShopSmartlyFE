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
    AdminProductsComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
