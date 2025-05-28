// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Sistema de Prácticas</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Prácticas
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" routerLink="/practicas/listar">Listar</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Ofertas
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" routerLink="/ofertaspracticas/listar">Listar</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <main class="container-fluid">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar-brand {
      font-weight: 600;
    }
    
    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
    
    main {
      min-height: calc(100vh - 56px);
      background-color: #f8f9fa;
    }
  `]
})
export class AppComponent {
  title = 'sistema-practicas';
}