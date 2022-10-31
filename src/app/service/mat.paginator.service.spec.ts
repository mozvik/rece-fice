/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatPaginatorService } from './mat.paginator.service';

describe('Service: MatPaginator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatPaginatorService]
    });
  });

  it('should ...', inject([MatPaginatorService], (service: MatPaginatorService) => {
    expect(service).toBeTruthy();
  }));
});
