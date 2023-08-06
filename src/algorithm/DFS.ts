import { Graph } from "../model/Graph";

export class DFS{
    DFS(from : Node, to: Node): Node[] {
        const stack: Square[] = [];

        // Find entrance square
        const entrance = graph.nodes.find((square) => square.entrance);
        if (!entrance) {
            throw new Error("No entrance found");
        }
        stack.push(entrance);

        // Call recursive
        return this.DFS_rec(stack, graph, 0);
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
}