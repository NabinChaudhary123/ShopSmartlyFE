import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, User } from '../../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8080/user";
  private baseURLogin = "http://localhost:8080/auth";
  

  constructor(
    private http:HttpClient,
    private router:Router
    ) {
   
   }

  registerUser(userDetails: User){
    return this.http.post(`${this.baseURL}/registerUser`,userDetails);
  }

  loginUser(userDetails: LoginData){
    return this.http.post(`${this.baseURLogin}/loginUser`, userDetails)
  }

  isUserLoggedIn():boolean{
    const token = window.localStorage.getItem('accessToken');
    return !!token;
  }

  getUserRole():string | null{
    return window.localStorage.getItem('role');
  }

  




}
