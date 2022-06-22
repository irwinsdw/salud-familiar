import { empleado } from "./empleado";

export class Familia {
    id!: number;
    
    nombre!: string;
    telefono!: string;
    numeroHistoria!:string;
    titular!:empleado;
    asentamientoHumano!: string;
    direccion!: string;
    lote!: string;
    manzana!: string;
    subSector!: string;
    fechaCreacion!:string;
    referencia!: string;
}
