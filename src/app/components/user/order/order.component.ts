import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { response } from 'express';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  MyOrders: any;

  constructor(
    private http:HttpClient,
    private orderService:OrderService
  ){ }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMyOrders();
  }

  getMyOrders(){
    this.orderService.getOrderByUserId().subscribe((response) =>{
     console.log(response);
     this.MyOrders = response;
      
    })
  }
}
