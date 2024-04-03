import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrl: './our-products.component.css'
})
export class OurProductsComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }

  constructor(
    private productService:ProductService,
    private cartService:CartService
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

  addProductToCart(productId:any){
    console.log(productId);
    this.cartService.addToCart(productId).subscribe(response=>{
      console.log(response)
    },
    error =>{
      console.log(error);
    }
    ) 

  }
}
