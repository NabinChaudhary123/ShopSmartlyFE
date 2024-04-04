import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { privateDecrypt } from 'crypto';
import { FormBuilder } from '@angular/forms';
import { response } from 'express';
import { CheckoutComponent } from '../checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;
cartItemsDto: any;

  constructor(
    private cartService:CartService,
    private fb:FormBuilder,
    private dialog:MatDialog

    ){ }

    ngOnInit(): void {
      
      this.getCart();
    }

    getCart(){
      this.cartItems = [];
      this.cartService.getCartByUserId().subscribe(response =>{
        console.log(response);
        this.order = response;
       (response.cartItems || []).forEach((element:any) => {
        element.processedImg = 'data:image/jpeg;base64,'+element.returnedImage;
        this.cartItems.push(element);
       });
      })
    }

    increaseProductQuantity(productId:any){
      this.cartService.increaseQuantity(productId).subscribe(response =>{
        this.getCart();
      })
    }

    decreaseProductQuantity(productId:any){
      this.cartService.decreaseQuantity(productId).subscribe(response =>{
        this.getCart();
      })
    }

    placeOrder(){
      return this.dialog.open(CheckoutComponent)
    }
}
