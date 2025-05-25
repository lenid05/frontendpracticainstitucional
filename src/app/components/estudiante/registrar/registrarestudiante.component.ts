import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuario.service';
import { ProgramasService } from '../../../services/programa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './registrarestudiante.component.html',
  styleUrls: ['./registrarestudiante.component.scss']
})
export class EstudianteRegistroComponent implements OnInit  {
  estudianteForm: FormGroup;
  mensaje: string = '';
  usuarios: any[] = [];
  programas: any[] = [];
 

  constructor(private fb: FormBuilder, private http: HttpClient, private usuarioService: UsuariosService, private programaService: ProgramasService) {
    this.estudianteForm = this.fb.group({
      idEstudiante: ['', Validators.required],
      codigoEstudiante: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idPrograma: ['', Validators.required],
      
    });
  }

ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    });
     this.programaService.getAll().subscribe((data: any) => {
      this.programas = data;
      console.log(data);
    });
    
  }
  onSubmit(): void {
    if (this.estudianteForm.valid) {
      this.http.post('http://localhost:3000/api/estudiantes', this.estudianteForm.value)
        .subscribe({
          next: () => {
            this.mensaje = 'Estudiante registrado con éxito';
            this.estudianteForm.reset();
          },
          error: () => {
            this.mensaje = 'Error al registrar estudiante';
          }
        });
    }
  }
}







