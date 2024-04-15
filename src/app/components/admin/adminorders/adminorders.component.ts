import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { response } from 'express';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrl: './adminorders.component.css'
})
export class AdminordersComponent {

  allOrders: any;
  constructor(
    private http:HttpClient,
    private orderService:OrderService,
    private snackbar:MatSnackBar
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.getAllOrders().subscribe((response)=>{
      console.log(response);
      this.allOrders = response;
    })
  }

  generatePDF():void{
    this.orderService.generatePDF().subscribe(response=>{
      console.log("PDF generated successfully");
      this.snackbar.open("PDF generated successfully","Close",{duration:3000});
      
    },
    error =>{
      console.log("Error generating PDF: ",error);
      this.snackbar.open("Something went wrong","Close",{duration:3000});
    }
  );
    
  }

}
