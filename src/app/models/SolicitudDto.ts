export class SolicitudDto {
    idSolicitud?: number;
    idSolicitante?: number;
    fechaSolicitud?: string | Date;
    apellidos?: string;
    nombres?: string;
    fechaNacimiento?: string | Date;
    idPaisDeNacimiento?: number;       // <- nueva
    nacionalidad?: string;
    idSexo?: number;                   // <- nueva
    idEstadoCivil?: number;            // <- nueva
    ci?: string;
    numeroPasaporte?: string;
    fechaExpedicionPasaporte?: string | Date;
    fechaVencimientoPasaporte?: string | Date;
    idPaisExpedicionPasaporte?: number; // <- nueva
    profesion?: string;
    idMotivo?: number;                  // <- nueva
    fechaLlegadaSpain?: string | Date;
    fechaSalidaSpain?: string | Date;
    estado?: string;
    fotografiaBase64?: string;
}
