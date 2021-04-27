import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCreditCardComponent } from './search-credit-card.component';

describe('SearchCreditCardComponent', () => {
  let component: SearchCreditCardComponent;
  let fixture: ComponentFixture<SearchCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCreditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
