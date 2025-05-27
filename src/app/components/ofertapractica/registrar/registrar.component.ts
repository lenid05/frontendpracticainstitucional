import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { OfertaspracticasService } from '../../../services/ofertapractica.service';
import { CreateOfertaPracticaRequest } from '../../../interfaces/ofertaspracticas.interface';

@Component({
  selector: 'app-registrar-oferta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  providers: [OfertaspracticasService],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarOfertaComponent implements OnInit {
  ofertaForm: FormGroup;
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private ofertasService: OfertaspracticasService
  ) {
    this.ofertaForm = this.fb.group({
      idOfertaPractica: ['', [Validators.required, Validators.min(1)]],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaPublicacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Establecer fecha actual por defecto
    const fechaActual = new Date().toISOString().slice(0, 16);
    this.ofertaForm.patchValue({ fechaPublicacion: fechaActual });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.ofertaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.ofertaForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.showSuccessMessage = false;

      const ofertaData: CreateOfertaPracticaRequest = {
        ...this.ofertaForm.value,
        idOfertaPractica: Number(this.ofertaForm.value.idOfertaPractica)
      };
console.log('Datos a enviar:', ofertaData);
      this.ofertasService.createOfertaPractica(ofertaData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.showSuccessMessage = true;
          this.resetForm();
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Error al registrar la oferta. Por favor, intente nuevamente.';
          console.error('Error:', error);
        }
      });
    } else {
      Object.keys(this.ofertaForm.controls).forEach(key => {
        const control = this.ofertaForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  resetForm(): void {
    this.ofertaForm.reset();
    // Restablecer fecha actual
    const fechaActual = new Date().toISOString().slice(0, 16);
    this.ofertaForm.patchValue({ fechaPublicacion: fechaActual });
    this.errorMessage = '';
  }
}