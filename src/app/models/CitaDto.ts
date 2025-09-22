export interface CitaDto {
    idCita?: number;
    idSolicitud: number;
    fechaCita: string; // "2025-09-22"
    horaCita: string;  // "08:30"
    nombreCompleto?: string; 
}