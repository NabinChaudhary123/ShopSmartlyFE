 import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  recentOrders: any;
  totalOrders: any;
  pendingOrders: any;

  constructor(
    private http:HttpClient,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getRecentOrders();
    this.getTotalOrders();
    this.getPendingOrders();
    
  }

  getRecentOrders(){
    this.orderService.getRecentOrders().subscribe(
      (response) => {
        this.recentOrders = response;
  })
}
  getTotalOrders(){
    this.orderService.getTotalOrders().subscribe(
      (response) => {
        this.totalOrders = response;
  })
  }

  getPendingOrders(){
    this.orderService.getPendingOrders().subscribe(
      (response) => {
        this.pendingOrders = response;
  })
    
  }

}
