import { empleado } from "./empleado";
import { IntegranteFamiliar } from "./integrante-familiar";

export class Familia {
    id!: number;
    
    nombre!: string;
    telefono!: string;
    numeroHistoria!:string;
    titular!:empleado;
    zona!: string;
    nombrezona!: string;
    tipovia!: string;
    nomtipovia!: string;
    referencia!: string;
    integrantesFamiliar: IntegranteFamiliar[] = [];
}
