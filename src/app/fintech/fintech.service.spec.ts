import { TestBed } from '@angular/core/testing';

import { FintechService } from './fintech.service';

describe('FintechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FintechService = TestBed.get(FintechService);
    expect(service).toBeTruthy();
  });
});
