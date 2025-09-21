import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SolicitudesService} from '../../services/solicitudes.service'; // importa tu servicio
import { DashboardSolicitanteDto } from '../../models/DashboardSolicitanteDto';

@Component({
  selector: 'app-funcionario-consular',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './funcionario-consular.component.html',
  styleUrl: './funcionario-consular.component.css'
})
export class FuncionarioConsularComponent {
  username: string = localStorage.getItem('username') || 'Solicitante';

  //username = 'Usuario'; // luego lo obtendrás del JWT
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

  verDetalle(idSolicitud: number) {
  this.router.navigate(['/dashboard/solicitante/detalle-solicitud'], {
    queryParams: { idSolicitud }
  });
}


  nuevaSolicitud() {
    this.router.navigate(['/dashboard/solicitante/nueva-solicitud']);
  }

  logout() {
        // Limpiar token y datos del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');

    // Redirigir a login
    window.location.href = '/login';
  }
}
