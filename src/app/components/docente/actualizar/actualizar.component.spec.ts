import { ComponentFixture, TestBed } from '@angular/core/testing';

import { actualizarDocente} from './actualizar.component';



describe('ActualizarComponent', () => {
  let component: actualizarDocente;
  let fixture: ComponentFixture<actualizarDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [actualizarDocente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(actualizarDocente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
