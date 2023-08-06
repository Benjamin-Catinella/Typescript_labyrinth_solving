import { Node } from "./Node";

export class Graph{
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

    public addNode(node: Node): Graph{
        this.nodes[node.getId()] = node;
        return this;
    }

}