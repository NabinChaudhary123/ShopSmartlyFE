import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user:any;
  constructor(
    private userService:UserService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    let userId = window.localStorage.getItem('userId');
    this.getUserDetails(Number(userId));
    
  }
  getUserDetails(userId:number){
    this.userService.getUserDetails(userId).subscribe(
      response => {
        this.user= response;
        console.log(this.user);

      }
    )
  }

  logOut(){
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
