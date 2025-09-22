import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroSolicitanteComponent } from './auth/registro-solicitante/registro-solicitante.component';
import { SolicitanteComponent } from './dashboard/solicitante/solicitante.component';
import { NuevaSolicitudComponent } from './solicitante/nueva-solicitud/nueva-solicitud.component';
import { CitasComponent } from './components/citas/citas.component';
import { DetalleSolicitudComponent } from './solicitante/detalle-solicitud/detalle-solicitud.component';
import { FuncionarioConsularComponent } from './dashboard/funcionario-consular/funcionario-consular.component';
import { CitasAgendadasComponent } from './funcionario/citas-agendadas/citas-agendadas.component';
import { VerSolicitudComponent } from './funcionario/ver-solicitud/ver-solicitud.component';
import { AdministradorComponent } from './dashboard/administrador/administrador.component';
import { VerSolicitudAdministradorComponent } from './administrador/ver-solicitud-administrador/ver-solicitud-administrador.component';
import { CitasAgendadasAdministradorComponent } from './administrador/citas-agendadas-administrador/citas-agendadas-administrador.component';
import { ReporteComponent } from './administrador/reporte/reporte.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro-solicitante', component: RegistroSolicitanteComponent },
    { path: 'dashboard-solicitante', component: SolicitanteComponent },
    { path: 'dashboard/solicitante/nueva-solicitud', component: NuevaSolicitudComponent },
    { path: 'dashboard/solicitante/citas', component: CitasComponent },
    { path: 'dashboard/solicitante/detalle-solicitud', component: DetalleSolicitudComponent },
    { path: 'dashboard/funcionario-consular', component: FuncionarioConsularComponent },
    { path: 'dashboard/funcionario-consular/citas-agendadas', component: CitasAgendadasComponent },
    { path: 'dashboard/funcionario-consular/ver-solicitud', component: VerSolicitudComponent },
    { path: 'dashboard/administrador', component: AdministradorComponent },
    { path: 'dashboard/administrador/ver-solicitud', component: VerSolicitudAdministradorComponent },
    { path: 'dashboard/administrador/citas-agendadas', component: CitasAgendadasAdministradorComponent },
    { path: 'dashboard/administrador/reporte', component: ReporteComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // opcional: redirigir al login
    // otras rutas aquí...
];
