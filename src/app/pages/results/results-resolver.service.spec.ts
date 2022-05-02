import { TestBed } from '@angular/core/testing';

import { ResultsResolverService } from './results-resolver.service';

describe('ResultsResolverService', () => {
  let service: ResultsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
