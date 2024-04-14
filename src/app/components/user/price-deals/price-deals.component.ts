import { Component } from '@angular/core';
import { ProductsService } from '../../../services/scrapeproducts/products.service';

@Component({
  selector: 'app-price-deals',
  templateUrl: './price-deals.component.html',
  styleUrl: './price-deals.component.css'
})
export class PriceDealsComponent {

  query: string = '';
  scrapedData: any;

  constructor(
    private productService:ProductsService
  ) {}

  scrape(){
    this.productService.scrapeProducts(this.query).subscribe(data =>{
      this.scrapedData = data.body;
    })
  }
}
