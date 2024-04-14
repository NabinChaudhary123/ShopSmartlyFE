import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDealsComponent } from './price-deals.component';

describe('PriceDealsComponent', () => {
  let component: PriceDealsComponent;
  let fixture: ComponentFixture<PriceDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceDealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
