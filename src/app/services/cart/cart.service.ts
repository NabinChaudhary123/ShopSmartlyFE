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
    const cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post<[]>(`${this.url}/postCart`, cartDto)
  }

  getCartByUserId():Observable<any>{
    const userId = window.localStorage.getItem('userId');
    return this.http.get(`${this.url}/getCartByUserId/${userId}`)
  }

  increaseQuantity(productId:any):Observable<any>{
    const cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post(`${this.url}/addQuantity`,cartDto)
  }

  decreaseQuantity(productId:any):Observable<any>{
    const cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post(`${this.url}/decreaseQuantity`,cartDto)
  }

  placeOrder(orderDto:any):Observable<any>{
    orderDto.userId = window.localStorage.getItem('userId');
    return this.http.post(`${this.url}/placeOrder`,orderDto)
  }
}
