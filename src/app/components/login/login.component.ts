import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginData } from '../../interfaces/auth';
import { Router } from '@angular/router';

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
    private router:Router
  ) { }


  onLogin() {
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
        }
        else{
          this.router.navigate(['/landing'])
        }
      },
      
      error =>{
        console.log(error)
        alert('Wrong Credentials')
      } 
    )
  }


}
