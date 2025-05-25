import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
 private API_URL = 'http://localhost:3000/api/programas';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.API_URL);
  }
 
}
