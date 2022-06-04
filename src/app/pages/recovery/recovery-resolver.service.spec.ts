import { TestBed } from '@angular/core/testing';

import { RecoveryResolverService } from './recovery-resolver.service';

describe('RecoveryResolverService', () => {
  let service: RecoveryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
