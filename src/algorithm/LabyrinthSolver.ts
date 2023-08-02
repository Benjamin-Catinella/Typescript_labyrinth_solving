import { Square } from '../model/Square';
import { Position } from "../model/Position";
import { Logger } from "../utils/Logger";
import { Step } from '../model/Step';
import { StepService } from '../service/StepService';
import { Labyrinth } from '../model/Labyrinth';
import { StepAction } from '../model/StepAction';

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
    readonly stepService : StepService = StepService.getInstance();
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
    private findAdjacentSquaresTo(
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

    getPossibleMoves(
        square: Square,
        squaresList: Square[]
    ): Square[] {
        const possibleMoves: Square[] = [];
        const adjacent = this.findAdjacentSquaresTo(square, squaresList);
        if (adjacent.top) {
            !(square.walls.top || adjacent.top.walls.bottom) &&
            !adjacent.top.isVisited()
                ? possibleMoves.push(adjacent.top)
                : null;
        }
        if (adjacent.right) {
            !(square.walls.right || adjacent.right.walls.left) &&
            !adjacent.right.isVisited()
                ? possibleMoves.push(adjacent.right)
                : null;
        }
        if (adjacent.bottom) {
            !(square.walls.bottom || adjacent.bottom.walls.top) &&
            !adjacent.bottom.isVisited()
                ? possibleMoves.push(adjacent.bottom)
                : null;
        }
        if (adjacent.left) {
            !(square.walls.left || adjacent.left.walls.right) &&
            !adjacent.left.isVisited()
                ? possibleMoves.push(adjacent.left)
                : null;
        }
        return possibleMoves;
    }

    BFS(labyrinth: Labyrinth): Square[] {
        Logger.info("Solving labyrinth using DFS", labyrinth);
        const stack: Square[] = [];

        // Find entrance square
        const entrance = labyrinth.squares.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        stack.push(entrance);

        // Call recursive
        return this.BFS_rec(stack, labyrinth, 0);
    }
    
    BFS_rec(stack: Square[], labyrinth: Labyrinth, count: number): Square[] {
        const currentSquare = stack[stack.length - 1];
        const squarehtml = document.getElementById(currentSquare.getId());
        
        if(this.debug) if(squarehtml) squarehtml.innerHTML = count.toString(); count++; // Debug only
        
        if (!currentSquare.isVisited()) {
            currentSquare.visit();
            this.stepService.labyrinthSteps[labyrinth.id].push(new Step(currentSquare, StepAction.VISIT, count));
        }
        if (currentSquare.exit) {
            return stack;
        }

        const possibleMoves = this.getPossibleMoves(currentSquare, labyrinth.squares);

        if (possibleMoves.length == 0) {
            stack.pop();
            return stack;
        }

        for (const move of possibleMoves) {
            stack.push(move);
            const newStack = this.BFS_rec(stack, labyrinth, count);
            // Pruned path
            if (newStack.length == 0) {
                if(this.debug) document.getElementById(move.getId())?.classList.add("purple"); // Debug only
                this.stepService.labyrinthSteps[labyrinth.id].push(new Step(currentSquare, StepAction.BACKTRACK, count));
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
}
