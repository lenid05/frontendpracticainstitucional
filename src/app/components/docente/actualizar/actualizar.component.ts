import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DocenteService } from '../../../services/docente.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class actualizarDocente implements OnInit  {
  docenteForm: FormGroup;
  DocenteId: number = 0;
  mensaje: string = '';
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private docenteService: DocenteService, private route: ActivatedRoute,
    private router: Router) {
    this.docenteForm = this.fb.group({
      idDocente: ['', Validators.required],
      tipoContratacion: ['', Validators.required],
      salario: ['', Validators.required],
      idUsuario: ['', Validators.required],
      
    });
  }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.DocenteId = +params['id'];
    if (this.DocenteId) {
      this.docenteService.getById(this.DocenteId).subscribe((data: any) => {
       this.docenteForm.patchValue({
            ...data

        })
        this.docenteForm.markAsPristine();
      });
    } else {
      //this.errorCarga = 'ID de práctica inválido';
    }
        
  })
}
  onSubmit(): void {
    if (this.docenteForm.valid) {
      this.http.put(`http://localhost:3000/api/docentes/${this.docenteForm.value.id}`, this.docenteForm.value)
        .subscribe({
          next: () => {
            this.mensaje = 'Docente actualizado con éxito';
            this.docenteForm.reset();
          },
          error: () => {
            this.mensaje = 'Error al actualizar docente';
          }
        });
    }
  }
}








