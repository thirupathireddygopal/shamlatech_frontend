import { TestBed } from '@angular/core/testing';

import { DashAuthGuard } from './dash-auth.guard';

describe('DashAuthGuard', () => {
  let guard: DashAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
