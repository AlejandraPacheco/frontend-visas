import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SolicitanteComponent } from './dashboard/solicitante/solicitante.component';
import { NuevaSolicitudComponent } from './solicitante/nueva-solicitud/nueva-solicitud.component';
import { CitasComponent } from './components/citas/citas.component';
import { DetalleSolicitudComponent } from './solicitante/detalle-solicitud/detalle-solicitud.component';
import { FuncionarioConsularComponent } from './dashboard/funcionario-consular/funcionario-consular.component';
import { CitasAgendadasComponent } from './funcionario/citas-agendadas/citas-agendadas.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard-solicitante', component: SolicitanteComponent },
    { path: 'dashboard/solicitante/nueva-solicitud', component: NuevaSolicitudComponent },
    { path: 'dashboard/solicitante/citas', component: CitasComponent },
    { path: 'dashboard/solicitante/detalle-solicitud', component: DetalleSolicitudComponent },
    { path: 'dashboard/funcionario-consular', component: FuncionarioConsularComponent },
    { path: 'dashboard/funcionario-consular/citas-agendadas', component: CitasAgendadasComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // opcional: redirigir al login
    // otras rutas aquí...
];
