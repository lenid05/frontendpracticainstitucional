import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private API_URL = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.API_URL);
  }

  getById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.API_URL, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}




  
