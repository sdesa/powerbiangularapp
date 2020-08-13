import { TestBed } from '@angular/core/testing';

import { BiService } from './bi.service';

describe('BiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiService = TestBed.get(BiService);
    expect(service).toBeTruthy();
  });
});
