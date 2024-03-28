import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "http://localhost:8080/products"

  constructor(
    private http:HttpClient
  ) { }

  registerProducts(productsDto: any){

    return this.http.post(`${this.baseURL}/registerProducts`, productsDto);
    // headers: this.createAuthorizationHeader()

  }

  getAllProducts():Observable<any>{
    return this.http.get(`${this.baseURL}/listProducts`);

   

  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer '+localStorage.getItem('accessToken'));
  }
}
