import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { response } from 'express';

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

}
