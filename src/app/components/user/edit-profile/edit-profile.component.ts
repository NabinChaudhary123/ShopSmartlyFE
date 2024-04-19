import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { response } from 'express';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  
  user:any = {};
  userId!: number;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private snackbar:MatSnackBar
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let userId = window.localStorage.getItem('userId');
    this.userId = Number(userId);
    
  }

  updateForm = this.fb.group({
    fullName:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    contact:['', [Validators.required]],
 })

 get fullName(){
   return this.updateForm.controls['fullName']
 }
 get email(){
   return this.updateForm.controls['email']
 }
 get contact(){
   return this.updateForm.controls['contact']
 }

 onSubmitDetails(userId:number):void{

  if(this.updateForm.invalid){
    this.updateForm.markAllAsTouched();
    this.snackbar.open("Please fill the fields","Close",{duration:3000})
    return;
  }
  //  console.log(this.updateForm.value);
   this.userService.updateUser(this.userId, this.updateForm.value).subscribe(
     response => {
      this.snackbar.open("Profile updated successfully","Close",{duration:3000})
     },
     error =>{
      this.snackbar.open("Something went wrong","Close",{duration:3000})
     }
   )  

 }



}
