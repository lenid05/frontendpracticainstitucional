import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})

export class RegistrarDocente implements OnInit  {
  docenteForm: FormGroup;
  mensaje: string = '';
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private usuarioService: UsuariosService) {
    this.docenteForm = this.fb.group({
      idDocente: ['', Validators.required],
      tipoContratacion: ['', Validators.required],
      salario: ['', Validators.required],
      idUsuario: ['', Validators.required],
      
    });
  }

ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    });
        
  }
  onSubmit(): void {
    if (this.docenteForm.valid) {
      this.http.post('http://localhost:3000/api/docentes', this.docenteForm.value)
        .subscribe({
          next: () => {
            this.mensaje = 'Docente registrado con éxito';
            this.docenteForm.reset();
          },
          error: () => {
            this.mensaje = 'Error al registrar docente';
          }
        });
    }
  }
}








