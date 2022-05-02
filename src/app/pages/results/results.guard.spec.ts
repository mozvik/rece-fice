import { TestBed } from '@angular/core/testing';

import { ResultsGuard } from './results.guard';

describe('ResultsGuard', () => {
  let guard: ResultsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResultsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
