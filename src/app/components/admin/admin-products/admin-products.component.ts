import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent {
  selectedFile!: File;
  imagePreview: String | ArrayBuffer | null | undefined;

  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      category: ['', [Validators.required, this.categoryvalidator]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.getAllProducts();
  }

  get productName() {
    return this.productForm.controls['productName'];
  }

  get productDescription() {
    return this.productForm.controls['productDescription'];
  }

  categoryvalidator(control: { value: string }) {
    // return this.productForm.controls['category']
    const validCategory = ['Mens', 'Womens', 'Childrens'];
    if (control.value && validCategory.indexOf(control.value) === -1) {
      return { invalidCategory: true };
    }
    return null;
  }

  get category() {
    return this.productForm.get('category');
  }

  get price() {
    return this.productForm.controls['price'];
  }

  get image() {
    return this.productForm.controls['image'];
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }


  registerProducts() {
    if (!this.selectedFile) {
      this.snackBar.open('Please select image', 'Close', { duration: 3000 });
      return;
    }
    if (!this.productForm.get('productName')?.value) {
      this.snackBar.open('Please enter product name', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Check if product description is empty
    if (!this.productForm.get('productDescription')?.value) {
      this.snackBar.open('Please enter product description', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Check if category is empty
    if (!this.productForm.get('category')?.value) {
      this.snackBar.open('Please enter category', 'Close', { duration: 3000 });
      return;
    }

    // Check if price is empty
    if (!this.productForm.get('price')?.value) {
      this.snackBar.open('Please enter price', 'Close', { duration: 3000 });
      return;
    }

    console.log(this.productForm.value);
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('productName', this.productForm.get('productName')?.value);
    formData.append(
      'productDescription',
      this.productForm.get('productDescription')?.value
    );
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    console.log(formData);
    this.productService.registerProducts(formData).subscribe(
      (response) => {
        console.log(response);
        this.productForm.reset();
        this.snackBar.open('Product registered successfully', 'Close', {
          duration: 3000
        },
        
        
      );
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Something went wrong', 'Close', { duration: 3000 });
      }
    );
  }

  products: any = [];

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      console.log(response);
      this.products = response.map((element: any) => {
        element.processedImg =
          'data:image/jpeg;base64,' + element.returnedImage;
        return element;
      });
    });
  }

  deleteProduct(productId: number) {
    console.log(productId);
    this.productService.deleteProduct(productId).subscribe((response) => {
      console.log(response);
      // Remove the deleted product from the products array
      this.products = this.products.filter((product: any) => product.productId !== productId);
      this.snackBar.open('Product deleted successfully', 'Close', {
        duration: 3000,
      });
    });
  }
}
