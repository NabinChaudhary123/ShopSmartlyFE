import { Component, Host, HostListener } from '@angular/core';
import { ProductsService } from '../../../services/scrapeproducts/products.service';

@Component({
  selector: 'app-price-deals',
  templateUrl: './price-deals.component.html',
  styleUrl: './price-deals.component.css',
})
export class PriceDealsComponent {
[x: string]: any;
  query: string = '';
  hmProducts: any[] = [];
  fjProducts: any[] = [];
  abcProducts: any[] = [];
  snapdealProducts: any[] = [];
  saltSurfProducts: any[] = [];
  freePeopleProducts: any[] = [];
  macysProducts: any[] = [];
  sortBy: 'priceLowToHigh' | 'priceHighToLow' | 'reviews' | 'bestDeals' = 'priceLowToHigh';
  loading: boolean = false;
  displayedProducts: any[] = [];

  exchangeRate = 130;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.retrieveStoredProducts();
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    this.removeProductsFromLocalStorage();
  }

  searchProducts(): void {
    if (this.query.trim() === '') {
      return;
    }
    this.loading = true;
    this.productService.scrapeProducts(this.query).subscribe(
      (data: any) => {
        this.hmProducts = data.hmProducts.map((product: any) => ({
          ...product,
          website: 'H&M',
        }));
        this.fjProducts = data.fjProducts.map((product: any) => ({
          ...product,
          website: 'FashionJunkee.com',
        }));
        this.abcProducts = data.abcProducts.map((product: any) => ({
          ...product,
          website: 'Abercrombie.com',
        }));
        this.snapdealProducts = data.snapdealProducts.map((product: any) => ({
          ...product,
          website: 'Snapdeal.com',
        }));
        this.saltSurfProducts = data.saltSurfProducts.map((product: any) => ({
          ...product,
          website: 'SaltSurf.com',
        }));
        this.freePeopleProducts = data.freePeopleProducts.map(
          (product: any) => ({ ...product, website: 'FreePeople.com' })
        );
        this.macysProducts = data.macysProducts.map((product: any) => ({
          ...product,
          website: 'Macys.com',
        }));
        this.storeProductsInLocalStorage();
        this.loading = false;
        this.sortProducts();
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.sortBy = selectElement.value as
        | 'priceLowToHigh'
        | 'priceHighToLow'
        | 'reviews'
        | 'bestDeals';
      this.sortProducts();
    }
  }

  sortProducts(): void {
    console.log('Sorting by: ', this.sortBy);
    let allProducts = this.getSortedProducts().map((product) => ({
      ...product,
      convertedPrice: this.convertToNPR(product.price),
    }));

    if (this.sortBy === 'priceLowToHigh') {
      allProducts.sort((a, b) => a.convertedPrice - b.convertedPrice);
    } else if(this.sortBy === 'priceHighToLow') {
      allProducts.sort((a, b) => b.convertedPrice - a.convertedPrice);
    }  
    else if(this.sortBy === 'reviews'){

      allProducts = this.getSortedByReview();
    } 
    else if(this.sortBy === 'bestDeals'){

      allProducts = this.getBestDeals(allProducts);
    }

      this.updateProductLists(allProducts);
     
  }
  getBestDeals(allProducts: any[]): any[] {

  //   // Sorting by cheap price, high ratings, and high reviews
  //   allProducts.sort((a, b) => {
  //     if (a.convertedPrice !== b.convertedPrice) {
  //         return a.convertedPrice - b.convertedPrice; // Cheap price first
  //     } else if (a.ratings !== b.ratings) {
  //         return b.ratings - a.ratings; // High ratings first
  //     } else {
  //         return b.reviews - a.reviews; // High reviews next
  //     }
  // });
  // // Select the top 3 products
  // return allProducts.slice(0, 5);


  allProducts.sort((a, b) => {
    if (a.convertedPrice !== b.convertedPrice) {
        return a.convertedPrice - b.convertedPrice; // Cheap price first
    } else {
        return b.reviews - a.reviews; // High reviews next
    }
});

// Select the top 3 products
return allProducts.slice(0, 5);
                      
  }

  sortByReview(): void {
    this.sortBy = 'reviews';
    this.sortProducts();
  }

  bestDeals():void{
    this.sortBy = 'bestDeals';
    this.sortProducts();
  }

  updateProductLists(allProducts: any[]): void {
    
    // this.macysProducts = allProducts.filter(
    //   (product) => product.website === 'Macys.com'
    // );
    // this.snapdealProducts = allProducts.filter(
    //   (product) => product.website === 'Snapdeal.com'
    // );
    // this.hmProducts = allProducts.filter(
    //   (product) => product.website === 'H&M'
    // );
    // this.fjProducts = allProducts.filter(
    //   (product) => product.website === 'FashionJunkee.com'
    // );
    // this.abcProducts = allProducts.filter(
    //   (product) => product.website === 'Abercrombie.com'
    // );
    // this.saltSurfProducts = allProducts.filter(
    //   (product) => product.website === 'SaltSurf.com'
    // );
    // this.freePeopleProducts = allProducts.filter(
    //   (product) => product.website === 'FreePeople.com'
    // );

    // if (this.sortBy === 'bestDeals') {
    //   this.displayedProducts = allProducts;
    // } else {
    //   this.displayedProducts = [];
    // }
    if (this.sortBy === 'bestDeals') {
      this.displayedProducts = allProducts;
  } else {
      this.displayedProducts = [];
      this.macysProducts = allProducts.filter(
          (product) => product.website === 'Macys.com'
      );
      this.snapdealProducts = allProducts.filter(
          (product) => product.website === 'Snapdeal.com'
      );
      this.hmProducts = allProducts.filter(
          (product) => product.website === 'H&M'
      );
      this.fjProducts = allProducts.filter(
          (product) => product.website === 'FashionJunkee.com'
      );
      this.abcProducts = allProducts.filter(
          (product) => product.website === 'Abercrombie.com'
      );
      this.saltSurfProducts = allProducts.filter(
          (product) => product.website === 'SaltSurf.com'
      );
      this.freePeopleProducts = allProducts.filter(
          (product) => product.website === 'FreePeople.com'
      );

      // Concatenate all filtered products into displayedProducts
      this.displayedProducts = [
          ...this.displayedProducts,
          ...this.macysProducts,
          ...this.snapdealProducts,
          ...this.hmProducts,
          ...this.fjProducts,
          ...this.abcProducts,
          ...this.saltSurfProducts,
          ...this.freePeopleProducts
      ];
  }
  }

  getSortedProducts(): any[] {
    return [
      ...this.hmProducts,
      ...this.fjProducts,
      ...this.snapdealProducts,
      ...this.abcProducts,
      ...this.saltSurfProducts,
      ...this.freePeopleProducts,
      ...this.macysProducts,
    ];
  }
  getSortedByReview():any[]{
    return [
      ...this.macysProducts,
      ...this.snapdealProducts,
      ...this.hmProducts,
      ...this.fjProducts,
      ...this.abcProducts,
      ...this.saltSurfProducts,
      ...this.freePeopleProducts,
      
    ];
  }

  // Function to store retrieved products in localStorage
  storeProductsInLocalStorage(): void {
    localStorage.setItem('hmProducts', JSON.stringify(this.hmProducts));
    localStorage.setItem('fjProducts', JSON.stringify(this.fjProducts));
    localStorage.setItem('abcProducts', JSON.stringify(this.abcProducts));
    localStorage.setItem(
      'snapdealProducts',
      JSON.stringify(this.snapdealProducts)
    );
    localStorage.setItem(
      'saltSurfProducts',
      JSON.stringify(this.saltSurfProducts)
    );
    localStorage.setItem(
      'freePeopleProducts',
      JSON.stringify(this.freePeopleProducts)
    );
    localStorage.setItem('macysProducts', JSON.stringify(this.macysProducts));
  }

  removeProductsFromLocalStorage(): void {
    localStorage.removeItem('hmProducts');
    localStorage.removeItem('fjProducts');
    localStorage.removeItem('abcProducts');
    localStorage.removeItem('snapdealProducts');
    localStorage.removeItem('saltSurfProducts');
    localStorage.removeItem('freePeopleProducts');
    localStorage.removeItem('macysProducts');
  }

  // Function to retrieve stored products from localStorage
  retrieveStoredProducts(): void {
    this.hmProducts = JSON.parse(localStorage.getItem('hmProducts') || '[]');
    this.fjProducts = JSON.parse(localStorage.getItem('fjProducts') || '[]');
    this.abcProducts = JSON.parse(localStorage.getItem('abcProducts') || '[]');
    this.snapdealProducts = JSON.parse(
      localStorage.getItem('snapdealProducts') || '[]'
    );
    this.saltSurfProducts = JSON.parse(
      localStorage.getItem('saltSurfProducts') || '[]'
    );
    this.freePeopleProducts = JSON.parse(
      localStorage.getItem('freePeopleProducts') || '[]'
    );
    this.macysProducts = JSON.parse(
      localStorage.getItem('macysProducts') || '[]'
    );
  }

  parsePrice(price: string): number {
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  }
  convertToNPR(price: string): number {
    const parsedPrice = this.parsePrice(price);
    if (price.includes('$')) {
      return parsedPrice * this.exchangeRate; // Convert USD to NPR
    } else {
      return parsedPrice; // Assume the price is already in NPR
    }
  }
  sanitizeReviews(reviews: string): string {
    if (reviews) {
        return reviews.replace(/\(|\)/g, '');
    } else {
        return '';
    }
}

getStarIcons(rating: string): string {
  const integralPart = parseInt(rating.split('.')[0]);
  let stars = '';
  for (let i = 0; i < integralPart; i++) {
    stars += '★';
  }
  return stars;
}



}
