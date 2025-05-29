// src/app/app.routes.ts
import { Routes } from '@angular/router';
import {UsuariosComponent } from './components/usuarios/listarusuario/usuarios.component';
import { EstudianteRegistroComponent } from './components/estudiante/registrar/registrarestudiante.component';
import { ListarestudianteComponent } from './components/estudiante/listar/listarestudiante.component';
import { ActualizarEstudianteComponent } from './components/estudiante/actualizar/actualizarestudiante.component';
import { EliminarComponent } from './components/estudiante/eliminar/eliminar.component';
import { RegistrarDocente } from './components/docente/registrar/registrar.component';
import { actualizarDocente } from './components/docente/actualizar/actualizar.component';
import { ListarDocenteComponent } from './components/docente/listar/listar.component';
import { RegistrarusuariosComponent } from './components/usuarios/registrarusuario/registrarusuarios.component';
import { ActualizarusuariosComponent} from './components/usuarios/actualizarusuario/actualizarusuarios.component';
export const routes: Routes = [
  // Rutas para Prácticas
  {
    path: 'practicas/registrar',
    loadComponent: () => import('./components/practica/registrar/registrar.component').then(m => m.RegistrarComponent)
  },
  {
    path: 'practicas/listar',
    loadComponent: () => import('./components/practica/listar/listar.component').then(m => m.ListarComponent)
  },
 {
    path: 'practicas/actualizar/:id',
    loadComponent: () => import('./components/practica/actualizar/actualizar.component').then(m => m.ActualizarComponent)
  },
  {
    path: 'practicas/eliminar/:id',
    loadComponent: () => import('./components/practica/eliminar/eliminar.component').then(m => m.EliminarComponent)
  },
  
  {
    path: 'ofertaspracticas/registrar',
    loadComponent: () => import('./components/ofertapractica/registrar/registrar.component').then(m => m.RegistrarOfertaComponent)
  },
  
  {
    path: 'ofertaspracticas/listar',
    loadComponent: () => import('./components/ofertapractica/listar/listar.component').then(m => m.ListarOfertasComponent)
  },
  
  {
    path: 'ofertas/actualizar/:id',
    loadComponent: () => import('./components/ofertapractica/actualizar/actualizar.component').then(m => m.ActualizarOfertaComponent)
  },
  {
    path: 'ofertas/eliminar/:id',
    loadComponent: () => import('./components/ofertapractica/eliminar/eliminar.component').then(m => m.EliminarOfertaComponent)
  },
  
  // Ruta por defecto
 // { path: '', redirectTo: '/practicas/listar', pathMatch: 'full' },
 // { path: '**', redirectTo: '/practicas/listar' },
  
  { path: 'estudiante', component: EstudianteRegistroComponent },
  { path: 'listarestudiante', component: ListarestudianteComponent },
  { path: 'actualizar-estudiante/:id', component: ActualizarEstudianteComponent },
  { path: 'eliminar-estudiante/:id', component: EliminarComponent},
  {path: 'docente/registrar', component: RegistrarDocente},
  {path: 'docente/actualizar/:id', component: actualizarDocente},
  {path: 'docente/listar', component: ListarDocenteComponent},
  {path: 'usuario/registrar', component: RegistrarusuariosComponent},
  {path: 'usuario/actualizar/:id', component: ActualizarusuariosComponent},
  { path: 'usuario/listar', component: UsuariosComponent },
  //{path: 'usuario/eliminar', component: EliminarUsuariosComponent},
 
];
