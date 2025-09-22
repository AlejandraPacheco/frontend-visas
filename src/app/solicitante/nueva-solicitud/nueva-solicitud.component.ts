import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import { PaisDto } from '../../models/PaisDto';
import { SexoService } from '../../services/sexo.service';
import { EstadocivilService } from '../../services/estadocivil.service';
import { SexoDto } from '../../models/SexoDto';
import { EstadoCivilDto } from '../../models/EstadoCivilDto';
import { MotivoService } from '../../services/motivo.service';
import { MotivoDto } from '../../models/MotivoDto';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolicitudDto } from '../../models/SolicitudDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf],
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Solicitante';
  solicitud: SolicitudDto = {
    apellidos: '',
    nombres: '',
    fechaNacimiento: '',
    idPaisDeNacimiento: 0,
    nacionalidad: '',
    idSexo: 0,
    idEstadoCivil: 0,
    ci: '',
    numeroPasaporte: '',
    fechaExpedicionPasaporte: '',
    fechaVencimientoPasaporte: '',
    idPaisExpedicionPasaporte: 0,
    profesion: '',
    idMotivo: 0,
    fechaLlegadaSpain: '',
    fechaSalidaSpain: ''
  };
  paises: PaisDto[] = [];
  sexos: SexoDto[] = [];
  estadosCiviles: EstadoCivilDto[] = [];
  motivos: MotivoDto[] = [];
  motivoSeleccionado: string = '';


  constructor(
    private paisService: PaisService,
    private sexoService: SexoService,
    private estadoCivilService: EstadocivilService,
    private motivoService: MotivoService,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarSexos();
    this.cargarEstadosCiviles();
    this.cargarMotivos();
  }

  cargarPaises() {
    this.paisService.getPaises().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (err) => {
        console.error('Error cargando países:', err);
      }
    });
  }

  
  cargarSexos() {
    this.sexoService.getSexos().subscribe({
      next: (data) => this.sexos = data,
      error: (err) => console.error('Error cargando sexos:', err)
    });
  }

  cargarEstadosCiviles() {
    this.estadoCivilService.getEstadosCiviles().subscribe({
      next: (data) => this.estadosCiviles = data,
      error: (err) => console.error('Error cargando estados civiles:', err)
    });
  }

  cargarMotivos() {
  this.motivoService.getMotivos().subscribe({
    next: (data) => this.motivos = data,
    error: (err) => console.error('Error cargando motivos:', err)
  });
}

  crearSolicitud() {
    // Asignar los IDs de las relaciones a las propiedades del DTO
    this.solicitud.idPaisDeNacimiento = this.solicitud.idPaisDeNacimiento;
    this.solicitud.idPaisExpedicionPasaporte = this.solicitud.idPaisExpedicionPasaporte;
    this.solicitud.idSexo = this.solicitud.idSexo;
    this.solicitud.idEstadoCivil = this.solicitud.idEstadoCivil;

    this.solicitud.fechaLlegadaSpain = this.solicitud.fechaLlegadaSpain; // ejemplo: hoy
    this.solicitud.fechaSalidaSpain = this.solicitud.fechaSalidaSpain; // ejemplo: hoy


    // Convertir motivo (string) a idMotivo
    const motivo = this.motivos.find(m => m.descripcion === this.motivoSeleccionado);
    this.solicitud.idMotivo = motivo ? motivo.idMotivo : undefined;


    // Asignar id del usuario logueado
    this.solicitud.idSolicitante = parseInt(localStorage.getItem('idUsuario') || '0', 10);

    console.log('DTO enviado:', this.solicitud);

    // Llamada al backend
    this.solicitudesService.crearSolicitud(this.solicitud).subscribe({
      next: (res) => {
        console.log('Solicitud guardada:', res);
        alert('Solicitud guardada correctamente');

        // Redirige a Citas y pasa el idSolicitud como parámetro
        this.router.navigate(['/dashboard/solicitante/citas'], {
          queryParams: { idSolicitud: res.idSolicitud }
        });
      },
      error: (err) => {
        console.error('Error guardando solicitud:', err);
        alert('Hubo un error al guardar la solicitud');
      }
    });
  }



  cancelar() {
    console.log('Cancelado');
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

