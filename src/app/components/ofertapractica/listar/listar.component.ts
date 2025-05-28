import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OfertaspracticasService } from '../../../services/ofertapractica.service';
import { OfertaPractica } from '../../../interfaces/ofertaspracticas.interface';

@Component({
  selector: 'app-listar-ofertas',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [OfertaspracticasService],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarOfertasComponent implements OnInit {
  ofertas: OfertaPractica[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private ofertasService: OfertaspracticasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.ofertasService.getAllOfertasPracticas().subscribe({
      next: (ofertas: OfertaPractica[]) => {
        this.ofertas = ofertas;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar ofertas:', error);
        this.errorMessage = 'Error al cargar las ofertas. Verifique que el servidor esté funcionando.';
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

  editarOferta(oferta: OfertaPractica): void {
    this.router.navigate(['/ofertas/actualizar', oferta.idOfertaPractica]);
  }

  eliminarOferta(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      this.ofertasService.deleteOfertaPractica(id).subscribe({
        next: () => {
          alert('Oferta eliminada correctamente');
          this.cargarOfertas();
        },
        error: (error: any) => {
          console.error('Error al eliminar oferta:', error);
          alert('Error al eliminar la oferta');
        }
      });
    }
  }
}