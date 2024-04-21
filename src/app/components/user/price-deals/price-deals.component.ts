import { Component } from '@angular/core';
import { ProductsService } from '../../../services/scrapeproducts/products.service';
import { error } from 'console';

@Component({
  selector: 'app-price-deals',
  templateUrl: './price-deals.component.html',
  styleUrl: './price-deals.component.css'
})
export class PriceDealsComponent {

  query: string = '';
  // scrapedData: any[] = [];
  etsyProducts: any[] = [];
  ebayProducts: any[] = [];
  comparisonResult: string = '';
  cheapestProduct: any = null;

  constructor(
    private productService:ProductsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  searchProducts(): void{
   
    if(this.query.trim()=== ''){
      return;
    }
    this.productService.scrapeProducts(this.query).subscribe(
      (data:any) =>{
        this.ebayProducts = data.ebayProducts;
        this.etsyProducts = data.etsyProducts;
        this.comparePrices();
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  comparePrices(): void {
    let ebayCheaper: boolean = false;
    let etsyCheaper: boolean = false;
    let lowestPrice: number = Number.MAX_SAFE_INTEGER;
    let cheapestProduct: any = null;
  
    // Check eBay products
    for (let ebayProduct of this.ebayProducts) {
      let price = parseFloat(ebayProduct.price.replace(/[^0-9.]/g, ''));
      if (price < lowestPrice) {
        lowestPrice = price;
        cheapestProduct = ebayProduct;
        ebayCheaper = true;
      }
    }
  
    // Check Etsy products
    for (let etsyProduct of this.etsyProducts) {
      let price = parseFloat(etsyProduct.price.replace(/[^0-9.]/g, ''));
      if (price < lowestPrice) {
        lowestPrice = price;
        cheapestProduct = etsyProduct;
        etsyCheaper = true;
      }
    }
  
    if (ebayCheaper) {
      this.comparisonResult = 'eBay has the cheapest product:';
    } else if (etsyCheaper) {
      this.comparisonResult = 'Etsy has the cheapest product:';
    }
  
    if (cheapestProduct) {
      this.cheapestProduct = cheapestProduct;
    }
  }

}
