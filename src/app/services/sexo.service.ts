import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SexoDto } from '../models/SexoDto';

@Injectable({
  providedIn: 'root'
})
export class SexoService {
  private apiUrl = 'http://localhost:8081/api/sexos';

  constructor(private http: HttpClient) {}

  getSexos(): Observable<SexoDto[]> {
    return this.http.get<SexoDto[]>(this.apiUrl);
  }
}

