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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCartByUserId();
  }

  addToCart(productId:number):Observable<any>{
    let cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post<[]>(`${this.url}/postCart`, cartDto)
  }

  getCartByUserId():Observable<any>{
    let userId = window.localStorage.getItem('userId');
    return this.http.get(`${this.url}/getCartByUserId/${userId}`)
  }

  increaseQuantity(productId:number):Observable<any>{
    const cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post(`${this.url}/addQuantity`,cartDto)
  }

  decreaseQuantity(productId:number):Observable<any>{
    const cartDto = {
      productId: productId,
      userId: window.localStorage.getItem('userId')
    }
    return this.http.post(`${this.url}/decreaseQuantity`,cartDto)
  }

  placeOrder(placeOrderDto:any):Observable<any>{
    placeOrderDto.userId = window.localStorage.getItem('userId');
    return this.http.post(`${this.url}/placeOrder`,placeOrderDto)
  }
}
