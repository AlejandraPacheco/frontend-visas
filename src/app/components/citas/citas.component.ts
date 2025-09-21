import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { addMinutes, addDays, startOfWeek } from 'date-fns';
import { CitaDto } from '../../models/CitaDto';
import { CitaService } from '../../services/cita.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class CitasComponent {
  username: string = localStorage.getItem('username') || 'Solicitante';

  idSolicitud!: number;

  // Fecha base para calcular la semana
  viewDate: Date = new Date();

  // Días dinámicos de la semana
  semana: { nombre: string, fecha: Date }[] = [];

  // Horas dinámicas
  horas: string[] = [];

  // Slot seleccionado
  slotSeleccionado: { dia: Date, hora: string } | null = null;

  citasSemana: CitaDto[] = [];

  constructor(private citaService: CitaService, private route: ActivatedRoute) {
    this.generarSemana();
    this.generarHoras();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idSolicitud = +params['idSolicitud']; // convertir a número
      console.log('ID Solicitud recibido:', this.idSolicitud);
    });
  }

  // Genera lunes → viernes según la viewDate
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

  // Genera los horarios de 8:30 a 12:30 cada 20 min
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
        `${current.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - ${next.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
      );
      current = next;
    }
  }

  // Simulación de estados
  getEstadoSlot(dia: any, hora: string): string {
    const fechaStr = dia.fecha.toISOString().split('T')[0];
    const horaStr = hora.split(' - ')[0];

    // Buscar si existe una cita en ese día y hora
    const citaOcupada = this.citasSemana.find(
      (c) =>
        c.fechaCita.startsWith(fechaStr) &&
        c.horaCita.startsWith(horaStr)
    );

    if (citaOcupada) {
      return 'Ocupado';
    }

    if (
      this.slotSeleccionado?.dia.getTime() === dia.fecha.getTime() &&
      this.slotSeleccionado?.hora === hora
    ) {
      return 'Seleccionado';
    }

    return 'Disponible';
  }

  seleccionarSlot(dia: any, hora: string) {
    if (this.getEstadoSlot(dia, hora) !== 'Ocupado') {
      this.slotSeleccionado = { dia: dia.fecha, hora };
    }
  }

  confirmarCita() {
    if (this.slotSeleccionado && this.idSolicitud) {
      const dto: CitaDto = {
        idSolicitud: this.idSolicitud,
        fechaCita: this.slotSeleccionado.dia.toISOString().split('T')[0],
        horaCita: this.slotSeleccionado.hora.split(' - ')[0] // toma hora de inicio
      };

      this.citaService.crearCita(dto).subscribe({
        next: (res) => {
          alert(`✅ Cita confirmada: ${dto.fechaCita} a las ${dto.horaCita}`);
          // Redirigir al dashboard del solicitante
          window.location.href = '/dashboard-solicitante';
        },
        error: (err) => {
          alert('❌ Error al guardar la cita');
          console.error(err);
        }
      });
    }
  }

  // Cambiar semana desde datepicker
  onDateChange(event: any) {
    this.viewDate = event.value;
    this.generarSemana();
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
