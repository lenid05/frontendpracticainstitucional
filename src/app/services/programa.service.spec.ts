import { TestBed } from '@angular/core/testing';

import { ProgramasService } from './programa.service';

describe('ProgramasService', () => {
  let service: ProgramasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
