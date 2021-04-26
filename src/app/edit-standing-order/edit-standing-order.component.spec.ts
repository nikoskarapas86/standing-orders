import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStandingOrderComponent } from './edit-standing-order.component';

describe('EditStandingOrderComponent', () => {
  let component: EditStandingOrderComponent;
  let fixture: ComponentFixture<EditStandingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStandingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStandingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
