import { Square } from '../model/Square';
import { Position } from "../model/Position";
import { Logger } from "../utils/Logger";
import { Labyrinth } from '../model/Labyrinth';

class AdjacentSquares {
    top: Square | undefined;
    left: Square | undefined;
    bottom: Square | undefined;
    right: Square | undefined;
}
/* 
    The solver needs to return a detailed stack of steps taken to solve the labyrinth
    The Step class should contain the following information:
    - The square where the step was taken
    - What action was taken, visit or backtracking, or both

    */
export class LabyrinthSolver {
    debug : boolean = false;
    /**
     * Finds the adjacent squares to the given square looping around the labyrinth (top, right, bottom, left)
     * @param square
     * @param squaresList
     * @returns
     */
    private findAdjacentSquaresToLooparound(
        square: Square,
        squaresList: Square[]
    ): AdjacentSquares {
        const labXLength =
            squaresList.map((c) => c.posX).reduce((a, b) => Math.max(a, b)) + 1;
        const labYLength =
            squaresList.map((c) => c.posY).reduce((a, b) => Math.max(a, b)) + 1;
        const offsets = {
            top: (((square.posY + 1) % labYLength) + labYLength) % labYLength,
            right: (((square.posX + 1) % labXLength) + labXLength) % labXLength,
            bottom:
                (((square.posY - 1) % labYLength) + labYLength) % labYLength,
            left: (((square.posX - 1) % labXLength) + labXLength) % labXLength,
        };
        const positions = {
            top: new Position(square.posX, offsets.top),
            bottom: new Position(square.posX, offsets.bottom),
            right: new Position(offsets.right, square.posY),
            left: new Position(offsets.left, square.posY),
        };
        const adjacentSquares: AdjacentSquares = new AdjacentSquares();

        squaresList.map((square_) => {
            square_.getPosition().equals(positions.top)
                ? (adjacentSquares.top = square_)
                : undefined;
            square_.getPosition().equals(positions.right)
                ? (adjacentSquares.right = square_)
                : undefined;
            square_.getPosition().equals(positions.bottom)
                ? (adjacentSquares.bottom = square_)
                : undefined;
            square_.getPosition().equals(positions.left)
                ? (adjacentSquares.left = square_)
                : undefined;
        });
        return adjacentSquares;
    }

    /**
     * Finds all the adjacent squares to the given square (top, right, bottom, left)
     * @param square
     * @param squaresList
     * @returns
     */
    private getAllNeighbours(
        square: Square,
        squaresList: Square[]
    ): AdjacentSquares {
        const positions = {
            top: new Position(square.posX - 1, square.posY),
            bottom: new Position(square.posX + 1, square.posY),
            right: new Position(square.posX, square.posY + 1),
            left: new Position(square.posX, square.posY - 1),
        };
        const adjacentSquares: AdjacentSquares = new AdjacentSquares();

        squaresList.map((square_) => {
            square_.getPosition().equals(positions.top)
                ? (adjacentSquares.top = square_)
                : undefined;
            square_.getPosition().equals(positions.right)
                ? (adjacentSquares.right = square_)
                : undefined;
            square_.getPosition().equals(positions.bottom)
                ? (adjacentSquares.bottom = square_)
                : undefined;
            square_.getPosition().equals(positions.left)
                ? (adjacentSquares.left = square_)
                : undefined;
        });

        return adjacentSquares;
    }

