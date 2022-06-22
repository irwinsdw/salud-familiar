import { Familia } from "./familia";

export class Persona {
    id!: number;
    nombreCompleto!: string;
    parentesco!: string;
    estadoCivil!: string;
    seguro!: string;
    fechaNacimiento!: string;
    dni!: string;
    genero!: string;
    estudios!: string;
    ocupacion!: string;
    clasificacionRiesgo!: string;
    idioma!: string;
    religion!: string;
    pertenenciaEtnica!: string;
    familia!: Familia;
}
