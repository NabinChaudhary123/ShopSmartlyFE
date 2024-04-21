import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpClient,

  ) { }

  scrapeProducts(query:string):Observable<any>{

    return this.http.get(`http://localhost:8080/web/scrape?query=${query}`)
  }

}
