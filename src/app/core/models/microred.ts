import { Establecimiento } from "./establecimiento";
import { redsalud } from "./redsalud";

export class microred {

    id!: number;
    redsalud!:redsalud;
    nombre!:string;
    establecimientos: Establecimiento[] = [];
    
    }