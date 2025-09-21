import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SolicitanteComponent } from './dashboard/solicitante/solicitante.component';
import { NuevaSolicitudComponent } from './solicitante/nueva-solicitud/nueva-solicitud.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard-solicitante', component: SolicitanteComponent },
    { path: 'dashboard/solicitante/nueva-solicitud', component: NuevaSolicitudComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // opcional: redirigir al login
    // otras rutas aquí...
];
