import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ReporteDto } from '../../models/ReporteDto';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatCardModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Administrador';

  months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  selectedMonth: number = new Date().getFullYear() === 2025 ? new Date().getMonth() + 1 : 1;
  selectedYear = 2025;

  reporte: ReporteDto | null = null;
  loading = false;
  errorMsg: string | null = null;

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    // Iniciar con el mes seleccionado
    this.cargarReporte();
  }

  cargarReporte() {
    this.loading = true;
    this.errorMsg = null;
    this.solicitudesService.getReporte(this.selectedMonth, this.selectedYear).subscribe({
      next: (res) => {
        this.reporte = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando reporte:', err);
        this.errorMsg = 'No se pudo cargar el reporte';
        this.loading = false;
      }
    });
  }

  administradorSolicitudes() {
    // Lógica para redirigir a la página de solicitudes
    window.location.href = '/dashboard/administrador';
  }

  administradorCitasAgendadas() {
    // Lógica para redirigir a la página de citas agendadas
    window.location.href = '/dashboard/administrador/citas-agendadas';
  }

  administradorReporte() {
    // Lógica para redirigir a la página de reporte
    window.location.href = '/dashboard/administrador/reporte';
  }
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
