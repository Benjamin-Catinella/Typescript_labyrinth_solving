/**
 * Projet de parcours de labyrinthes
 */

import { Labyrinth } from "./model/Labyrinth";
import { LabyrinthService } from "./service/LabyrinthService";
import { StyleService } from "./service/StyleService";
import { LabyrinthSolver } from "./algorithm/LabyrinthSolver";
import { GraphMapper } from "./mapping/GraphMapper";
import { DisplayService } from "./service/DisplayService";
import { SettingsService } from "./service/SettingsService";

// Services

const labyrinthService: LabyrinthService = LabyrinthService.getInstance();
const styleService: StyleService = StyleService.getInstance();
const labyrinthSolver: LabyrinthSolver = LabyrinthSolver.getInstance();
const displayService: DisplayService = DisplayService.getInstance();
const settingsService: SettingsService = SettingsService.getInstance();
settingsService.settings.debug = displayService.htmlElements.debugCheckbox!.checked; // Checkbox is saved on f5 refresh so we need to set it here to keep the value

// Variables

let labyrinths: { [key: string]: Labyrinth };
let selectedLabyrinth: Labyrinth | undefined;

// Dom manipulation functions

function onClickResetButton() {
    selectedLabyrinth?.reset();
    const keys = Object.keys(displayService.squaresHTMLMap);
    keys.forEach((key) => {
        displayService.squaresHTMLMap[key].classList.remove("solution");
        displayService.squaresHTMLMap[key].classList.remove("purple");
        displayService.squaresHTMLMap[key].classList.remove("red");
        displayService.squaresHTMLMap[key].innerHTML = "";
    });
}

// Event handlers

function onSelectSizeChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    const size = parseInt(target.value);
    labyrinthService.getAllLabyrinthsOfSize(size).then((labs) => {
        labyrinths = labs;
        displayService.fillSelectLabyrinth(Object.keys(labyrinths));
        displayService.htmlElements.choixLabyrinthe!.dispatchEvent(
            new Event("change")
        );
    });
}

function onSelectLabyrinthChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    const labyrinthe = labyrinths[target.value];
    onClickResetButton();
    selectedLabyrinth = labyrinthe;
    displayService.populateSquaresHTMLMap(labyrinthe.squares);
    displayService.displayLabyrinth(labyrinthe);
    const graphMapper = new GraphMapper();
    graphMapper.mapLabyrinthToGraph(selectedLabyrinth);
}

function onClickBFS($event: Event) {
    if (selectedLabyrinth) {
        onClickResetButton();
        labyrinthSolver.BFS(selectedLabyrinth)?.forEach((square) => {
            const squareElement = displayService.squaresHTMLMap[square.getId()];
            if (
                !squareElement.classList.contains("exit") &&
                !squareElement.classList.contains("entrance")
            ) {
                squareElement.classList.add("solution");
            }
        });
    }
}
function onClickDFS($event: Event) {
    if (selectedLabyrinth) {
        onClickResetButton();
        labyrinthSolver.DFS(selectedLabyrinth)?.forEach((square) => {
            const squareElement = displayService.squaresHTMLMap[square.getId()];
            if (
                !squareElement.classList.contains("exit") &&
                !squareElement.classList.contains("entrance")
            ) {
                squareElement.classList.add("solution");
            }
        });
    }
}
function onCheckboxChange($event: Event) {
    settingsService.settings.debug = (
        $event.target as HTMLInputElement
    ).checked;
}
function onToggleThemeButton($event: Event) {
    const theme = styleService.getNextTheme();
    document.body.classList.value = theme;
}
// Change background color of the clicked case
function onSquareClick($event: Event) {
    const target = $event.target as HTMLElement;
    target.classList.toggle("red");
}

function init() {
    // Init dom elements
    displayService.htmlElements.selectSize!.addEventListener(
        "change",
        onSelectSizeChange
    );
    displayService.htmlElements.choixLabyrinthe!.addEventListener(
        "change",
        onSelectLabyrinthChange
    );
    displayService.htmlElements.runBFSButton!.addEventListener(
        "click",
        onClickBFS
    );
    displayService.htmlElements.runDFSButton!.addEventListener(
        "click",
        onClickDFS
    );
    displayService.htmlElements.debugCheckbox!.addEventListener(
        "change",
        onCheckboxChange
    );
    displayService.htmlElements.resetButton!.addEventListener(
        "click",
        onClickResetButton
    );
    displayService.htmlElements.toggleThemeButton!.addEventListener(
        "click",
        onToggleThemeButton
    );
    
    displayService.fillSelectSize(labyrinthService.getAvailableSizes());
    displayService.htmlElements.selectSize!.dispatchEvent(new Event("change"));
}

init();
