import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceiptModalComponent } from './update-receipt-modal.component';

describe('UpdateReceiptModalComponent', () => {
  let component: UpdateReceiptModalComponent;
  let fixture: ComponentFixture<UpdateReceiptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReceiptModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReceiptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
