import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080/cart"
  constructor(
    private http:HttpClient
  ) { }

  addToCart(productId: any):Observable<any>{
    let cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post<[]>(`${this.url}/postCart`, cartDto)
  }
}
