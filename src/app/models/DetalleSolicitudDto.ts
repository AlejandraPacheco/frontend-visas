export interface DetalleSolicitudDto {
    idSolicitud: number;
    idSolicitante: number;
    fechaSolicitud: string; // se recibe como ISO string desde backend
    apellidos: string;
    nombres: string;
    nacionalidad: string;
    ci: string;
    profesion: string;
    motivoDescripcion: string;
    fechaLlegadaSpain: string;
    fechaSalidaSpain: string;  
    estado: string;
}
