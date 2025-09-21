import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { addMinutes, addDays, startOfWeek } from 'date-fns';

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

  // Fecha base para calcular la semana
  viewDate: Date = new Date();

  // Días dinámicos de la semana
  semana: { nombre: string, fecha: Date }[] = [];

  // Horas dinámicas
  horas: string[] = [];

  // Slot seleccionado
  slotSeleccionado: { dia: Date, hora: string } | null = null;

  constructor() {
    this.generarSemana();
    this.generarHoras();
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
    if (dia.nombre.toLowerCase() === 'lunes' && hora.startsWith('08:30')) {
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
    if (this.slotSeleccionado) {
      alert(
        `Cita confirmada el ${this.slotSeleccionado.dia.toLocaleDateString()} a las ${this.slotSeleccionado.hora}`
      );
    }
  }

  // Cambiar semana desde datepicker
  onDateChange(event: any) {
    this.viewDate = event.value;
    this.generarSemana();
  }

  logout() {
    console.log("Cerrar sesión");
  }
}
