import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReceiptModalComponent } from './create-receipt-modal.component';

describe('CreateReceiptModalComponent', () => {
  let component: CreateReceiptModalComponent;
  let fixture: ComponentFixture<CreateReceiptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReceiptModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReceiptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
