export interface DetalleSolicitudDto {
    idSolicitud: number;
    idSolicitante: number;
    fechaSolicitud: string; // se recibe como ISO string desde backend
    apellidos: string;
    nombres: string;
    nacionalidad: string;
    ci: string;
    profesion: string;
    idMotivo: number;
    fechaLlegadaSpain: string | null; // puede ser null si no está definido
    fechaSalidaSpain: string | null;  // puede ser null si no está definido
    estado: string;
}
