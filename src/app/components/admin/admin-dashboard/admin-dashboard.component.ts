import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(
    private router:Router
  ){}

  logOut(){
    window.localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
