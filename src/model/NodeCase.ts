import { AbstractNode } from "./AbstractNode";
import { Square } from "./Square";

export class NodeCase extends AbstractNode<Square>{
    constructor(value: Square) {
        super(value);
    }
}