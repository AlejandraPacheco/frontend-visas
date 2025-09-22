import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CiudadService } from '../../services/ciudad.service';
import { CiudadDto } from '../../models/CiudadDto';
import { SolicitanteDto } from '../../models/SolicitanteDto';
import { SolicitanteService } from '../../services/solicitante.service';

@Component({
  selector: 'app-registro-solicitante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-solicitante.component.html',
  styleUrls: ['./registro-solicitante.component.css']
})
export class RegistroSolicitanteComponent {
  solicitante: SolicitanteDto & { confirmPassword: string } = {
    nombres: '',
    apellidos: '',
    ci: '',
    email: '',
    usuario: '',
    password: '',
    confirmPassword: '',
    ciudadId: 0,
    celular: '',
    fechaNacimiento: new Date()
  };

  ciudades: CiudadDto[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private ciudadService: CiudadService, private solicitanteService: SolicitanteService) {
  }

  ngOnInit(): void {
    this.ciudadService.getCiudades().subscribe({
      next: (data) => {
        this.ciudades = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar las ciudades.';
      }
    });
  }

registrarSolicitante() {
  this.errorMessage = '';
  this.successMessage = '';

  if (this.solicitante.password !== this.solicitante.confirmPassword) {
    this.errorMessage = 'Las contraseñas no coinciden.';
    return;
  }

  this.solicitanteService.verificarCi(this.solicitante.ci).subscribe({
    next: (res) => {
      if (res.exists) {
        this.errorMessage = 'Ya existe un solicitante con este número de CI.';
      } else {
        this.solicitanteService.registrarSolicitante(this.solicitante).subscribe({
          next: (res) => {
            console.log('Registro exitoso', res);
            this.successMessage = res.message; // <--- ahora toma el mensaje del backend
            setTimeout(() => this.irLogin(), 2000);
          },
          error: (err) => {
            console.error('Error al registrar solicitante', err);
            this.errorMessage = err.error?.message || 'Error al registrar. Verifica tus datos e intenta nuevamente.';
          }
        });
      }
    },
    error: (err) => {
      console.error('Error verificando CI', err);
      this.errorMessage = 'Error al verificar CI. Intenta nuevamente.';
    }
  });
}

/* 
  private enviarRegistro() {
    this.http.post('http://localhost:8080/api/solicitantes', this.solicitante).subscribe({
      next: (res) => {
        console.log('Registro exitoso', res);
        this.successMessage = 'Registro completado con éxito. Ahora puedes iniciar sesión.';
        setTimeout(() => {
          this.irLogin();
        }, 2000);
      },
      error: (err) => {
        console.error('Error al registrar solicitante', err);
        this.errorMessage = 'Error al registrar. Verifica tus datos e intenta nuevamente.';
      }
    });
  } */

  irLogin() {
    this.router.navigate(['/login']);
  }
}
