import { Square } from "./Square";
import { StepAction } from "./StepAction";

export class Step {
    square : Square;
    action : StepAction;
    number : number;
    constructor(square : Square, action: StepAction, number : number) {
        this.square = square;
        this.action = action;
        this.number = number;
    }
}