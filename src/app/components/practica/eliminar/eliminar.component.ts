// src/app/components/practica/eliminar/eliminar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PracticasService } from '../../../services/practica.service';
import { PracticaConInfo } from '../../../interfaces/practicas.interfaces';

@Component({
  selector: 'app-eliminar-practica',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  providers: [PracticasService],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss'
})
export class EliminarComponent implements OnInit {
  practicaId: number = 0;
  practica: PracticaConInfo | null = null;
  
  isLoadingPractica = false;
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';
  errorCarga = '';
  confirmacionEliminacion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private practicasService: PracticasService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.practicaId = +params['id'];
      if (this.practicaId) {
        this.cargarPractica();
      } else {
        this.errorCarga = 'ID de práctica inválido';
      }
    });
  }

  cargarPractica(): void {
    this.isLoadingPractica = true;
    this.errorCarga = '';

    // Primero intentamos obtener la práctica con información completa
    this.practicasService.getPracticasConInfo().subscribe({
      next: (practicas: PracticaConInfo[]) => {
        const practicaEncontrada = practicas.find(p => p.idPractica === this.practicaId);
        if (practicaEncontrada) {
          this.practica = practicaEncontrada;
          this.isLoadingPractica = false;
        } else {
          // Si no se encuentra, intentamos con el método individual
          this.cargarPracticaIndividual();
        }
      },
      error: (error: any) => {
        console.error('Error al cargar prácticas:', error);
        // Si falla, intentamos con el método individual
        this.cargarPracticaIndividual();
      }
    });
  }

  cargarPracticaIndividual(): void {
    this.practicasService.getPracticaById(this.practicaId).subscribe({
      next: (practica: any) => {
        this.practica = practica;
        this.isLoadingPractica = false;
      },
      error: (error: any) => {
        console.error('Error al cargar práctica:', error);
        this.errorCarga = 'Error al cargar los datos de la práctica. Verifique que el ID sea correcto.';
        this.isLoadingPractica = false;
      }
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getEstadoClass(estado: string): string {
    const clases = {
      'Activa': 'badge bg-success',
      'En Proceso': 'badge bg-primary',
      'Finalizada': 'badge bg-secondary',
      'Cancelada': 'badge bg-danger'
    };
    return clases[estado as keyof typeof clases] || 'badge bg-secondary';
  }

  eliminarPractica(): void {
    if (!this.confirmacionEliminacion) {
      alert('Debe confirmar que desea eliminar la práctica');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.practicasService.deletePractica(this.practicaId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.showSuccessMessage = true;
        this.confirmacionEliminacion = false;
        
        // Opcional: redirigir automáticamente después de 3 segundos
        setTimeout(() => {
          this.router.navigate(['/practicas/listar']);
        }, 3000);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Error al eliminar la práctica. Por favor, intente nuevamente.';
        console.error('Error:', error);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/practicas/listar']);
  }
}