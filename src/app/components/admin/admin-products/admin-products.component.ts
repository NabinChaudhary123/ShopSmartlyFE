import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {

  selectedFile!: File;
  imagePreview: String | ArrayBuffer | null | undefined;

  productForm!: FormGroup;
  

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName:['', [Validators.required]],
      productDescription:['', [Validators.required]],
      category:['', [Validators.required]],
      price:['', [Validators.required]],
      image:['', [Validators.required]]
    })
    this.getAllProducts();
  }

  get productName(){
    return this.productForm.controls['productName']
  } 

  get productDescription(){
    return this.productForm.controls['productDescription']
  }

  get category(){
    return this.productForm.controls['category']
  }

  get price(){
    return this.productForm.controls['price']
  }

  get image(){
    return this.productForm.controls['image']
  }

  constructor(
    private fb:FormBuilder,
    private productService:ProductService
  ){}

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  registerproducts(){
    console.log(this.productForm.value);
    const formData:FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('productName', this.productForm.get('productName')?.value);
    formData.append('productDescription', this.productForm.get('productDescription')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    console.log(formData);
    this.productService.registerProducts(formData).subscribe((response) =>{
      console.log(response)
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  products: any = [];
  // getAllProducts(){
  //   this.productService.getAllProducts().subscribe(
  //     (response) =>{
  //       console.log(response)
  //       this.products = response
  //       response.forEach((element:any) => {
  //         element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
  //         this.products.push(element);
          
  //       });
  //     }
  //   ) 
  // }

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



}
