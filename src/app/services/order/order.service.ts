import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/order";
  constructor(
    private http:HttpClient
  ) { }

  getOrderByUserId():Observable<any>{
    let userId = window.localStorage.getItem('userId');
    return this.http.get(`${this.url}/orderByUserId/${userId}`)
  }
  getAllOrders():Observable<any>{
    return this.http.get(`${this.url}/allOrders`)
  }
  generatePDF(){
    return this.http.get<any>(`${this.url}/generatePDF`);
  }
  getRecentOrders(){
    return this.http.get<any>(`${this.url}/allOrdersDesc`);
  }

  placeOrder(placeOrderDto:any):Observable<any>{
    placeOrderDto.userId = window.localStorage.getItem('userId');
    return this.http.post(`${this.url}/placeOrder`,placeOrderDto)
  }
}
