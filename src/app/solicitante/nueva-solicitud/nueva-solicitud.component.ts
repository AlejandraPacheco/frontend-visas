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

@Component({
  selector: 'app-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf],
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent implements OnInit {
  username: string = localStorage.getItem('username') || 'Solicitante';
  solicitud: any = {}; // luego defines un DTO
  paises: PaisDto[] = [];
  sexos: SexoDto[] = [];
  estadosCiviles: EstadoCivilDto[] = [];
  motivos: MotivoDto[] = [];

  constructor(private paisService: PaisService, private sexoService: SexoService, private estadoCivilService: EstadocivilService, private motivoService: MotivoService) {}

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
    console.log('Solicitud creada:', this.solicitud);
    // aquí llamas al backend
  }

  cancelar() {
    console.log('Cancelado');
  }

  logout() {
    localStorage.removeItem('token');
    // rediriges al login
    window.location.href = '/login';
  }
}

