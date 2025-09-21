import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Solicitante';

  // Hardcode temporal para mostrar diseño
  solicitud = {
    numero: '0001',
    fecha: new Date(),
    motivo: 'Turismo',
    estado: 'Pendiente',
    fechaInicio: new Date('2025-11-01'),
    fechaFin: new Date('2025-11-15'),
    nombres: 'Juan',
    apellidos: 'Pérez',
    ci: '1234567',
    nacionalidad: 'Boliviana',
    profesion: 'Ingeniero'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // En producción aquí podrías traer los datos desde el backend
    // con un servicio y el ID de la solicitud recibido por queryParams
  }

  volver() {
    this.router.navigate(['/dashboard/solicitante/mis-solicitudes']);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}

