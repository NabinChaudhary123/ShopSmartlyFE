import { Component, Host, HostListener } from '@angular/core';
import { ProductsService } from '../../../services/scrapeproducts/products.service';


@Component({
  selector: 'app-price-deals',
  templateUrl: './price-deals.component.html',
  styleUrl: './price-deals.component.css'
})
export class PriceDealsComponent {

  query: string = '';
  // scrapedData: any[] = [];
  hmProducts: any[] = [];
  fjProducts: any[] = [];
  abcProducts: any[] = [];
  snapdealProducts: any[] = [];
  saltSurfProducts: any[] = [];
  freePeopleProducts: any[] = [];
  sortBy: 'priceLowToHigh' | 'priceHighToLow' = 'priceLowToHigh';
  // comparisonResult: string = '';
  // cheapestProduct: any = null;
  loading: boolean = false;

  constructor(
    private productService:ProductsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.retrieveStoredProducts();
  }

  @HostListener('window:beforeunload',['$event'])
  onBeforeUnload(event: Event){
    this.removeProductsFromLocalStorage();
  }

  searchProducts(): void{
   
    if(this.query.trim()=== ''){
      return;
    }
    this.loading = true;
    this.productService.scrapeProducts(this.query).subscribe(
      (data:any) =>{
        this.hmProducts = data.hmProducts.map((product: any) =>({ ...product, website:'H&M'}));
        this.fjProducts = data.fjProducts.map((product: any) =>({ ...product, website:'FashionJunkee.com'}));
        this.abcProducts = data.abcProducts.map((product: any) =>({ ...product, website:'Abercrombie.com'}));
        this.snapdealProducts = data.snapdealProducts.map((product: any) =>({ ...product, website:'Snapdeal.com'}));
        this.saltSurfProducts = data.saltSurfProducts.map((product: any) =>({ ...product, website:'SaltSurf.com'}));
        this.freePeopleProducts = data.freePeopleProducts.map((product: any) =>({ ...product, website:'FreePeople.com'}));
        this.storeProductsInLocalStorage();
        this.loading = false;
        // this.comparePrices();
        this.sortProducts();
       
      },
      (error:any) => {
        console.log(error);
        this.loading = false;
      }
    )
  }

  // sort product function
  sortProducts(): void {
    console.log(this.sortBy)
    switch (this.sortBy) {
      case 'priceLowToHigh':
        this.sortProductsByPriceLowToHigh();
        break;
      case 'priceHighToLow':
        this.sortProductsByPriceHighToLow();
        break;
      default:
        // Default sorting by price low to high
        this.sortProductsByPriceLowToHigh();
        break;
    }
  }

  // Function to store retrieved products in localStorage
  storeProductsInLocalStorage(): void {
    localStorage.setItem('hmProducts', JSON.stringify(this.hmProducts));
    localStorage.setItem('fjProducts', JSON.stringify(this.fjProducts));
    localStorage.setItem('abcProducts', JSON.stringify(this.abcProducts));
    localStorage.setItem('snapdealProducts', JSON.stringify(this.snapdealProducts));
    localStorage.setItem('saltSurfProducts', JSON.stringify(this.saltSurfProducts));
    localStorage.setItem('freePeopleProducts', JSON.stringify(this.freePeopleProducts));
  }

  removeProductsFromLocalStorage(): void {
    localStorage.removeItem('hmProducts');
    localStorage.removeItem('fjProducts');
    localStorage.removeItem('abcProducts');
    localStorage.removeItem('snapdealProducts');
    localStorage.removeItem('saltSurfProducts');
    localStorage.removeItem('freePeopleProducts');
  }

  // Function to retrieve stored products from localStorage
  retrieveStoredProducts(): void {
    this.hmProducts = JSON.parse(localStorage.getItem('hmProducts') || '[]');
    this.fjProducts = JSON.parse(localStorage.getItem('fjProducts') || '[]');
    this.abcProducts = JSON.parse(localStorage.getItem('abcProducts') || '[]');
    this.snapdealProducts = JSON.parse(localStorage.getItem('snapdealProducts') || '[]');
    this.saltSurfProducts = JSON.parse(localStorage.getItem('saltSurfProducts') || '[]');
    this.freePeopleProducts = JSON.parse(localStorage.getItem('freePeopleProducts') || '[]');
  }

  

  // comparePrices(): void {
  //   let ebayCheaper: boolean = false;
  //   let etsyCheaper: boolean = false;
  //   let lowestPrice: number = Number.MAX_SAFE_INTEGER;
  //   let cheapestProduct: any = null;
  
  //   // Check eBay products
  //   for (let ebayProduct of this.ebayProducts) {
  //     let price = parseFloat(ebayProduct.price.replace(/[^0-9.]/g, ''));
  //     if (price < lowestPrice) {
  //       lowestPrice = price;
  //       cheapestProduct = ebayProduct;
  //       ebayCheaper = true;
  //     }
  //   }
  
  //   // Check Etsy products
  //   for (let etsyProduct of this.etsyProducts) {
  //     let price = parseFloat(etsyProduct.price.replace(/[^0-9.]/g, ''));
  //     if (price < lowestPrice) {
  //       lowestPrice = price;
  //       cheapestProduct = etsyProduct;
  //       etsyCheaper = true;
  //     }
  //   }
  
  //   if (ebayCheaper) {
  //     this.comparisonResult = 'eBay has the cheapest product:';
  //   } else if (etsyCheaper) {
  //     this.comparisonResult = 'Etsy has the cheapest product:';
  //   }
  
  //   if (cheapestProduct) {
  //     this.cheapestProduct = cheapestProduct;
  //   }
  // }


  sortProductsByPriceLowToHigh(): void {
    this.hmProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    this.fjProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    this.abcProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    this.snapdealProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    this.saltSurfProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    this.freePeopleProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  sortProductsByPriceHighToLow(): void {
    this.hmProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    this.fjProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    this.abcProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    this.snapdealProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    this.saltSurfProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    this.freePeopleProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

}
