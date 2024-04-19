import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginData } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AUTH_HEADER = "authorization";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password']
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private snackbar:MatSnackBar
  ) { }


  onLogin() {
    if (this.loginForm.invalid) {
      if (this.email.errors?.['required'] || this.password.errors?.['required']) {
        this.snackbar.open("Please fill the fields", "Close", { duration: 3000 })
        return;
      }
      
     
    }
    console.log(this.loginForm.value);
    const postData = {...this.loginForm.value}
    return this.authService.loginUser(postData as LoginData).subscribe(
      (response:any) =>{
        console.log(response)
      
          window.localStorage.setItem('accessToken', response.token) 
          window.localStorage.setItem('userId',response.userId);
          window.localStorage.setItem('role',response.role);
        if(postData.email === 'admin@gmail.com'){
          this.router.navigate(['/AdminDashboard'])
          this.snackbar.open("Welcome Admin, You are successfully logged in", "Close", { duration: 3000 })
        }
        else{
          this.router.navigate(['/landing'])
          this.snackbar.open("Welcome user, You are successfully logged in", "Close", { duration: 3000 })
        }
      },
      
      error =>{
        console.log(error)
        this.snackbar.open("Please provide valid credentials", "Close", { duration: 3000 })
      } 
    )
  }


}
