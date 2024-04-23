import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininvoicesComponent } from './admininvoices.component';

describe('AdmininvoicesComponent', () => {
  let component: AdmininvoicesComponent;
  let fixture: ComponentFixture<AdmininvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmininvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmininvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
