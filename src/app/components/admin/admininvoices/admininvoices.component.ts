import { Component } from '@angular/core';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { error } from 'console';

@Component({
  selector: 'app-admininvoices',
  templateUrl: './admininvoices.component.html',
  styleUrl: './admininvoices.component.css'
})
export class AdmininvoicesComponent {

  invoices: any[] = [];

  constructor(
    private invoiceService:InvoiceService,

  ){ }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchInvoices();
  }

  fetchInvoices(){
    this.invoiceService.getInvoice().subscribe(
      (data:any) =>{
        this.invoices = data;
      },
      error =>{
        console.log(error);
      }
    )
  }
}
