import { Square as Square } from '../model/Square';
import { NodeCase } from "../model/NodeCase";
import { Position } from '../model/Position';
import { Logger } from '../utils/Logger';

export class NodeSquareMapper{

    constructor(){}

    findAdjacentCasesTo(square : Square, squaresList: Square[]) : Square[] {
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
}