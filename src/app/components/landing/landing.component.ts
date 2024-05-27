import { Component } from '@angular/core';
import { faCartPlus, faGlobe, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  priceTag = faMoneyBill
  convenience = faCartPlus
  solution = faGlobe
}
