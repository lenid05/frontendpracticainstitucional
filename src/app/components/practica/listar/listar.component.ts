// src/app/components/practica/listar/listar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PracticasService } from '../../../services/practica.service';
import { PracticaConInfo } from '../../../interfaces/practicas.interfaces';

declare var bootstrap: any;

@Component({
  selector: 'app-listar-practicas',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [PracticasService],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements OnInit {
  practicas: PracticaConInfo[] = [];
  practicaSeleccionada: PracticaConInfo | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private practicasService: PracticasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPracticas();
  }

  cargarPracticas(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.practicasService.getPracticasConInfo().subscribe({
      next: (practicas: PracticaConInfo[]) => {
        this.practicas = practicas;
        this.isLoading = false;
        console.log('Prácticas cargadas:', practicas);
      },
      error: (error: any) => {
        console.error('Error al cargar prácticas:', error);
        this.errorMessage = 'Error al cargar las prácticas. Verifique que el servidor esté funcionando.';
        this.isLoading = false;
      }
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  verDetalle(practica: PracticaConInfo): void {
    this.practicaSeleccionada = practica;
    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
    modal.show();
  }

editarPractica(practica: PracticaConInfo): void {
  this.router.navigate(['/practicas/actualizar', practica.idPractica]);
}

  eliminarPractica(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta práctica?')) {
      this.practicasService.deletePractica(id).subscribe({
        next: () => {
          alert('Práctica eliminada correctamente');
          this.cargarPracticas(); // Recargar la lista
        },
        error: (error: any) => {
          console.error('Error al eliminar práctica:', error);
          alert('Error al eliminar la práctica');
        }
      });
    }
  }
}