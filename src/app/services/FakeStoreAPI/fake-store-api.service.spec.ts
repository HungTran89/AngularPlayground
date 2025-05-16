import { TestBed } from '@angular/core/testing';

import { FakeStoreAPIService } from './fake-store-api.service';

describe('FakeStoreAPIService', () => {
  let service: FakeStoreAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeStoreAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
