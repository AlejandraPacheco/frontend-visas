import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaDto } from '../models/CitaDto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8081/api/citas';

  constructor(private http: HttpClient) {}

  crearCita(cita: CitaDto): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }

  listarCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  listarCitasSemana(fecha: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/semana?fecha=${fecha}`);
}

}
