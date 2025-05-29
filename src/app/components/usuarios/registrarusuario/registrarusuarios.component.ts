import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarusuarios',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrarusuarios.component.html',
  styleUrl: './registrarusuarios.component.scss'
})
export class RegistrarusuariosComponent implements OnInit  {
  usuarioForm: FormGroup;
  mensaje: string = '';
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private usuarioService: UsuariosService) {
    this.usuarioForm = this.fb.group({
    idDocente: ['', Validators.required],
     primerNombre: ['', Validators.required],
     segundoNombre: [''],
     primerApellido: ['', Validators.required],
     segundoApellido: [''],
     correo: ['', Validators.required],
     contraseña:['', Validators.required]
    });
  }

ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    });
        
  }
  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.http.post('http://localhost:3000/api/usuarios', this.usuarioForm.value)
        .subscribe({
          next: () => {
            this.mensaje = 'usuario registrado con éxito';
            this.usuarioForm.reset();
          },
          error: () => {
            this.mensaje = 'Error al registrar usuario';
          }
        });
    }
  }
}

