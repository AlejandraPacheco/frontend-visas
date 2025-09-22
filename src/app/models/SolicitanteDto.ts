export interface SolicitanteDto {
    nombres: string;
    apellidos: string;
    ci: string;
    email: string;
    usuario: string;
    password: string;
    ciudadId: number; // o int
    celular: string; // opcional si puede ser null
    fechaNacimiento: Date; // tipo fecha
}
