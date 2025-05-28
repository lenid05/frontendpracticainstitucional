import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuario.service';
import { ProgramasService } from '../../../services/programa.service';
import { EstudiantesService } from '../../../services/estudiante.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

// Interfaces (ajusta según tus modelos)
interface Usuario {
  idUsuario: number;
  primerNombre: string;
  primerApellido: string;
  correo: string;
}

interface Programa {
  idPrograma: number;
  nombre: string;
}

interface Estudiante {
  idEstudiante: number;
  codigoEstudiante: string;
  idUsuario: number;
  idPrograma: number;
}

@Component({
  selector: 'app-actualizar-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './actualizarestudiante.component.html',
  styleUrls: ['./actualizarestudiante.component.scss']
})
export class ActualizarEstudianteComponent implements OnInit {
  // Inyección moderna de dependencias
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private estudiantesService = inject(EstudiantesService);
  private usuariosService = inject(UsuariosService);
  private programasService = inject(ProgramasService);
  
  estudianteForm!: FormGroup;
  usuarios: Usuario[] = [];
  programas: Programa[] = [];
  estudianteId!: number;
  
  // Signals para manejo de estado
  cargando = signal(false);
  actualizando = signal(false);
  error = signal('');
  mensaje = signal('');
  estudianteOriginal = signal<Estudiante | null>(null);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde la ruta
    this.route.params.subscribe(params => {
      this.estudianteId = +params['id'];
      if (this.estudianteId && !isNaN(this.estudianteId)) {
        this.cargarDatos();
      } else {
        this.error.set('ID de estudiante no válido');
      }
    });
  }

  private initializeForm(): void {
    this.estudianteForm = this.fb.group({
      idEstudiante: [{ value: '', disabled: true }],
      codigoEstudiante: ['', [Validators.required, Validators.minLength(1)]],
      idPrograma: [null, [Validators.required]]
    });
  }

  private cargarDatos(): void {
    this.cargando.set(true);
    this.error.set('');
    
    // Cargar datos en paralelo usando los servicios reales
    Promise.all([
      this.cargarEstudiante(),
      this.cargarProgramas()
    ]).catch(error => {
      console.error('Error al cargar datos:', error);
      this.error.set('Error al cargar los datos. Por favor, intenta nuevamente.');
    }).finally(() => {
      this.cargando.set(false);
    });
  }

  private cargarEstudiante(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.estudiantesService.getById(this.estudianteId)
      .pipe(
        catchError(error => {
          console.error('Error al cargar estudiante:', error);
          reject(error);
          return of(null);
        })
      )
      .subscribe({
        next: (estudiante: any) => {
          if (estudiante) {
            this.estudianteOriginal.set(estudiante);
            console.log('Estudiante cargado:', estudiante); // Debug
            console.log('ID Usuario del estudiante:', estudiante.idUsuario); // Debug
            
            // Usar setTimeout para asegurar que el formulario esté inicializado
            setTimeout(() => {
              this.estudianteForm.patchValue({
                idEstudiante: estudiante.idEstudiante,
                codigoEstudiante: estudiante.codigoEstudiante,
                idUsuario: estudiante.idUsuario,
                idPrograma: estudiante.idPrograma
              });
              console.log('Formulario actualizado con valores:', this.estudianteForm.value); // Debug
            }, 100);
            
            resolve();
          } else {
            reject(new Error('Estudiante no encontrado'));
          }
        },
        error: (error) => {
          console.error('Error en subscribe estudiante:', error);
          reject(error);
        }
      });
  });
}
  
  private cargarProgramas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.programasService.getAll()
        .pipe(
          catchError(error => {
            console.error('Error al cargar programas:', error);
            return of([]);
          })
        )
        .subscribe({
          next: (programas: any) => {
            this.programas = programas || [];
            resolve();
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  onSubmit(): void {
    if (this.estudianteForm.valid && !this.actualizando()) {
      this.actualizando.set(true);
      this.error.set('');
      this.mensaje.set('');

      const estudianteActualizado = {
        codigoEstudiante: this.estudianteForm.value.codigoEstudiante,
        idUsuario: this.estudianteForm.value.idUsuario,
        idPrograma: this.estudianteForm.value.idPrograma
      };

      this.estudiantesService.update(this.estudianteId, estudianteActualizado)
        .pipe(
          catchError(error => {
            console.error('Error al actualizar estudiante:', error);
            this.error.set('Error al actualizar el estudiante. Por favor, intenta nuevamente.');
            return of(null);
          }),
          finalize(() => {
            this.actualizando.set(false);
          })
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.mensaje.set('Estudiante actualizado exitosamente');
              
              // Redirigir después de 2 segundos
              setTimeout(() => {
                this.router.navigate(['/listarestudiante']);
              }, 2000);
            }
          }
        });
    } else {
      this.marcarCamposComoTocados();
      this.error.set('Por favor, corrige los errores en el formulario');
    }
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.estudianteForm.controls).forEach(key => {
      this.estudianteForm.get(key)?.markAsTouched();
    });
  }

  // Métodos auxiliares para mostrar nombres
  obtenerNombreUsuario(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    return usuario ? `${usuario.primerNombre} ${usuario.primerApellido}` : 'Usuario no encontrado';
  }

  obtenerNombrePrograma(idPrograma: number): string {
    const programa = this.programas.find(p => p.idPrograma === idPrograma);
    return programa ? programa.nombre : 'Programa no encontrado';
  }

  // Método para manejar la navegación de regreso
  volver(): void {
    this.router.navigate(['/listarestudiante']);
  }
}