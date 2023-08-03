/**
 * Projet de parcours de labyrinthes
 */

import { Labyrinth } from "./model/Labyrinth";
import { LabyrinthService } from "./service/LabyrinthService";
import { CssMapper } from "./mapping/CssMapper";
import { Square } from "./model/Square";
import { Logger } from "./utils/Logger";
import { LabyrinthSolver } from "./algorithm/LabyrinthSolver";

// Services

const labyrinthService = new LabyrinthService();
const cssMapper = new CssMapper();
const labyrinthSolver: LabyrinthSolver = new LabyrinthSolver();

// Variables

let labyrinths: { [key: string]: Labyrinth };
let selectedLabyrinth: Labyrinth | undefined;
// Constants

const htmlElements = {
    table: document.getElementById("labyrinthTable"),
    selectSize: document.getElementById("sizeSelect"),
    choixLabyrinthe: document.getElementById("labyrinthSelect"),
    runBFSButton: document.getElementById("runBFS"),
    runDFSButton: document.getElementById("runDFS"),
    debugCheckbox: document.getElementById("debugCheckbox") as HTMLInputElement,
    resetButton: document.getElementById("resetButton"),
};

const squaresHTMLMap: { [key: string]: HTMLElement } = {};

// Dom manipulation functions

function displayLabyrinth(labyrinth: Labyrinth) {
    const size = labyrinth.size;
    const squares = labyrinth.squares;
    // Empty the table
    htmlElements.table!.innerHTML = "";
    for (let i = 0; i < size.height; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size.width; j++) {
            const index = i * size.width + j;
            const square = squares[index];
            row.appendChild(squaresHTMLMap[square.getId()]);
        }
        htmlElements.table!.appendChild(row);
    }
}
function fillSelectLabyrinth() {
    htmlElements.choixLabyrinthe!.innerHTML = "";
    const keys = Object.keys(labyrinths);
    keys.forEach((key) => {
        const option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        htmlElements.choixLabyrinthe!.appendChild(option);
    });
}
function resetLabyrinth() {
    selectedLabyrinth?.reset();
    const keys = Object.keys(squaresHTMLMap);
    keys.forEach((key) => {
        squaresHTMLMap[key].classList.remove("solution");
        squaresHTMLMap[key].classList.remove("purple");
        squaresHTMLMap[key].classList.remove("red");
        squaresHTMLMap[key].innerHTML = "";
    });
}
function populateSquaresHTMLMap(squares: Square[]) {
    Logger.log("Populating casesHTMLMap ...");
    squares.forEach((square) => {
        const squareElement = document.createElement("td");
        squareElement.id = square.getId();
        squareElement.classList.add("square");
        squareElement.classList.add("box");
        squareElement.addEventListener("click", onSquareClick);
        cssMapper.getClassesFromSquare(square).forEach((cssClass) => {
            cssClass != "" ? squareElement.classList.add(cssClass) : null;
        });
        Logger.log("Adding caseElement", squareElement, "to squaresHTMLMap");
        squaresHTMLMap[square.getId()] = squareElement;
    });
    Logger.log("Finished populating caseHTMLMap : ", squaresHTMLMap);
}
// Event handlers

function onSelectSizeChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    const size = parseInt(target.value);
    labyrinthService.getAllLabyrinthsOfSize(size).then((labs) => {
        labyrinths = labs;
        fillSelectLabyrinth();
        htmlElements.choixLabyrinthe!.dispatchEvent(new Event("change"));
    });
}

function onSelectLabyrinthChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    const labyrinthe = labyrinths[target.value];
    resetLabyrinth();
    selectedLabyrinth = labyrinthe;
    populateSquaresHTMLMap(labyrinthe.squares);
    displayLabyrinth(labyrinthe);
}

function onClickBFS($event: Event) {
    if (selectedLabyrinth) {
        resetLabyrinth();
        labyrinthSolver.BFS(selectedLabyrinth)?.forEach((square) => {
            const squareElement = squaresHTMLMap[square.getId()];
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
        resetLabyrinth();
        labyrinthSolver.DFS(selectedLabyrinth)?.forEach((square) => {
            const squareElement = squaresHTMLMap[square.getId()];
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
    labyrinthSolver.debug = ($event.target as HTMLInputElement).checked;
}
// Change background color of the clicked case
function onSquareClick($event: Event) {
    const target = $event.target as HTMLElement;
    target.classList.toggle("red");
}

async function init() {
    const sizes = 25;
    // Init dom elements
    htmlElements.selectSize!.addEventListener("change", onSelectSizeChange);
    htmlElements.choixLabyrinthe!.addEventListener(
        "change",
        onSelectLabyrinthChange
    );
    htmlElements.runBFSButton!.addEventListener("click", onClickBFS);
    htmlElements.runDFSButton!.addEventListener("click", onClickDFS);
    htmlElements.debugCheckbox!.addEventListener("change", onCheckboxChange);
    htmlElements.resetButton!.addEventListener("click", resetLabyrinth);
    for (let i = 2; i < sizes; i++) {
        const option = document.createElement("option");
        option.value = (i + 1).toString();
        option.innerText = (i + 1).toString();
        htmlElements.selectSize!.appendChild(option);
    }
    htmlElements.selectSize!.dispatchEvent(new Event("change"));
    labyrinthSolver.debug = htmlElements.debugCheckbox!.checked;
}

init();
