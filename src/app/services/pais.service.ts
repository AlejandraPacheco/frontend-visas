import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaisDto } from '../models/PaisDto';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'http://localhost:8081/api/paises';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<PaisDto[]> {
    return this.http.get<PaisDto[]>(this.apiUrl);
  }
}
