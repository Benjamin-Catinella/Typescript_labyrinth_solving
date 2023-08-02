import { Square } from '../model/Square';
import { Position } from '../model/Position';
import { Logger } from '../utils/Logger';

class AdjacentSquares{
    top : Square | undefined
    left: Square | undefined
    bottom: Square | undefined
    right: Square | undefined
}

    /* 
    The solver needs to return a stack of moves to play for the view to use.
    The idea is that if we have a stack like this :
    [
        entrance,
        square1,
        ..2,
        ..3,
        ..4,
        ..5,
        ..,
        exit
    ] 
    The view can then process this stack as needed for animations/coloring/maybe timeline and such
    */
export class LabyrinthSolver{


    /**
     * Finds the adjacent squares to the given square looping around the labyrinth (top, right, bottom, left)
     * @param square 
     * @param squaresList 
     * @returns 
     */ 
    private findAdjacentSquaresToLooparound(square : Square, squaresList: Square[]) : Square[] {
        const labXLength = squaresList.map((c) => c.posX).reduce((a, b) => Math.max(a, b)) + 1;
        const labYLength = squaresList.map((c) => c.posY).reduce((a, b) => Math.max(a, b)) + 1;
        const offsets = {
            top : (((square.posY+1) % labYLength) + labYLength) % labYLength,
            right : (((square.posX+1) % labXLength) + labXLength) % labXLength,
            bottom : (((square.posY-1) % labYLength) + labYLength) % labYLength,
            left : (((square.posX-1) % labXLength) + labXLength) % labXLength
        }
        const positions ={
            top : new Position(square.posX, offsets.top),
            bottom : new Position(square.posX, offsets.bottom),
            right : new Position(offsets.right, square.posY),
            left : new Position(offsets.left, square.posY),
        }
        const adjacentSquares: Square[] = squaresList.filter((square_) => {
            return (
                square_.getPosition().equals(positions.top) ||
                square_.getPosition().equals(positions.right) ||
                square_.getPosition().equals(positions.bottom) ||
                square_.getPosition().equals(positions.left)
            )
        });
        return adjacentSquares;
    }

    /**
     * Finds all the adjacent squares to the given square (top, right, bottom, left)
     * @param square 
     * @param squaresList 
     * @returns 
     */
    private findAdjacentSquaresTo(square : Square, squaresList: Square[]) : AdjacentSquares {
        const positions ={
            top : new Position(square.posX-1, square.posY),
            bottom : new Position(square.posX+1, square.posY),
            right : new Position(square.posX, square.posY+1),
            left : new Position(square.posX, square.posY-1),
        }
        const adjacentSquares: AdjacentSquares = new AdjacentSquares;
        
        squaresList.map((square_) => {
                square_.getPosition().equals(positions.top) ? adjacentSquares.top = square_ : undefined;
                square_.getPosition().equals(positions.right) ? adjacentSquares.right = square_ : undefined;
                square_.getPosition().equals(positions.bottom) ? adjacentSquares.bottom = square_ : undefined;
                square_.getPosition().equals(positions.left) ? adjacentSquares.left = square_ : undefined;
        });

        return adjacentSquares;
    }

    getPossibleMovesInAdjacentSquares(square: Square, adjacent : AdjacentSquares) : Square[] { 
        const possibleMoves : Square[] = [];
        if(adjacent.top){
            !(square.walls.top || adjacent.top.walls.bottom) && !adjacent.top.isVisited() ? possibleMoves.push(adjacent.top) : null
        }
        if(adjacent.right){
            !(square.walls.right || adjacent.right.walls.left) && !adjacent.right.isVisited() ? possibleMoves.push(adjacent.right) : null
        }
        if(adjacent.bottom){
            !(square.walls.bottom || adjacent.bottom.walls.top) && !adjacent.bottom.isVisited() ? possibleMoves.push(adjacent.bottom) : null
        }
        if(adjacent.left){
            !(square.walls.left || adjacent.left.walls.right) && !adjacent.left.isVisited() ? possibleMoves.push(adjacent.left) : null
        }
        return possibleMoves;
    }

    solve(labyrinth: Square[]) : Square[] | undefined{
        Logger.info("Solving labyrinth", labyrinth);
        const stack : Square[] = [];
        const entrance = labyrinth.find((square) => square.entrance);
        Logger.info("Entrance", entrance);
        if(!entrance){
            throw new Error("No entrance found");
        }
        // Find entrance square
        stack.push(entrance);

        // Call recursive
        return this.solveRec(stack, labyrinth);
    }

    solveRec(stack: Square[], labyrinth: Square[]) : Square[] | undefined{
        // Sets as visited
        const square = stack[stack.length-1];
        Logger.info("Visiting", square)
        square.visit();

        // If no possible moves, dead-end, removes itself from the stack, return; see later for 'win condition'
        const possibleMoves = this.getPossibleMovesInAdjacentSquares(square, this.findAdjacentSquaresTo(square, labyrinth));
        if(square.exit){
            Logger.info("Found exit");
            return stack;
        }
        if(possibleMoves.length == 0){
            Logger.info("Met dead-end", square)
            stack.pop();
            return stack;
        }
        // Push the move(s) to the stack and recurse
        possibleMoves.forEach(move =>{
            stack.push(move)
            return this.solveRec(stack, labyrinth);
        })

        if(stack[stack.length-1].exit){
            return stack;
        }
    }
}