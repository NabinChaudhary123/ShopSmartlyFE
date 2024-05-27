import { Component, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { faCartPlus, faIdBadge, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../user/profile/profile.component';
import { EventEmitter } from 'stream';

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
    public authService:AuthService,
    private dialog:MatDialog
  ){}

 logOut(){
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('role');
  this.router.navigate(['/login']);
 }

 getUserProfile(){
  const dialogRef = this.dialog.open(ProfileComponent);
  dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close();
    
  })
 }

 showFooter():boolean{
  const currentURL = this.router.url;
  // return !currentURL.includes('AdminDashboard');
  const excludePages = ['AdminDashboard','login','register','Contact','cart'];
  for(const page of excludePages){
    if(currentURL.includes(page)){
      return false;
    }
  }
  return true;
}

isMobileMenuOpen = false;

toggleMobileMenu(){
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
}

}
