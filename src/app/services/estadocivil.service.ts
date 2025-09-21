import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoCivilDto } from '../models/EstadoCivilDto';

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {
  private apiUrl = 'http://localhost:8081/api/estados-civiles';

  constructor(private http: HttpClient) {}

  getEstadosCiviles(): Observable<EstadoCivilDto[]> {
    return this.http.get<EstadoCivilDto[]>(this.apiUrl);
  }
}
