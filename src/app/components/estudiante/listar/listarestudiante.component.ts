import { Component, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../../../services/usuario.service';
import { ProgramasService } from '../../../services/programa.service';
import { EstudiantesService } from '../../../services/estudiante.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarestudiante',
  templateUrl: './listarestudiante.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./listarestudiante.component.scss']
})
export class ListarestudianteComponent implements OnInit {
  estudiantes: any[] = [];
  usuarios: any[] = [];
  programas: any[] = [];
  cargando = signal(true);
  error = signal('');
  terminoBusqueda = signal('');

  estudiantesFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) {
      return this.estudiantes;
    }
    
    return this.estudiantes.filter((estudiante: any) => {
      const nombre = this.obtenerNombreUsuario(estudiante.idUsuario).toLowerCase();
      const codigo = estudiante.codigoEstudiante.toLowerCase();
      const programa = this.obtenerNombrePrograma(estudiante.idPrograma).toLowerCase();
      const correo = this.obtenerCorreo(estudiante.idUsuario).toLowerCase();
      
      return nombre.includes(termino) ||
             codigo.includes(termino) ||
             programa.includes(termino) ||
             correo.includes(termino);
    });
  });

  constructor(
    private usuarioService: UsuariosService,
    private programaService: ProgramasService,
    private estudianteService: EstudiantesService,
  ) {}

  ngOnInit(): void {
    this.cargarTodosLosDatos();
  }

  /**
   * Carga todos los datos necesarios de forma secuencial
   * Primero carga usuarios y programas, luego estudiantes
   */
  cargarTodosLosDatos(): void {
    this.cargando.set(true);
    this.error.set('');

    // Método alternativo: cargar secuencialmente como en tu código original
    this.cargarUsuariosYProgramas();
  }

  /**
   * Carga usuarios y programas por separado
   */
  private cargarUsuariosYProgramas(): void {
    // Cargar usuarios
    this.usuarioService.getAll().subscribe({
      next: (usuarios: any) => {
        this.usuarios = usuarios || [];
        
        // Cargar programas después de usuarios
        this.programaService.getAll().subscribe({
          next: (programas: any) => {
            this.programas = programas || [];
            
            // Cargar estudiantes al final
            this.cargarEstudiantes();
          },
          error: (error) => {
            console.error('Error al cargar programas:', error);
            this.error.set('Error al cargar los programas. Por favor, intenta nuevamente.');
            this.cargando.set(false);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.error.set('Error al cargar los usuarios. Por favor, intenta nuevamente.');
        this.cargando.set(false);
      }
    });
  }

  /**
   * Carga los datos de estudiantes
   */
  cargarEstudiantes(): void {
    this.estudianteService.getAll().subscribe({
      next: (data: any) => {
        this.estudiantes = data || [];
        this.cargando.set(false);
        console.log('Estudiantes cargados:', this.estudiantes);
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.error.set('Error al cargar los estudiantes. Por favor, intenta nuevamente.');
        this.cargando.set(false);
      }
    });
  }

  /**
   * Recarga todos los datos
   */
  recargarDatos(): void {
    this.cargarTodosLosDatos();
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  obtenerNombreUsuario(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    if (!usuario) return '---';
    
    // Construir nombre completo
    const nombres = [
      usuario.primerNombre,
      usuario.segundoNombre,
      usuario.primerApellido,
      usuario.segundoApellido
    ].filter(Boolean); // Filtrar valores vacíos o null
    
    return nombres.length > 0 ? nombres.join(' ') : '---';
  }

  /**
   * Obtiene el correo del usuario
   */
  obtenerCorreo(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    return usuario?.correo || '---';
  }

  /**
   * Obtiene el nombre del programa
   */
  obtenerNombrePrograma(idPrograma: number): string {
    const programa = this.programas.find(p => p.idPrograma === idPrograma);
    return programa?.nombre || '---';
  }

  /**
   * Obtiene las iniciales del usuario para el avatar
   */
  obtenerIniciales(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    if (!usuario) return '?';
    
    const primerNombre = usuario.primerNombre || '';
    const primerApellido = usuario.primerApellido || '';
    
    const iniciales = (primerNombre.charAt(0) + primerApellido.charAt(0)).toUpperCase();
    return iniciales || '?';
  }

  /**
   * Maneja el cambio en el campo de búsqueda
   */
  onBusquedaChange(valor: string): void {
    this.terminoBusqueda.set(valor);
  }

  /**
   * Método para búsqueda (opcional, ya que es automática)
   */
  buscarEstudiante(): void {
    // La búsqueda es automática con computed signals
    // Este método puede usarse para analytics o logging
    console.log('Búsqueda realizada:', this.terminoBusqueda());
  }

  /**
   * Limpia el término de búsqueda
   */
  limpiarBusqueda(): void {
    this.terminoBusqueda.set('');
  }

  /**
   * Navega para agregar un nuevo estudiante
   */
  agregarNuevoEstudiante(): void {
    // Implementar navegación o modal para agregar estudiante
    console.log('Agregar nuevo estudiante');
    // Ejemplo: this.router.navigate(['/estudiantes/nuevo']);
  }

  /**
   * Edita un estudiante existente
   */
  editarEstudiante(estudiante: any): void {
    console.log('Editar estudiante:', estudiante);
    // Implementar navegación o modal para editar
    // Ejemplo: this.router.navigate(['/estudiantes/editar', estudiante.idEstudiante]);
  }

  /**
   * Elimina un estudiante
   */
  eliminarEstudiante(estudiante: any): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al estudiante ${this.obtenerNombreUsuario(estudiante.idUsuario)}?`)) {
      this.estudianteService.delete(estudiante.idEstudiante).subscribe({
        next: () => {
          console.log('Estudiante eliminado exitosamente');
          this.cargarEstudiantes(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar estudiante:', error);
          alert('Error al eliminar el estudiante. Por favor, intenta nuevamente.');
        }
      });
    }
  }

  /**
   * Verifica si hay datos cargados
   */
  get hayDatos(): boolean {
    return this.usuarios.length > 0 && this.programas.length > 0;
  }

  /**
   * Obtiene el total de estudiantes
   */
  get totalEstudiantes(): number {
    return this.estudiantes.length;
  }

  /**
   * Obtiene el total de estudiantes filtrados
   */
  get totalFiltrados(): number {
    return this.estudiantesFiltrados().length;
  }
}