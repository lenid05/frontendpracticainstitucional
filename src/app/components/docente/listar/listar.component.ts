import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DocenteService } from '../../../services/docente.service';
import { docente } from '../../../interfaces/docentes.interface'; 

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'] // ✅ Usar "styleUrls" con "s"
})
export class ListarDocenteComponent implements OnInit {
  docentes: docente[] = []; // ✅ Interfaz con mayúscula
  isLoading = false;
  errorMessage = '';

  constructor(
    private docenteService: DocenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDocente();
  }

  cargarDocente(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.docenteService.getAll().subscribe({
      next: (docentes: docente[]) => {
        this.docentes = docentes;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar docentes:', error);
        this.errorMessage = 'Error al cargar datos del docente. Verifique que el servidor esté funcionando.';
        this.isLoading = false;
      }
    });
  }

 actualizarDocente(docente: docente): void {
    this.router.navigate(['/docente/actualizar', docente.idDocente]);
  }

  eliminarDocente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      this.docenteService.delete(id).subscribe({
        next: () => {
          alert('Docente eliminado correctamente');
          this.cargarDocente();
        },
        error: (error: any) => {
          console.error('Error al eliminar docente:', error);
          alert('Error al eliminar docente');
        }
      });
    }
  }
}
