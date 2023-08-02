import { Square } from "./Square";
export class Labyrinth{
    id : string;
    size : {
        width : number,
        height : number
    };
    squares : Square[];

    constructor(id: string, size : {width : number, height : number}, squares : Square[]){
        this.id = id;
        this.size = size;
        this.squares = squares;
    }

    reset(){
        this.squares.forEach(square => {
            square.visited = false;
        });
    }
}