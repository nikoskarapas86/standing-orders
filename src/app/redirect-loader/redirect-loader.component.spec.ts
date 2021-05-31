import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectLoaderComponent } from './redirect-loader.component';

describe('RedirectLoaderComponent', () => {
  let component: RedirectLoaderComponent;
  let fixture: ComponentFixture<RedirectLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
