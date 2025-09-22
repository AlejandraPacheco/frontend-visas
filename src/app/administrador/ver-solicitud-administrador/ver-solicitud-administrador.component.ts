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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ver-solicitud-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, NgForOf],
  templateUrl: './ver-solicitud-administrador.component.html',
  styleUrl: './ver-solicitud-administrador.component.css'
})
export class VerSolicitudAdministradorComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Administrador';
  
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
    this.solicitudesService.getDetalleSolicitudAdministrador(idSolicitud).subscribe({
      next: (data: SolicitudDto) => {
        this.solicitud = data;

        // Convertir idMotivo a motivoSeleccionado (string)
        this.motivoSeleccionado = this.motivos.find(m => m.idMotivo === data.idMotivo)?.descripcion || '';

          // Cargar foto con el nuevo endpoint
          this.cargarFoto(idSolicitud);
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


  cargarFoto(idSolicitud: number) {
    this.solicitudesService.getFotoSolicitud(idSolicitud).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.fotoSeleccionada = reader.result as string; // base64 para el <img>
        };
        reader.readAsDataURL(blob);
      },
      error: () => {
        this.fotoSeleccionada = ''; // no hay foto
      }
    });
  }

  cambiarEstado(nuevoEstado: string) {
  if (!this.solicitud.idSolicitud) return;

  this.solicitud.estado = nuevoEstado;

  this.solicitudesService.actualizarSolicitudAdministrador(this.solicitud.idSolicitud, this.solicitud)
    .subscribe({
      next: () => {
        alert(`Solicitud ${nuevoEstado.toLowerCase()} correctamente`);
        this.router.navigate(['/dashboard/administrador']);
      },
      error: (err) => {
        console.error('Error cambiando estado:', err);
        alert('Hubo un error al cambiar el estado');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard/administrador']);
  }

    administradorSolicitudes() {
    window.location.href = '/dashboard/administrador';
  }

  administradorCitasAgendadas() {
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





