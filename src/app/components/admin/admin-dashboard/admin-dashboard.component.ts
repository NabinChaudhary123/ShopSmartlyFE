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
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isMenuOpen = false;

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen; 
  }
}
