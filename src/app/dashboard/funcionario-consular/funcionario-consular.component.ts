import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';
import { DetalleSolicitudDto } from '../../models/DetalleSolicitudDto'; // usamos este DTO porque tiene nombres y apellidos

@Component({
  selector: 'app-funcionario-consular',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './funcionario-consular.component.html',
  styleUrl: './funcionario-consular.component.css'
})
export class FuncionarioConsularComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Funcionario Consular';

  solicitudes: DetalleSolicitudDto[] = [];

  constructor(
    private router: Router,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit(): void {
    // Llamamos al nuevo servicio que trae todas las solicitudes
    this.solicitudesService.getTodasSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (err) => {
        console.error('Error cargando solicitudes:', err);
      }
    });
  }

  verDetalle(idSolicitud: number) {
    this.router.navigate(['/dashboard/funcionario/detalle-solicitud'], {
      queryParams: { idSolicitud }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
    window.location.href = '/login';
  }
}
