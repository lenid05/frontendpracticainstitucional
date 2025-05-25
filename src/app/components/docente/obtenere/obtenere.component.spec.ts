import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenereComponent } from './obtenere.component';

describe('ObtenereComponent', () => {
  let component: ObtenereComponent;
  let fixture: ComponentFixture<ObtenereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtenereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
