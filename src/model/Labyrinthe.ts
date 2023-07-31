import { Case } from "./Case";
export class Labyrinthe{

    size : {
        width : number,
        height : number
    };
    cases : Case[];

    constructor(size : {width : number, height : number}, cases : Case[]){
        this.size = size;
        this.cases = cases;
    }


}