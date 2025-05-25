import { TestBed } from '@angular/core/testing';

import { OfertaspracticasService } from './ofertapractica.service';

describe('OfertaspracticasService', () => {
  let service: OfertaspracticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertaspracticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
