import { Step } from "../model/Step";

export class StepService{
    private static self : StepService;

    labyrinthSteps : {
        [key: string]: Step[];
    } = {};

    static getInstance() : StepService {
        if(!StepService.self) {
            StepService.self = new StepService();
        }
        return StepService.self;
    }
    
}