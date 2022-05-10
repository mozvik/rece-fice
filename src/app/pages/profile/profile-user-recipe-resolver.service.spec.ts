import { TestBed } from '@angular/core/testing';

import { ProfileUserRecipeResolverService } from './profile-user-recipe-resolver.service';

describe('ProfileUserRecipeResolverService', () => {
  let service: ProfileUserRecipeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUserRecipeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
