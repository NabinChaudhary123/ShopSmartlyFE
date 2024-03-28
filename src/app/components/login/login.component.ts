import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginData } from '../../interfaces/auth';
import { Router } from '@angular/router';

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
      response =>{
        console.log(response)
      
          window.localStorage.setItem('accessToken', JSON.stringify(response))  
        
        this.router.navigate(['/AdminDashboard'])
        alert('You are logged in successfully')
      },
      
      error =>{
        console.log(error)
        alert('Wrong Credentials')
      } 
    )
  }

}
