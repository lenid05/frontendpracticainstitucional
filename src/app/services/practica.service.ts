// src/app/services/practicas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Practica, PracticaConInfo, CreatePracticaRequest } from '../interfaces/practicas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PracticasService {
  private apiUrl = 'http://localhost:3000/api/practicas';

  constructor(private http: HttpClient) { }

  getAllPracticas(): Observable<Practica[]> {
    return this.http.get<Practica[]>(this.apiUrl);
  }

  getPracticasConInfo(): Observable<PracticaConInfo[]> {
    return this.http.get<PracticaConInfo[]>(`${this.apiUrl}`);
  }

  getPracticaById(id: number): Observable<Practica> {
    return this.http.get<Practica>(`${this.apiUrl}/${id}`);
  }

  getPracticasByEstudiante(idEstudiante: number): Observable<Practica[]> {
    return this.http.get<Practica[]>(`${this.apiUrl}/estudiante/${idEstudiante}`);
  }

  getPracticasByDocente(idDocente: number): Observable<Practica[]> {
    return this.http.get<Practica[]>(`${this.apiUrl}/docente/${idDocente}`);
  }

  getPracticasByEstado(estado: string): Observable<Practica[]> {
    return this.http.get<Practica[]>(`${this.apiUrl}/estado/${estado}`);
  }

  createPractica(practica: CreatePracticaRequest): Observable<Practica> {
    return this.http.post<Practica>(this.apiUrl, practica);
  }

  updatePractica(practica: Practica): Observable<Practica> {
    return this.http.put<Practica>(this.apiUrl, practica);
  }

  deletePractica(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}