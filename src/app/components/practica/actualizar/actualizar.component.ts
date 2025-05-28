// src/app/components/practica/actualizar/actualizar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { PracticasService } from '../../../services/practica.service';
import { OfertaspracticasService } from '../../../services/ofertapractica.service';
import { Practica } from '../../../interfaces/practicas.interfaces';
import { OfertaPractica } from '../../../interfaces/ofertaspracticas.interface';

@Component({
  selector: 'app-actualizar-practica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  providers: [PracticasService, OfertaspracticasService],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class ActualizarComponent implements OnInit {
  practicaForm: FormGroup;
  practicaId: number = 0;
  practicaOriginal: Practica | null = null;
  ofertas: OfertaPractica[] = [];
  
  isLoadingPractica = false;
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';
  errorCarga = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private practicasService: PracticasService,
    private ofertasService: OfertaspracticasService
  ) {
    this.practicaForm = this.fb.group({
      idPractica: [{ value: '', disabled: true }],
      idEstudiante: ['', [Validators.required, Validators.min(1)]],
      idDocente: ['', [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      idOfertaPractica: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.practicaId = +params['id'];
      if (this.practicaId) {
        this.cargarOfertas();
        this.cargarPractica();
      } else {
        this.errorCarga = 'ID de práctica inválido';
      }
    });
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

  cargarPractica(): void {
    this.isLoadingPractica = true;
    this.errorCarga = '';

    this.practicasService.getPracticaById(this.practicaId).subscribe({
      next: (practica: Practica) => {
        this.practicaOriginal = { ...practica }; // Crear copia para comparación
        this.llenarFormulario(practica);
        this.isLoadingPractica = false;
      },
      error: (error: any) => {
        console.error('Error al cargar práctica:', error);
        this.errorCarga = 'Error al cargar los datos de la práctica. Verifique que el ID sea correcto.';
        this.isLoadingPractica = false;
      }
    });
  }

  llenarFormulario(practica: Practica): void {
    // Formatear fechas para datetime-local
    const fechaInicio = this.formatearFechaParaInput(practica.fechaInicio);
    const fechaFin = this.formatearFechaParaInput(practica.fechaFin);

    this.practicaForm.patchValue({
      idPractica: practica.idPractica,
      idEstudiante: practica.idEstudiante,
      idDocente: practica.idDocente,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      estado: practica.estado,
      idOfertaPractica: practica.idOfertaPractica
    });

    // Marcar como pristine después de cargar
    this.practicaForm.markAsPristine();
  }

  formatearFechaParaInput(fechaString: string): string {
    if (!fechaString) return '';
    
    const fecha = new Date(fechaString);
    
    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) return '';
    
    // Ajustar para la zona horaria local
    const offsetMs = fecha.getTimezoneOffset() * 60 * 1000;
    const fechaLocal = new Date(fecha.getTime() - offsetMs);
    
    return fechaLocal.toISOString().slice(0, 16);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.practicaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasFormChanged(): boolean {
    if (!this.practicaOriginal) return false;

    const currentValues = this.practicaForm.getRawValue(); // getRawValue incluye campos disabled
    
    return (
      currentValues.idEstudiante !== this.practicaOriginal.idEstudiante ||
      currentValues.idDocente !== this.practicaOriginal.idDocente ||
      currentValues.estado !== this.practicaOriginal.estado ||
      currentValues.idOfertaPractica !== this.practicaOriginal.idOfertaPractica ||
      this.formatearFechaParaInput(this.practicaOriginal.fechaInicio) !== currentValues.fechaInicio ||
      this.formatearFechaParaInput(this.practicaOriginal.fechaFin) !== currentValues.fechaFin
    );
  }

  onSubmit(): void {
    if (this.practicaForm.valid) {
      if (!this.hasFormChanged()) {
        this.errorMessage = 'No se han detectado cambios en los datos de la práctica.';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.showSuccessMessage = false;

      const formValues = this.practicaForm.getRawValue();
      const practicaData: Practica = {
        idPractica: this.practicaId,
        idEstudiante: Number(formValues.idEstudiante),
        idDocente: Number(formValues.idDocente),
        fechaInicio: formValues.fechaInicio,
        fechaFin: formValues.fechaFin,
        estado: formValues.estado,
        idOfertaPractica: Number(formValues.idOfertaPractica)
      };

      this.practicasService.updatePractica(practicaData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.showSuccessMessage = true;
          this.practicaOriginal = { ...practicaData }; // Actualizar los datos originales
          this.practicaForm.markAsPristine(); // Marcar como sin cambios
          
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Error al actualizar la práctica. Por favor, intente nuevamente.';
          console.error('Error:', error);
        }
      });
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.practicaForm.controls).forEach(key => {
      const control = this.practicaForm.get(key);
      if (control && !control.disabled) {
        control.markAsTouched();
      }
    });
  }

  resetForm(): void {
    if (this.practicaOriginal) {
      this.llenarFormulario(this.practicaOriginal);
      this.errorMessage = '';
      this.showSuccessMessage = false;
    }
  }

  editarOtra(): void {
    this.router.navigate(['/practicas/listar']);
  }

  // Guard para prevenir salida con cambios sin guardar
  canDeactivate(): boolean {
    if (this.hasFormChanged() && !this.showSuccessMessage) {
      return confirm('¿Estás seguro de que deseas salir? Los cambios no guardados se perderán.');
    }
    return true;
  }
}