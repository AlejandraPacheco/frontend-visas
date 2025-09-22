import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip'; // 🔹 Importar tooltip
import { addMinutes, addDays, startOfWeek } from 'date-fns';
import { CitaDto } from '../../models/CitaDto';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-citas-agendadas-administrador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  templateUrl: './citas-agendadas-administrador.component.html',
  styleUrl: './citas-agendadas-administrador.component.css'
})
export class CitasAgendadasAdministradorComponent {
  username: string = localStorage.getItem('username') || 'Funcionario Consular';

  viewDate: Date = new Date();
  semana: { nombre: string; fecha: Date }[] = [];
  horas: string[] = [];
  citasSemana: CitaDto[] = [];

  constructor(private citaService: CitaService) {
    this.generarSemana();
    this.generarHoras();
  }

  ngOnInit(): void {}

  generarSemana() {
    const monday = startOfWeek(this.viewDate, { weekStartsOn: 1 });
    this.semana = Array.from({ length: 5 }, (_, i) => {
      const fecha = addDays(monday, i);
      return {
        nombre: fecha.toLocaleDateString('es-ES', { weekday: 'long' }),
        fecha
      };
    });

    // cargar citas de esa semana
    this.citaService
      .listarCitasSemana(monday.toISOString().split('T')[0])
      .subscribe({
        next: (data) => (this.citasSemana = data),
        error: (err) => console.error('Error al obtener citas', err)
      });
  }

  generarHoras() {
    const start = new Date();
    start.setHours(8, 30, 0, 0);
    const end = new Date();
    end.setHours(12, 30, 0, 0);

    this.horas = [];
    let current = new Date(start);
    while (current < end) {
      const next = addMinutes(current, 20);
      this.horas.push(
        `${current.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        })} - ${next.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        })}`
      );
      current = next;
    }
  }

  getEstadoSlot(dia: any, hora: string): string {
    const fechaStr = dia.fecha.toISOString().split('T')[0];
    const horaStr = hora.split(' - ')[0];

    const citaOcupada = this.citasSemana.find(
      (c) =>
        c.fechaCita.startsWith(fechaStr) && c.horaCita.startsWith(horaStr)
    );

    return citaOcupada ? 'Ocupado' : 'Disponible';
  }

  getTooltip(dia: any, hora: string): string {
    const fechaStr = dia.fecha.toISOString().split('T')[0];
    const horaStr = hora.split(' - ')[0];

    const cita = this.citasSemana.find(
      (c) =>
        c.fechaCita.startsWith(fechaStr) && c.horaCita.startsWith(horaStr)
    );

    if (cita) {
      return `Solicitud #${cita.idSolicitud}\n${cita.nombreCompleto}`;
    }
    return '';
  }

  onDateChange(event: any) {
    this.viewDate = event.value;
    this.generarSemana();
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

