import { NodeGraph } from '../model/NodeGraph';
import { Labyrinth } from "../model/Labyrinth";
import { Node } from '../model/Node';
import { Position } from "../model/Position";
import { Square } from "../model/Square";
import { Logger } from '../utils/Logger';

class AdjacentSquares {
    top: Square | undefined;
    left: Square | undefined;
    bottom: Square | undefined;
    right: Square | undefined;
}
export class GraphMapper{
    
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
    private getAccessibleNeighbours(
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
    /**
     * Maps a labyrinth to a graph
     * @param labyrinth 
     * @returns 
     */
    public mapLabyrinthToGraph(labyrinth: Labyrinth): NodeGraph {
        const nodeGraph : NodeGraph = new NodeGraph(labyrinth.id);
        // Convert labyrinth squares a list of nodes
        for (const square of labyrinth.squares) {
            let node = nodeGraph.getNode(square.getId());
            if(!node){
                node = new Node(square.getId());
                nodeGraph.addNode(node);
            }
            const neighbours = this.getAccessibleNeighbours(square, labyrinth.squares);
            for (const neighbour of neighbours) {
                let n_node = nodeGraph.getNode(neighbour.getId());
                if(!n_node){
                    n_node = new Node(neighbour.getId());
                    nodeGraph.addNode(n_node);
                }
                node.addAdjacentNode(n_node);
            }
        }
        return nodeGraph;
    }
    
}