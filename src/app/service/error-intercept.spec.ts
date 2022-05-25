import { TestBed } from '@angular/core/testing';

import { ErrorIntercept } from './error-intercept';

describe('ErrorIntercept', () => {
  let service: ErrorIntercept;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorIntercept);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
