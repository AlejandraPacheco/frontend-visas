import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-solicitante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-solicitante.component.html',
  styleUrls: ['./registro-solicitante.component.css']
})
export class RegistroSolicitanteComponent {
  solicitante: any = {
    ci: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrarSolicitante() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validar coincidencia de contraseñas
    if (this.solicitante.password !== this.solicitante.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Verificar duplicado de CI
    this.http.get<any>(`http://localhost:8080/api/solicitantes/ci/${this.solicitante.ci}`).subscribe({
      next: (res) => {
        if (res && res.exists) {
          this.errorMessage = 'Ya existe un solicitante con este número de CI.';
        } else {
          this.enviarRegistro();
        }
      },
      error: (err) => {
        console.error('Error verificando CI', err);
        this.errorMessage = 'Error al verificar CI. Intenta nuevamente.';
      }
    });
  }

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
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
