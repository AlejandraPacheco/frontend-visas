import { Pipe, PipeTransform } from '@angular/core';
import { DetalleSolicitudDto } from '../models/DetalleSolicitudDto';

@Pipe({
    name: 'filtroPorCI',
    standalone: true
    })
    export class FiltroPorCIPipe implements PipeTransform {
    transform(solicitudes: DetalleSolicitudDto[], ci: string): DetalleSolicitudDto[] {
        if (!ci) return solicitudes;
        return solicitudes.filter(s => s.ci.toString().includes(ci.trim()));
    }
}
