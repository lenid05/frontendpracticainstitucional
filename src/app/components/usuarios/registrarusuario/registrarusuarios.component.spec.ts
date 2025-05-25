import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarusuariosComponent } from './registrarusuarios.component';

describe('RegistrarusuariosComponent', () => {
  let component: RegistrarusuariosComponent;
  let fixture: ComponentFixture<RegistrarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
