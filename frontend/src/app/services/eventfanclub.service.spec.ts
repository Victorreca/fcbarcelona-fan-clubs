import { TestBed } from '@angular/core/testing';

import { EventfanclubService } from './eventfanclub.service';

describe('EventfanclubService', () => {
  let service: EventfanclubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventfanclubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
