import { Component } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { FormBuilder } from '@angular/forms';
import { CheckoutComponent } from '../checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  constructor(
    private cartService:CartService,
    private fb:FormBuilder,
    private dialog:MatDialog,
    private snackBar:MatSnackBar

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

    increaseProductQuantity(productId:number){
      this.cartService.increaseQuantity(productId).subscribe((response) =>{
        this.getCart();
        this.snackBar.open("Quantity increased","Close",{duration:2000})
      })
    }

    decreaseProductQuantity(productId:any){
      const item = this.cartItems.find(item => item.productId === productId);
        if(item.quantity===1){
          this.snackBar.open("Quantity cannot be less than 1","Close",{duration:2000})
          return;
        }
      
      this.cartService.decreaseQuantity(productId).subscribe((response) =>{
        this.getCart();
        this.snackBar.open("Quantity decreased","Close",{duration:2000})
      })
    }

    // placeOrder(){
    //   return this.dialog.open(CheckoutComponent)
    // }
}
