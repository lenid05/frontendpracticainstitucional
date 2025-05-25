import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/listarusuario/usuarios.component';
import { EstudianteRegistroComponent } from './components/estudiante/registrar/registrarestudiante.component';
import { ListarestudianteComponent } from './components/estudiante/listar/listarestudiante.component';


export const routes: Routes = [
  { path: 'usuario', component: UsuariosComponent },
  { path: 'estudiante', component: EstudianteRegistroComponent },
  { path: 'listarestudiante', component: ListarestudianteComponent }

];
