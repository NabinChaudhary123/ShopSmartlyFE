import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { faCartPlus, faIdBadge, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cart = faCartPlus;
  auth = faUser;
  profile= faIdBadge;
  logout = faRightFromBracket;
  

  constructor(
    private router:Router,
    public authService:AuthService
  ){}

 logOut(){
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('role');
  this.router.navigate(['/login']);
 }
  
}
