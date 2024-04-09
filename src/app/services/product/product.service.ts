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
  }

  getAllProducts():Observable<any>{
    return this.http.get(`${this.baseURL}/listProducts`);
  }

  getProductByCategory(category:string){
    return this.http.get(`${this.baseURL}/products?category=${category}`);
  }

  deleteProduct(productId:number):Observable<any>{
    return this.http.delete( `${this.baseURL}/deleteProduct/${productId}`);
  }


}
