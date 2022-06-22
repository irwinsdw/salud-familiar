import { empleado } from "./empleado";
import { Familia } from "./familia";

export class Encuesta {
    id!: number;
    familia!: Familia;
    empleado!: empleado;
    numeroVisita!: string;
    formaVisita!: string;
    fechaVisita!: string;
    condicionEncuesta!: string;
    observacion!: string;
}
