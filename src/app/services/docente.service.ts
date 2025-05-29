import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { docente } from '../interfaces/docentes.interface'

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private API_URL = 'http://localhost:3000/api/docentes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<docente[]> {
    return this.http.get<docente[]>(this.API_URL);
  }

  getById(id: number): Observable<docente> {
    return this.http.get<docente>(`${this.API_URL}/${id}`);
  }

  create(data: docente): Observable<docente> {
    return this.http.post<docente>(this.API_URL, data);
  }

  update(id: number, data: docente): Observable<docente> {
    return this.http.put<docente>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}