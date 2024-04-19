import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user:any;
  constructor(
    private userService:UserService,
    private router:Router,
    public authService:AuthService,
    private dialog:MatDialog
  ){ }

  @Output() closeDialog:EventEmitter<void> = new EventEmitter<void>();

  onCloseDialog(){
    this.closeDialog.emit();;
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

  openEditProfile(){
    this.dialog.open(EditProfileComponent);
  }

}
