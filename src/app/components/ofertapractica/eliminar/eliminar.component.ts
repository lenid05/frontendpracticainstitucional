import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OfertaspracticasService } from '../../../services/ofertapractica.service';
import { OfertaPractica } from '../../../interfaces/ofertaspracticas.interface';

@Component({
  selector: 'app-eliminar-oferta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  providers: [OfertaspracticasService],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss'
})
export class EliminarOfertaComponent implements OnInit {
  ofertaId: number = 0;
  oferta: OfertaPractica | null = null;
  
  isLoadingOferta = false;
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';
  errorCarga = '';
  confirmacionEliminacion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertaspracticasService
  ) {}

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
        this.oferta = oferta;
        this.isLoadingOferta = false;
      },
      error: (error: any) => {
        console.error('Error al cargar oferta:', error);
        this.errorCarga = 'Error al cargar los datos de la oferta.';
        this.isLoadingOferta = false;
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

  eliminarOferta(): void {
    if (!this.confirmacionEliminacion) {
      alert('Debe confirmar que desea eliminar la oferta');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.ofertasService.deleteOfertaPractica(this.ofertaId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.showSuccessMessage = true;
        this.confirmacionEliminacion = false;
        
        setTimeout(() => {
          this.router.navigate(['/ofertas/listar']);
        }, 3000);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Error al eliminar la oferta.';
        console.error('Error:', error);
      }
    });
  }
}