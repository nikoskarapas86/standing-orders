import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIbanComponent } from './search-iban.component';

describe('SearchIbanComponent', () => {
  let component: SearchIbanComponent;
  let fixture: ComponentFixture<SearchIbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
