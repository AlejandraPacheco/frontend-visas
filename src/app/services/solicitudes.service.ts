import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSolicitanteDto } from '../models/DashboardSolicitanteDto';
import { SolicitudDto } from '../models/SolicitudDto';
import { DetalleSolicitudDto } from '../models/DetalleSolicitudDto';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private apiUrl = 'http://localhost:8081/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Trae las solicitudes de un usuario
  getSolicitudesByUsuario(idUsuario: number): Observable<DashboardSolicitanteDto[]> {
    return this.http.get<DashboardSolicitanteDto[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  crearSolicitud(solicitud: SolicitudDto): Observable<SolicitudDto> {
    return this.http.post<SolicitudDto>(`${this.apiUrl}/`, solicitud);
  }

  getDetalleSolicitud(idSolicitud: number) {
  return this.http.get<DetalleSolicitudDto>(`${this.apiUrl}/${idSolicitud}`);
}

}
