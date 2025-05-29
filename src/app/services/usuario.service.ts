// src/app/services/usuarios.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios} from '../interfaces/usuarios.interface'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private API_URL = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.API_URL);
  }

  getById(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.API_URL}/${id}`);
  }

  create(data: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.API_URL, data);
  }

  update(id: number, data: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
