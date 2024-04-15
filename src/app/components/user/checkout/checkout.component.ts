import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';;

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
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.orderForm = this.fb.group({
      address: ['', [Validators.required]],
      description: [''],
    })
  }

  CheckOut() {
    console.log(this.orderForm.value);
    this.cartService.placeOrder(this.orderForm.value).subscribe(response => {
      console.log(response);
      this.snackBar.open("Order placed successfully", "Close", { duration: 2000 })
      this.router.navigate(['/landing'])

    })
  }


}
