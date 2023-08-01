export abstract class AbstractNode<T> {
    value: T;
    children: AbstractNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    addChild(child: AbstractNode<T>) {
        this.children.push(child);
    }

    getChildren(): AbstractNode<T>[] {
        return this.children;
    }

    getValue(): T {
        return this.value;
    }
}
