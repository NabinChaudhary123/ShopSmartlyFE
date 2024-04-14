import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpClient,

  ) { }

  scrapeProducts(query:string){

    return this.http.get<any>(`http://localhost:8080/web/scrape?query=${query}`)
  }

}
