import { Position } from "./Position";

export class Square {
    visited = false;
    posX : number;
    posY : number;
    walls : {
        top: boolean,
        right: boolean,
        bottom: boolean,
        left: boolean
    };
    exit : boolean;
    entrance : boolean;
    
    constructor(
        posX : number, 
        posY : number, 
        walls : {top: boolean, right: boolean, bottom: boolean, left: boolean}, 
        exit : boolean, 
        entrance : boolean
        ){
        this.posX = posX;
        this.posY = posY;
        this.walls = walls;
        this.exit = exit;
        this.entrance = entrance;
    }

    getPosition() : Position{
        return new Position(this.posX, this.posY);
    }

    getId(): string{
        return `${this.posX}-${this.posY}`;
    }

    isVisited() : boolean{
        return this.visited;
    }

    visit(): void {
        this.visited = true;
    }
}

