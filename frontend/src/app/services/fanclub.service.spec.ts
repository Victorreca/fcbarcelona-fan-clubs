import { TestBed } from '@angular/core/testing';

import { FanclubService } from './fanclub.service';

describe('FanclubService', () => {
  let service: FanclubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanclubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
