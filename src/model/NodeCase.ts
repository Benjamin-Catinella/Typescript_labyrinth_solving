import { AbstractNode } from "./AbstractNode";
import { Square } from "./Square";

// Unused for now
export class NodeCase extends AbstractNode<Square>{
    constructor(value: Square) {
        super(value);
    }
}