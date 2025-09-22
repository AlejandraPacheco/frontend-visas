import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSolicitanteDto } from '../models/DashboardSolicitanteDto';
import { SolicitudDto } from '../models/SolicitudDto';
import { DetalleSolicitudDto } from '../models/DetalleSolicitudDto';
import { ReporteDto } from '../models/ReporteDto';

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

  getTodasSolicitudes() {
    return this.http.get<DetalleSolicitudDto[]>(`${this.apiUrl}/`);
  }

  // Nueva función para el funcionario (con idMotivo y fotografiaBase64)
  getDetalleSolicitudFuncionario(idSolicitud: number): Observable<SolicitudDto> {
    return this.http.get<SolicitudDto>(`${this.apiUrl}/funcionario/${idSolicitud}`);
  }

  getDetalleSolicitudAdministrador(idSolicitud: number): Observable<SolicitudDto> {
    return this.http.get<SolicitudDto>(`${this.apiUrl}/administrador/${idSolicitud}`);
  }

  actualizarSolicitudFuncionario(idSolicitud: number, solicitud: SolicitudDto): Observable<SolicitudDto> {
    return this.http.put<SolicitudDto>(`${this.apiUrl}/funcionario/${idSolicitud}`, solicitud);
  }

  actualizarSolicitudAdministrador(idSolicitud: number, solicitud: SolicitudDto): Observable<SolicitudDto> {
    return this.http.put<SolicitudDto>(`${this.apiUrl}/administrador/${idSolicitud}`, solicitud);
  }

  getFotoSolicitud(idSolicitud: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/foto/${idSolicitud}`, { responseType: 'blob' });
  }

  getReporte(mes: number, anio: number): Observable<ReporteDto> {
    return this.http.get<ReporteDto>(`${this.apiUrl}/reporte?mes=${mes}&anio=${anio}`);
  }

}
