import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { OfertaspracticasService } from '../../../services/ofertapractica.service';
import { OfertaPractica } from '../../../interfaces/ofertaspracticas.interface';

@Component({
  selector: 'app-actualizar-oferta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  providers: [OfertaspracticasService],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class ActualizarOfertaComponent implements OnInit {
  ofertaForm: FormGroup;
  ofertaId: number = 0;
  ofertaOriginal: OfertaPractica | null = null;
  
  isLoadingOferta = false;
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';
  errorCarga = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertaspracticasService
  ) {
    this.ofertaForm = this.fb.group({
      idOfertaPractica: [{ value: '', disabled: true }],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaPublicacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ofertaId = +params['id'];
      if (this.ofertaId) {
        this.cargarOferta();
      } else {
        this.errorCarga = 'ID de oferta inválido';
      }
    });
  }

  cargarOferta(): void {
    this.isLoadingOferta = true;
    this.errorCarga = '';

    this.ofertasService.getOfertaPracticaById(this.ofertaId).subscribe({
      next: (oferta: OfertaPractica) => {
        this.ofertaOriginal = { ...oferta };
        this.llenarFormulario(oferta);
        this.isLoadingOferta = false;
      },
      error: (error: any) => {
        console.error('Error al cargar oferta:', error);
        this.errorCarga = 'Error al cargar los datos de la oferta.';
        this.isLoadingOferta = false;
      }
    });
  }

  llenarFormulario(oferta: OfertaPractica): void {
    const fechaPublicacion = this.formatearFechaParaInput(oferta.fechaPublicacion);

    this.ofertaForm.patchValue({
      idOfertaPractica: oferta.idOfertaPractica,
      titulo: oferta.titulo,
      descripcion: oferta.descripcion,
      fechaPublicacion: fechaPublicacion
    });

    this.ofertaForm.markAsPristine();
  }

  formatearFechaParaInput(fechaString: string): string {
    if (!fechaString) return '';
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) return '';
    const offsetMs = fecha.getTimezoneOffset() * 60 * 1000;
    const fechaLocal = new Date(fecha.getTime() - offsetMs);
    return fechaLocal.toISOString().slice(0, 16);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.ofertaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasFormChanged(): boolean {
    if (!this.ofertaOriginal) return false;

    const currentValues = this.ofertaForm.getRawValue();
    
    return (
      currentValues.titulo !== this.ofertaOriginal.titulo ||
      currentValues.descripcion !== this.ofertaOriginal.descripcion ||
      this.formatearFechaParaInput(this.ofertaOriginal.fechaPublicacion) !== currentValues.fechaPublicacion
    );
  }

  onSubmit(): void {
    if (this.ofertaForm.valid) {
      if (!this.hasFormChanged()) {
        this.errorMessage = 'No se han detectado cambios en los datos.';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.showSuccessMessage = false;

      const formValues = this.ofertaForm.getRawValue();
      const ofertaData: OfertaPractica = {
        idOfertaPractica: this.ofertaId,
        titulo: formValues.titulo,
        descripcion: formValues.descripcion,
        fechaPublicacion: formValues.fechaPublicacion
      };

      this.ofertasService.updateOfertaPractica(ofertaData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.showSuccessMessage = true;
          this.ofertaOriginal = { ...ofertaData };
          this.ofertaForm.markAsPristine();
          
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Error al actualizar la oferta.';
          console.error('Error:', error);
        }
      });
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.ofertaForm.controls).forEach(key => {
      const control = this.ofertaForm.get(key);
      if (control && !control.disabled) {
        control.markAsTouched();
      }
    });
  }

  resetForm(): void {
    if (this.ofertaOriginal) {
      this.llenarFormulario(this.ofertaOriginal);
      this.errorMessage = '';
      this.showSuccessMessage = false;
    }
  }
}