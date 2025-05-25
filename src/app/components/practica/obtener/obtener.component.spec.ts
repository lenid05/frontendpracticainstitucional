import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerComponent } from './obtener.component';

describe('ObtenerComponent', () => {
  let component: ObtenerComponent;
  let fixture: ComponentFixture<ObtenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
