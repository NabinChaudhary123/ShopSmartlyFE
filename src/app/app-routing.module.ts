import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import path from 'path';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './gaurds/auth.guard';
import { authGuardGuard } from './guard/auth-guard.guard';

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
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuardGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
