export class Node{
    private id: string;
    private adjacentNodes: Node[];
    private visited: boolean;

    constructor(id: string){
        this.id = id;
        this.adjacentNodes = [];
        this.visited = false;
    }

    public getId(): string{
        return this.id;
    }

    public getAdjacentNodes(): Node[]{
        return this.adjacentNodes;
    }

    public addAdjacentNode(node: Node): Node{
        this.adjacentNodes.push(node);
        return this;
    }

    public getVisited(): boolean{
        return this.visited;
    }

    public setVisited(visited: boolean): Node{
        this.visited = visited;
        return this;
    }

}