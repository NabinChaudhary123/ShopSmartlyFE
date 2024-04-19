import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.group({
     fullName:['', [Validators.required]],
     email:['', [Validators.required, Validators.email]],
     contact:['', [Validators.required]],
     password:['', [Validators.required]]
  })

  get fullName(){
    return this.registerForm.controls['fullName']
  }
  get email(){
    return this.registerForm.controls['email']
  }
  get contact(){
    return this.registerForm.controls['contact']
  }
  get password(){
    return this.registerForm.controls['password']
  }

  constructor(
    private fb:FormBuilder,
     private authService:AuthService,
     private router:Router,
     private snackBar:MatSnackBar
    ){}

  submitDetails(){
    if(this.registerForm.invalid){
      if(this.registerForm.errors?.['required']){
        this.snackBar.open('Please fill the fields', 'Close', { duration: 2000 })
      }
      else{
        this.snackBar.open('Please provide valid details', 'Close', { duration: 2000 })
        return;
      }
      
    }
    console.log(this.registerForm.value)
    const postData = {...this.registerForm.value};
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response)
        this.router.navigate(['/login'])
      },
      error => console.log(error)
      
    )
  }
}
  