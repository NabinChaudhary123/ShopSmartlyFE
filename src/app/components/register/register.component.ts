import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { error } from 'console';

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
     private router:Router){}

  submitDetails(){
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
  