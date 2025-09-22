import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';
import { DetalleSolicitudDto } from '../../models/DetalleSolicitudDto'; // usamos este DTO porque tiene nombres y apellidos
import { FiltroPorCIPipe } from '../filtro-por-ci.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-funcionario-consular',
  standalone: true,
  imports: [CommonModule, RouterModule, FiltroPorCIPipe, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './funcionario-consular.component.html',
  styleUrl: './funcionario-consular.component.css'
})
export class FuncionarioConsularComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Funcionario Consular';

  solicitudes: DetalleSolicitudDto[] = [];
  filtroCI: string = '';

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
    this.router.navigate(['/dashboard/funcionario-consular/ver-solicitud'], {
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
