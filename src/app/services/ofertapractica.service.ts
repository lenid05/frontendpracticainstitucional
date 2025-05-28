// src/app/services/ofertaspracticas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfertaPractica, CreateOfertaPracticaRequest } from '../interfaces/ofertaspracticas.interface';

@Injectable({
  providedIn: 'root'
})
export class OfertaspracticasService {
  private apiUrl = 'http://localhost:3000/api/ofertas-practicas';

  constructor(private http: HttpClient) { }

  getAllOfertasPracticas(): Observable<OfertaPractica[]> {
    return this.http.get<OfertaPractica[]>(this.apiUrl);
  }

  getOfertasPracticasRecientes(limit?: number): Observable<OfertaPractica[]> {
    const url = limit ? `${this.apiUrl}/recientes?limit=${limit}` : `${this.apiUrl}/recientes`;
    return this.http.get<OfertaPractica[]>(url);
  }

  getOfertaPracticaById(id: number): Observable<OfertaPractica> {
    return this.http.get<OfertaPractica>(`${this.apiUrl}/${id}`);
  }

  createOfertaPractica(oferta: CreateOfertaPracticaRequest): Observable<OfertaPractica> {
    return this.http.post<OfertaPractica>(this.apiUrl, oferta);
  }

  updateOfertaPractica(oferta: OfertaPractica): Observable<OfertaPractica> {
    return this.http.put<OfertaPractica>(this.apiUrl, oferta);
  }

  deleteOfertaPractica(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}