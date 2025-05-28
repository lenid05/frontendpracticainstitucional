// src/app/components/practica/registrar/registrar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { PracticasService } from '../../../services/practica.service';
import { OfertaspracticasService } from '../../../services/ofertapractica.service';
import { CreatePracticaRequest } from '../../../interfaces/practicas.interfaces';
import { OfertaPractica } from '../../../interfaces/ofertaspracticas.interface';

@Component({
  selector: 'app-registrar-practica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  providers: [PracticasService, OfertaspracticasService],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent implements OnInit {
  practicaForm: FormGroup;
  ofertas: OfertaPractica[] = [];
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private practicasService: PracticasService,
    private ofertasService: OfertaspracticasService
  ) {
    this.practicaForm = this.fb.group({
      idPractica: ['', [Validators.required, Validators.min(1)]],
      idEstudiante: ['', [Validators.required, Validators.min(1)]],
      idDocente: ['', [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      idOfertaPractica: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas(): void {
    this.ofertasService.getAllOfertasPracticas().subscribe({
      next: (ofertas: OfertaPractica[]) => {
        this.ofertas = ofertas;
      },
      error: (error: any) => {
        console.error('Error al cargar ofertas:', error);
        this.errorMessage = 'Error al cargar las ofertas de práctica';
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.practicaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.practicaForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.showSuccessMessage = false;

      const practicaData: CreatePracticaRequest = {
        ...this.practicaForm.value,
        idPractica: Number(this.practicaForm.value.idPractica),
        idEstudiante: Number(this.practicaForm.value.idEstudiante),
        idDocente: Number(this.practicaForm.value.idDocente),
        idOfertaPractica: Number(this.practicaForm.value.idOfertaPractica)
      };

      this.practicasService.createPractica(practicaData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Error al registrar la práctica. Por favor, intente nuevamente.';
          console.error('Error:', error);
        }
      });
    } else {
      Object.keys(this.practicaForm.controls).forEach(key => {
        const control = this.practicaForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  resetForm(): void {
    this.practicaForm.reset();
    this.errorMessage = '';
    this.showSuccessMessage = false;
  }

  registrarOtra(): void {
    this.resetForm();
  }
}