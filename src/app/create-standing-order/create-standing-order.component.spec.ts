import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStandingOrderComponent } from './create-standing-order.component';

describe('CreateStandingOrderComponent', () => {
  let component: CreateStandingOrderComponent;
  let fixture: ComponentFixture<CreateStandingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStandingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStandingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
