import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStandingOrderComponent } from './search-standing-order.component';

describe('SearchStandingOrderComponent', () => {
  let component: SearchStandingOrderComponent;
  let fixture: ComponentFixture<SearchStandingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStandingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStandingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
