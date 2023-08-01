import { Square } from "./Square";
export class Labyrinth{

    size : {
        width : number,
        height : number
    };
    squares : Square[];

    constructor(size : {width : number, height : number}, squares : Square[]){
        this.size = size;
        this.squares = squares;
    }


}