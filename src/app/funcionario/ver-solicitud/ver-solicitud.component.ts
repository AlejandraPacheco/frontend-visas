import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { SexoService } from '../../services/sexo.service';
import { EstadocivilService } from '../../services/estadocivil.service';
import { MotivoService } from '../../services/motivo.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { PaisDto } from '../../models/PaisDto';
import { SexoDto } from '../../models/SexoDto';
import { EstadoCivilDto } from '../../models/EstadoCivilDto';
import { MotivoDto } from '../../models/MotivoDto';
import { SolicitudDto } from '../../models/SolicitudDto';

@Component({
  selector: 'app-ver-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf],
  templateUrl: './ver-solicitud.component.html',
  styleUrl: './ver-solicitud.component.css'
})
export class VerSolicitudComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Funcionario';
  
  solicitud: SolicitudDto = new SolicitudDto();
  paises: PaisDto[] = [];
  sexos: SexoDto[] = [];
  estadosCiviles: EstadoCivilDto[] = [];
  motivos: MotivoDto[] = [];
  motivoSeleccionado: string = '';
  fotoSeleccionada: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
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

    this.route.queryParams.subscribe(params => {
      const idSolicitud = +params['idSolicitud'];
      if (idSolicitud) {
        this.cargarSolicitud(idSolicitud);
      }
    });
  }

  cargarPaises() {
    this.paisService.getPaises().subscribe({
      next: (data) => (this.paises = data),
      error: (err) => console.error('Error cargando países:', err)
    });
  }

  cargarSexos() {
    this.sexoService.getSexos().subscribe({
      next: (data) => (this.sexos = data),
      error: (err) => console.error('Error cargando sexos:', err)
    });
  }

  cargarEstadosCiviles() {
    this.estadoCivilService.getEstadosCiviles().subscribe({
      next: (data) => (this.estadosCiviles = data),
      error: (err) => console.error('Error cargando estados civiles:', err)
    });
  }

  cargarMotivos() {
    this.motivoService.getMotivos().subscribe({
      next: (data) => (this.motivos = data),
      error: (err) => console.error('Error cargando motivos:', err)
    });
  }

  cargarSolicitud(idSolicitud: number) {
    this.solicitudesService.getDetalleSolicitudFuncionario(idSolicitud).subscribe({
      next: (data: SolicitudDto) => {
        this.solicitud = data;

        // Convertir idMotivo a motivoSeleccionado (string)
        this.motivoSeleccionado = this.motivos.find(m => m.idMotivo === data.idMotivo)?.descripcion || '';

        // Cargar foto si existe
        if (data.fotografiaBase64) {
          this.fotoSeleccionada = data.fotografiaBase64;
        }
      },
      error: (err) => console.error('Error cargando solicitud:', err)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoSeleccionada = reader.result;
        this.solicitud.fotografiaBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  crearSolicitud() {
    // Convertir motivo seleccionado a idMotivo
    const motivo = this.motivos.find(m => m.descripcion === this.motivoSeleccionado);
    this.solicitud.idMotivo = motivo?.idMotivo;

    // Asignar id del usuario logueado
    this.solicitud.idSolicitante = parseInt(localStorage.getItem('idUsuario') || '0', 10);

    console.log('DTO enviado:', this.solicitud);

    this.solicitudesService.crearSolicitud(this.solicitud).subscribe({
      next: () => {
        alert('Solicitud guardada correctamente');
        this.router.navigate(['/dashboard/funcionario-consular']);
      },
      error: (err) => {
        console.error('Error guardando solicitud:', err);
        alert('Hubo un error al guardar la solicitud');
      }
    });
  }

  actualizarSolicitud() {
  const motivo = this.motivos.find(m => m.descripcion === this.motivoSeleccionado);
  this.solicitud.idMotivo = motivo ? motivo.idMotivo : undefined;

  // Asignar la foto seleccionada (Base64)
  if (this.fotoSeleccionada) {
    this.solicitud.fotografiaBase64 = this.fotoSeleccionada.toString();
  }

  this.solicitudesService.actualizarSolicitudFuncionario(this.solicitud.idSolicitud!, this.solicitud)
    .subscribe({
      next: res => {
        alert('Solicitud actualizada correctamente');
        this.router.navigate(['/dashboard/funcionario-consular']);
      },
      error: err => {
        console.error('Error actualizando solicitud:', err);
        alert('Hubo un error al actualizar la solicitud');
      }
    });
}


  cancelar() {
    this.router.navigate(['/dashboard/funcionario-consular']);
  }

    funcionarioSolicitudes() {
    window.location.href = '/dashboard/funcionario-consular';
  }

  funcionarioCitasAgendadas() {
    window.location.href = '/dashboard/funcionario-consular/citas-agendadas';
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}




