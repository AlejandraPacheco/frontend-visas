import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';
import { DetalleSolicitudDto } from '../../models/DetalleSolicitudDto';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Solicitante';
  solicitud!: DetalleSolicitudDto;
  idSolicitud!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idSolicitud = +params['idSolicitud'];
      if (this.idSolicitud) {
        this.cargarDetalle();
      }
    });
  }

  cargarDetalle() {
    this.solicitudService.getDetalleSolicitud(this.idSolicitud).subscribe({
      next: (res) => this.solicitud = res,
      error: (err) => console.error('Error al cargar la solicitud', err)
    });
  }

  volver() {
    this.router.navigate(['/dashboard-solicitante']);
  }

  logout() {
    // Limpiar token y datos del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');

    // Redirigir a login
    window.location.href = '/login';
  }
}
