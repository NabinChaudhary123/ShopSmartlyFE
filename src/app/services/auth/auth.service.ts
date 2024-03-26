import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, User } from '../../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8080/user";
  private baseURLogin = "http://localhost:8080/auth";
  private LoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {
    this.LoggedIn.next(!!localStorage.getItem('accessToken'));
   }

  registerUser(userDetails: User){
    return this.http.post(`${this.baseURL}/registerUser`,userDetails);
  }

  loginUser(userDetails: LoginData){
    return this.http.post(`${this.baseURLogin}/loginUser`, userDetails)
  }

  isLoggedIn(): Observable<boolean>{
    return this.LoggedIn.asObservable();
  }
}
