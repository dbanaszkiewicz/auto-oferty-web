import { TestBed } from '@angular/core/testing';

import { BMVService } from './b-m-v.service';

describe('BMVService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BMVService = TestBed.get(BMVService);
    expect(service).toBeTruthy();
  });
});
