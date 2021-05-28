import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailFormComponent } from './policy-detail-form.component';

describe('PolicyDetailFormComponent', () => {
  let component: PolicyDetailFormComponent;
  let fixture: ComponentFixture<PolicyDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
