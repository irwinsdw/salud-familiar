import { empleado } from "./empleado";
import { IntegranteFamiliar } from "./integrante-familiar";

export class Familia {
    id!: number;
    
    nombre!: string;
    telefono!: string;
    numero_historia!:string;
    titular!:empleado;
    asentamiento_humano!: string;
    nombrezona!: string;
    tipovia!: string;
    nomtipovia!: string;
    referencia!: string;
    integrantesFamiliar: IntegranteFamiliar[] = [];
}
