export interface DashboardSolicitanteDto {
    idSolicitud: number;
    fechaSolicitud: string; // lo puedes manejar como string y luego usar DatePipe
    estado: string;
}
