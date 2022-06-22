import { distrito } from "./distrito";
import { redsalud } from "./redsalud";

export class provincia {

id!: number;

nombre!:string;
distritos: distrito[] = [];
}