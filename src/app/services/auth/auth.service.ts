import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8080/user"

  constructor(private http:HttpClient) { }

  registerUser(userDetails: User){
    return this.http.post(`${this.baseURL}/registerUser`,userDetails);
  }
}
