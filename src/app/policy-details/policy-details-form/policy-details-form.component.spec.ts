import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailsFormComponent } from './policy-details-form.component';

describe('PolicyDetailsFormComponent', () => {
  let component: PolicyDetailsFormComponent;
  let fixture: ComponentFixture<PolicyDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyDetailsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
