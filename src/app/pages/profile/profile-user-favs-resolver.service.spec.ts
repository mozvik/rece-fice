import { TestBed } from '@angular/core/testing';

import { ProfileUserFavsResolverService } from './profile-user-favs-resolver.service';

describe('ProfileUserFavsResolverService', () => {
  let service: ProfileUserFavsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUserFavsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
