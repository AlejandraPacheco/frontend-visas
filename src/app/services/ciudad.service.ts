import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CiudadDto } from '../models/CiudadDto';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private apiUrl = 'http://localhost:8081/api/ciudades'; // ajusta si tu backend corre en otro puerto o ruta

  constructor(private http: HttpClient) {}

  getCiudades(): Observable<CiudadDto[]> {
    return this.http.get<CiudadDto[]>(this.apiUrl);
  }
}
