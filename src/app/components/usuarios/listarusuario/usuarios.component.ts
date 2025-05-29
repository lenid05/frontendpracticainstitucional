import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Usuarios } from '../../../interfaces/usuarios.interface'; 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[] = []; 
  isLoading = false;
  errorMessage = '';

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios(); 
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.usuarioService.getAll().subscribe({
      next: (usuarios: Usuarios[]) => {
        this.usuarios = usuarios;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'Error al cargar datos del usuario. Verifique que el servidor esté funcionando.';
        this.isLoading = false;
      }
    });
  }

  actualizarUsuario(usuario: Usuarios): void {
    this.router.navigate(['usuario/actualizar', usuario.idUsuario]);
  }

  eliminarUsuario(id: number): void { 
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.cargarUsuarios(); 
        },
        error: (error: any) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario');
        }
      });
    }
  }
}
