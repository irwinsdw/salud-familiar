import { Familia } from "./familia";

export class HistoriaFamiliar {
    id!: number;
    familia!: Familia;
    numeroHistoria!: string;
    subSector!: string;
    condicionEncuesta!: string;
    observacion!: string;
    fechaApertura!: string;
    numeroVisitaPresencial!: string;
    numeroVisitaRemota!: string;
}
