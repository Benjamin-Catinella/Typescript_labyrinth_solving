import { Square } from "../model/Square";

export class CssMapper{

    getClassesFromSquare(square: Square): string[] {
        const classes: string[] = [];
        classes.push(square.walls.top ? "wall-top" : "");
        classes.push(square.walls.right ? "wall-right" : "");
        classes.push(square.walls.bottom ? "wall-down" : "");
        classes.push(square.walls.left ? "wall-left" : "");
        classes.push(square.exit ? "exit" : "");
        classes.push(square.entrance ? "entrance" : "");
        return classes;
    }      

}