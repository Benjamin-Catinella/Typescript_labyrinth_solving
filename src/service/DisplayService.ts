import { Labyrinth } from "../model/Labyrinth";
import { Square } from "../model/Square";
import { LabyrinthService } from "./LabyrinthService";
import { StyleService } from "./StyleService";

/**
 * Handles the display of the labyrinth to the browser
 */
export class DisplayService {
    private static instance: DisplayService;
    private readonly labyrinthService: LabyrinthService;
    private readonly styleService: StyleService;
    private constructor() {
        this.styleService = StyleService.getInstance();
        this.labyrinthService = LabyrinthService.getInstance();
    }
    public static getInstance(): DisplayService {
        if (!DisplayService.instance) {
            DisplayService.instance = new DisplayService();
        }
        return DisplayService.instance;
    }
    readonly htmlElements = {
        table: document.getElementById("labyrinthTable"),
        selectSize: document.getElementById("sizeSelect"),
        choixLabyrinthe: document.getElementById("labyrinthSelect"),
        runBFSButton: document.getElementById("runBFS"),
        runDFSButton: document.getElementById("runDFS"),
        debugCheckbox: document.getElementById("debugCheckbox") as HTMLInputElement,
        resetButton: document.getElementById("resetButton"),
        toggleThemeButton: document.getElementById("toggleThemeButton"),
    };
    readonly squaresHTMLMap: { [key: string]: HTMLElement } = {};
    
    fillSelectSize(sizes: number[]) {
        for (const size of sizes) {
            const option = document.createElement("option");
            option.value = (size).toString();
            option.innerText = (size).toString();
            this.htmlElements.selectSize!.appendChild(option);
        }
    }

    fillSelectLabyrinth(choices: string[] ) {
        this.htmlElements.choixLabyrinthe!.innerHTML = "";
        
        choices.forEach((choice) => {
            const option = document.createElement("option");
            option.value = choice;
            option.innerText = choice;
            this.htmlElements.choixLabyrinthe!.appendChild(option);
        });
    }
    displayLabyrinth(labyrinth: Labyrinth) {
        const size = labyrinth.size;
        const squares = labyrinth.squares;
        // Empty the table
        this.htmlElements.table!.innerHTML = "";
        for (let i = 0; i < size.height; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < size.width; j++) {
                const index = i * size.width + j;
                const square = squares[index];
                row.appendChild(this.squaresHTMLMap[square.getId()]);
            }
            this.htmlElements.table!.appendChild(row);
        }
    }

    populateSquaresHTMLMap(squares: Square[]) {
        squares.forEach((square) => {
            const squareElement = document.createElement("td");
            squareElement.id = square.getId();
            squareElement.classList.add("square");
            squareElement.classList.add("box");
            // squareElement.addEventListener("click", onSquareClick);
            this.styleService.getClassesFromSquare(square).forEach((cssClass) => {
                cssClass != "" ? squareElement.classList.add(cssClass) : null;
            });
            this.squaresHTMLMap[square.getId()] = squareElement;
        });
    }

}
