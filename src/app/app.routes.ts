// src/app/app.routes.ts
import { Routes } from '@angular/router';

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
  { path: '', redirectTo: '/practicas/listar', pathMatch: 'full' },
  { path: '**', redirectTo: '/practicas/listar' }
];
