import { TestBed } from '@angular/core/testing';

import { ProfileManageUsersResolverService } from './profile-manage-users-resolver.service';

describe('ProfileManageUsersResolverService', () => {
  let service: ProfileManageUsersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileManageUsersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
