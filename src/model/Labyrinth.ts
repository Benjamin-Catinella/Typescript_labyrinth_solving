import { Square } from "./Square";
export class Labyrinth{
    readonly id : string;
    readonly size : {
        width : number,
        height : number
    };
    readonly squares : Square[];
    readonly entrances : Square[] = [];
    readonly exits : Square[] = [];

    constructor(id: string, size : {width : number, height : number}, squares : Square[], entrances : Square[], exits : Square[]){
        this.id = id;
        this.size = size;
        this.squares = squares;
        this.entrances = entrances;
        this.exits = exits;
    }

    reset(){
        this.squares.forEach(square => {
            square.visited = false;
        });
    }
}