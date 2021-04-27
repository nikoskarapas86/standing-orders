import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWayCheckerComponent } from './payment-way-checker.component';

describe('PaymentWayCheckerComponent', () => {
  let component: PaymentWayCheckerComponent;
  let fixture: ComponentFixture<PaymentWayCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWayCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWayCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
