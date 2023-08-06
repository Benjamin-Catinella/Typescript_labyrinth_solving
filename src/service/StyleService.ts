import { Square } from "../model/Square";

export class StyleService{
    private themes = ["base", "dark"];
    private selectedTheme = "base";

    private static instance: StyleService;

    public static getInstance(): StyleService {
        if (!StyleService.instance) {
            StyleService.instance = new StyleService();
        }
        return StyleService.instance;
    }

    private constructor() {}

    getClassesFromSquare(square: Square): string[] {
        const classes: string[] = [];
        classes.push(square.walls.top ? "wall-top" : "");
        classes.push(square.walls.right ? "wall-right" : "");
        classes.push(square.walls.bottom ? "wall-down" : "");
        classes.push(square.walls.left ? "wall-left" : "");
        classes.push(square.exit ? "exit" : "");
        classes.push(square.entrance ? "entrance" : "");
        return classes;
    }      

    getNextTheme(): string {
        const index = this.themes.indexOf(this.selectedTheme);
        this.selectedTheme = this.themes[(index + 1) % this.themes.length]; 
        return this.selectedTheme;
    }
}