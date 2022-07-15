import { Item } from "./item";

export class Caracteristica {
    id!: number;
    nombre!: string;
    descripcion!: string;
    tipo!: string;
    item: Item[] = [];
}