    getAccessibleNeighbours(
        square: Square,
        squaresList: Square[]
    ): Square[] {
        const neighbours: Square[] = [];
        const adjacent = this.getAllNeighbours(square, squaresList);
        if (adjacent.top) {
            !(square.walls.top || adjacent.top.walls.bottom) &&
            !adjacent.top.isVisited()
                ? neighbours.push(adjacent.top)
                : null;
        }
        if (adjacent.right) {
            !(square.walls.right || adjacent.right.walls.left) &&
            !adjacent.right.isVisited()
                ? neighbours.push(adjacent.right)
                : null;
        }
        if (adjacent.bottom) {
            !(square.walls.bottom || adjacent.bottom.walls.top) &&
            !adjacent.bottom.isVisited()
                ? neighbours.push(adjacent.bottom)
                : null;
        }
        if (adjacent.left) {
            !(square.walls.left || adjacent.left.walls.right) &&
            !adjacent.left.isVisited()
                ? neighbours.push(adjacent.left)
                : null;
        }
        return neighbours;
    }

    DFS(labyrinth: Labyrinth): Square[] {
        Logger.info("Solving labyrinth using DFS", labyrinth);
        const stack: Square[] = [];

        // Find entrance square
        const entrance = labyrinth.squares.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        stack.push(entrance);

        // Call recursive
        return this.DFS_rec(stack, labyrinth, 0);
    }
    
    DFS_rec(stack: Square[], labyrinth: Labyrinth, count: number): Square[] {
        const currentSquare = stack[stack.length - 1];
        const squarehtml = document.getElementById(currentSquare.getId());
        
        if(this.debug) if(squarehtml) squarehtml.innerHTML = count.toString(); count++; // Debug only
        
        if (!currentSquare.isVisited()) {
            currentSquare.visit();
            // this.stepService.labyrinthSteps[labyrinth.id].push(new Step(currentSquare, StepAction.VISIT, count));
        }
        if (currentSquare.exit) {
            return stack;
        }

        const possibleMoves = this.getAccessibleNeighbours(currentSquare, labyrinth.squares);

        if (possibleMoves.length == 0) {
            stack.pop();
            return stack;
        }

        for (const move of possibleMoves) {
            stack.push(move);
            const newStack = this.DFS_rec(stack, labyrinth, count);
            // Pruned path
            if (newStack.length == 0) {
                if(this.debug) document.getElementById(move.getId())?.classList.add("purple"); // Debug only
                // this.stepService.labyrinthSteps[labyrinth.id].push(new Step(currentSquare, StepAction.BACKTRACK, count));
                stack.pop();
            }
            // Found exit
            else if (newStack[newStack.length - 1].exit) {
                return newStack;
            }
            // Is a dead end
            if(this.debug) document.getElementById(move.getId())?.classList.add("red"); // Debug only
        }

        // Didn't find any path
        return [];
    }


    BFS(labyrinth : Labyrinth) : Square[] | undefined{
        Logger.info("Solving labyrinth using BFS", labyrinth);

        // Find entrance square
        const entrance = labyrinth.squares.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }

        // Call iterative function
        return this.BFS_it(labyrinth, entrance);
    }

    BFS_it(labyrinth: Labyrinth, entrance : Square) : Square[] | undefined{
        const queue : Square[] = [];
        const path : Square[] = [];
        let neighbourhtml;
        let count = 0;
        entrance.visit();
        queue.push(entrance);
        if(this.debug) document.getElementById(entrance.getId())!.innerHTML = count.toString() // Debug only
        count++;

        while(queue.length > 0){
            const current = queue.shift();

            const neighbours = this.getAccessibleNeighbours(current!, labyrinth.squares);

            for(let neighbour of neighbours){
                if(this.debug){
                    neighbourhtml = document.getElementById(neighbour!.getId());
                    document.getElementById(neighbour!.getId())!.innerHTML = count.toString() // Debug only
                }
                count++;
                neighbour.setParent(current!);
                if(!neighbour.isVisited()){
                    neighbour.visit();
                    if(neighbour.exit){
                        Logger.info("Found exit", neighbour);
                        while(neighbour.getParent()){
                            path.push(neighbour);
                            neighbour = neighbour.getParent()!;
                        }
                        return path;
                    }
                    queue.push(neighbour);
                    if(this.debug) neighbourhtml?.classList.add("purple"); // Debug only
                }
            }
        }
    }
}
