import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SolicitudesService} from '../../services/solicitudes.service'; // importa tu servicio
import { DashboardSolicitanteDto } from '../../models/DashboardSolicitanteDto';

@Component({
  selector: 'app-solicitante',
  standalone: true,
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.css'],
  imports: [CommonModule, RouterModule]
})
export class SolicitanteComponent implements OnInit {
  username = 'Usuario'; // luego lo obtendrás del JWT
  solicitudes: DashboardSolicitanteDto[] = [];

  constructor(
    private router: Router,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit(): void {
    const idUsuario = 1; // aquí luego pones el ID real desde JWT o localStorage
    this.solicitudesService.getSolicitudesByUsuario(idUsuario).subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (err) => {
        console.error('Error cargando solicitudes:', err);
      }
    });
  }

  verDetalles(solicitud: DashboardSolicitanteDto) {
    console.log('Ver detalles de:', solicitud);
    // rediriges a otro componente si quieres
  }

  nuevaSolicitud() {
    this.router.navigate(['/dashboard/solicitante/nueva-solicitud']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}