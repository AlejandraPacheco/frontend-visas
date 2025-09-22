import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitanteDto } from '../models/SolicitanteDto';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {
  private apiUrl = 'http://localhost:8081/api/solicitantes';

  constructor(private http: HttpClient) {}

  verificarCi(ci: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/ci/${ci}`);
  }

  registrarSolicitante(solicitante: SolicitanteDto): Observable<any> {
    return this.http.post(this.apiUrl, solicitante);
  }
}
