import { TestBed } from '@angular/core/testing';

import { DocentesService } from './docente.service';

describe('DocentesService', () => {
  let service: DocentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
