import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarusuariosComponent } from './eliminarusuarios.component';

describe('EliminarusuariosComponent', () => {
  let component: EliminarusuariosComponent;
  let fixture: ComponentFixture<EliminarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
