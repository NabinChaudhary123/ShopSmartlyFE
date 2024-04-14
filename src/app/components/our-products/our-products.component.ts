import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrl: './our-products.component.css'
})
export class OurProductsComponent {

  ngOnInit(): void {
    this.getAllProducts();

    //for mens category
    this.getProductsByMenCategory('mens');
    this.getProductsByWomenCategory('womens')
  }

  constructor(
    private productService:ProductService,
    private cartService:CartService,
    private snackbar:MatSnackBar,
    private router:Router
  ){

  }
  
  selectedFile!: File;
  imagePreview: String | ArrayBuffer | null | undefined;

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  products: any = [];
  menProducts: any = [];
  womenProducts: any = [];
  
  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (response) =>{
        console.log(response)
        this.products = response.map((element:any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          return element;
        })
        
      }
    ) 
  }

  addProductToCart(productId:number){
    // console.log(productId);
    if(!window.localStorage.getItem('userId')){
      this.snackbar.open("Please login to add to cart","Close",{duration:3000});
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(productId).subscribe(response=>{
      console.log(response);
      this.snackbar.open("Added to cart","Close",{duration:3000})
      
    },
    error=>{
      this.snackbar.open("Something went wrong","Close",{duration:3000})
    }
  )}

  getProductsByMenCategory(category:string){
    this.productService.getProductByCategory(category).subscribe((response:any) =>{
      this.menProducts = response.map((element:any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        return element;
      })
    })
  }
  getProductsByWomenCategory(category:string){
    this.productService.getProductByCategory(category).subscribe((response:any) =>{
      this.womenProducts = response.map((element:any)=>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        return element;
      })
    })
  }

  
}

