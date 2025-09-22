import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:8081/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (res.code === '200') {
          localStorage.setItem('token', res.response.token);
          localStorage.setItem('username', res.response.username);
          localStorage.setItem('rol', res.response.rol);
          localStorage.setItem('idUsuario', res.response.idUsuario);
          console.log('rol', res.response.rol);
          console.log('Response:', res);
          // Redirigir según el rol
          if (res.response.rol === 'Solicitante') {
            this.router.navigate(['/dashboard-solicitante']);
          } else if (res.response.rol === 'Funcionario Consular') {
            this.router.navigate(['/dashboard/funcionario-consular']);
          } else if (res.response.rol === 'Administrador') {
            this.router.navigate(['/dashboard/administrador']);
          }
        } else {
          this.errorMessage = res.errorMessage;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error de conexión con el servidor';
      }
    });
  }

  crearCuenta() {
    this.router.navigate(['/registro-solicitante']);
  }
}
