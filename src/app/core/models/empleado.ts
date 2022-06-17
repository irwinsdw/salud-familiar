import { distrito } from "./distrito";
import { Establecimiento } from "./establecimiento";
import { microred } from "./microred";
import { provincia } from "./provincia";
import { redsalud } from "./redsalud";

export class empleado {
    id!: number;
    dni!:string;
    nombre!:string;
    
    establecimiento!:Establecimiento;
    
    
    distrito!:distrito;
    

    

}