import { AbstractNode } from "./AbstractNode";
import { Case } from "./Case";

export class NodeCase extends AbstractNode<Case>{
    constructor(value: Case) {
        super(value);
    }
}