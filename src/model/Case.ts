export class Case{
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

}

