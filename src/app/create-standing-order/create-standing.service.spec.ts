import { TestBed } from '@angular/core/testing';

import { CreateStandingService } from './create-standing.service';

describe('CreateStandingService', () => {
  let service: CreateStandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateStandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
