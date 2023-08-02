import { Square } from '../model/Square';
import { Position } from "../model/Position";
import { Logger } from "../utils/Logger";

class AdjacentSquares {
    top: Square | undefined;
    left: Square | undefined;
    bottom: Square | undefined;
    right: Square | undefined;
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

    getPossibleMovesInAdjacentSquares(
        square: Square,
        adjacent: AdjacentSquares
    ): Square[] {
        const possibleMoves: Square[] = [];
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

    BFS(labyrinth: Square[]): Square[] | undefined {
        Logger.info("Solving labyrinth using DFS", labyrinth);
        const stack: Square[] = [];

        // Find entrance square
        const entrance = labyrinth.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        stack.push(entrance);

        // Call recursive
        return this.BFS_rec(stack, labyrinth, 0);
    }
    
    BFS_rec(stack: Square[], labyrinth: Square[], count: number): Square[] {
        const currentSquare = stack[stack.length - 1];
        const squarehtml = document.getElementById(currentSquare.getId());

        if(this.debug) if(squarehtml) squarehtml.innerHTML = count.toString(); count++; // Debug only
        if (!currentSquare.isVisited()) {
            currentSquare.visit();
        }
        if (currentSquare.exit) {
            return stack;
        }

        const possibleMoves = this.getPossibleMovesInAdjacentSquares(
            currentSquare,
            this.findAdjacentSquaresTo(currentSquare, labyrinth)
        );
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
