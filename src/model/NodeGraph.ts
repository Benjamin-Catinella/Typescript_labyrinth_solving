import { Node } from "./Node";

export class NodeGraph{
    readonly id: string;
    readonly nodes: {
        [key: string]: Node;
    };

    constructor(id: string){
        this.id = id;
        this.nodes = {};
    }

    public getNode(id: string): Node | undefined{
        return this.nodes[id];
    }

    public addNode(node: Node): NodeGraph{
        this.nodes[node.getId()] = node;
        return this;
    }

}