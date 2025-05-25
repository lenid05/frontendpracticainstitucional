import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarusuariosComponent } from './actualizarusuarios.component';

describe('ActualizarusuariosComponent', () => {
  let component: ActualizarusuariosComponent;
  let fixture: ComponentFixture<ActualizarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
