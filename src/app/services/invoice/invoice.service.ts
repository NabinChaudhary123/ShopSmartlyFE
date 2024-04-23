import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http:HttpClient
  ) { }

  getInvoice() {
    return this.http.get<any[]>('http://localhost:8080/invoices/totalInvoices')
  }
}
