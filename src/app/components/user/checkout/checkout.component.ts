import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';import { OrderService } from '../../../services/order/order.service';
;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.orderForm = this.fb.group({
      address: ['', [Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  get address(){
    return this.orderForm.controls['address'];

  }
  get description(){
    return this.orderForm.controls['description'];
  }

  CheckOut() {

    if(this.orderForm.invalid){
      if(this.address.errors?.['required']){
        this.snackBar.open('Please provide address', 'Close', { duration: 2000 })
      }
      if(this.description.errors?.['required']){
        this.snackBar.open('Please provide description', 'Close', { duration: 2000 })
      }
      return;
    }

    console.log(this.orderForm.value);
    this.orderService.placeOrder(this.orderForm.value).subscribe(response => {
      console.log(response);
      this.snackBar.open("Order placed successfully", "Close", { duration: 2000 })
      this.router.navigate(['/landing'])
      // window.location.href = response.payment_url

    })
  }


}
