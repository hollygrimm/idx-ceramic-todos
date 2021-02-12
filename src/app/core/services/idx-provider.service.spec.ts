import { TestBed } from '@angular/core/testing';

import { IdxProviderService } from './idx-provider.service';

describe('IdxProviderService', () => {
  let service: IdxProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdxProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
