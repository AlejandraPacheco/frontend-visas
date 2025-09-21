import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotivoDto } from '../models/MotivoDto';

@Injectable({
  providedIn: 'root'
})
export class MotivoService {
  private apiUrl = 'http://localhost:8081/api/motivos';

  constructor(private http: HttpClient) {}

  getMotivos(): Observable<MotivoDto[]> {
    return this.http.get<MotivoDto[]>(this.apiUrl);
  }
}

