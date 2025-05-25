import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerusuariosComponent } from './obtenerusuarios.component';

describe('ObtenerusuariosComponent', () => {
  let component: ObtenerusuariosComponent;
  let fixture: ComponentFixture<ObtenerusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtenerusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
