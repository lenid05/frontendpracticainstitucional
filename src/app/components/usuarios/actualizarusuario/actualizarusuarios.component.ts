import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuario.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-actualizarusuarios',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizarusuarios.component.html',
  styleUrl: './actualizarusuarios.component.scss'
})
export class ActualizarusuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  UsuarioId: number = 0;
  UsuarioOriginal: any | null = null;
  mensaje: string = '';
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private usuarioService: UsuariosService, private route: ActivatedRoute,
    private router: Router) {
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      correo: [''],
      contraseña: ['']
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.UsuarioId = +params['id'];
      if (this.UsuarioId) {
        this.usuarioService.getById(this.UsuarioId).subscribe((data: any) => {
          this.UsuarioOriginal = { ...data };
          console.log(data);
          this.usuarioForm.patchValue({
              ...data

          })
          this.usuarioForm.markAsPristine();
        });
      } else {
        //this.errorCarga = 'ID de práctica inválido';
      }
    })
  }
    onSubmit(): void {
      if(this.usuarioForm.valid) {
      this.http.put(`http://localhost:3000/api/usuarios/${this.UsuarioId}`, this.usuarioForm.value)
        .subscribe({
          next: () => {
            this.mensaje = 'usuario actualizado con éxito';
            this.usuarioForm.reset();
          },
          error: () => {
            this.mensaje = 'Error al actualizar usuario';
          }
        });
    }
  }
}



