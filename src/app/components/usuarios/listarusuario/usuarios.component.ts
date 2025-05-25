import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html', 
  styleUrls: ['./usuarios.component.scss'],
  imports: [CommonModule]
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    });
    
  }
}
