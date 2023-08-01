/**
 * Projet de parcours de labyrinthes
 */

import { Labyrinthe } from "./model/Labyrinthe";
import { LabyrintheService } from "./service/LabyrintheService";
import { CssMapper } from "./mapping/CssMapper";
import { NodeCaseMapper } from './mapping/NodeCaseMapper';
import { Case } from "./model/Case";
import { Logger } from "./utils/Logger";

// Services

const labyrintheService = new LabyrintheService();
const cssMapper = new CssMapper();
const nodeCaseMapper = new NodeCaseMapper();

// Variables

let labyrinthes : {[key: string]: Labyrinthe;};

// Constants

const htmlElements = {
  tableau: document.getElementById("tableauLabyrinthe"),
  selectTaille: document.getElementById("tailleLabyrinthe"),
  choixLabyrinthe: document.getElementById("choixLabyrinthe"),
};

const casesHTMLMap : {[key: string]: HTMLElement;} = {};

// Dom manipulation functions

function displayLabyrinthe(labyrinthe: Labyrinthe) {
  const size = labyrinthe.size;
  const cases = labyrinthe.cases;
  // Empty the table
  htmlElements.tableau!.innerHTML = "";
  for (let i = 0; i < size.height; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size.width; j++) {
      const index = i * size.width + j;
      const case_ = cases[index];
      row.appendChild(casesHTMLMap[case_.getId()]);
    }
    htmlElements.tableau!.appendChild(row);
  }
}
function fillSelectLabyrinthe() {
  htmlElements.choixLabyrinthe!.innerHTML = "";
  const keys = Object.keys(labyrinthes);
  keys.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.innerText = key;
    htmlElements.choixLabyrinthe!.appendChild(option);
  });
}

function populateCasesHTMLMap(cases: Case[]) {
  Logger.log("Populating casesHTMLMap ...")
  cases.forEach((case_) => {
    const caseElement = document.createElement("td");
    caseElement.id = case_.getId();
    caseElement.classList.add("case");
    caseElement.classList.add("box");
    // caseElement.addEventListener("click", onCaseClick);
    cssMapper.getClassesFromCase(case_).forEach((cssClass) => {
      cssClass != "" ? caseElement.classList.add(cssClass) : null;
    });
    Logger.log("Adding caseElement", caseElement, "to casesHTMLMap")
    casesHTMLMap[case_.getId()] = caseElement;
  });
  Logger.log("Finished populating caseHTMLMap : ", casesHTMLMap);
}
// Event handlers

function onSelectTailleChange($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const size = parseInt(target.value);
  labyrintheService.getAllLabyrinthesOfSize(size).then((labs) => {
    Logger.info("Labyrinthes", labs);
    labyrinthes = labs;
    fillSelectLabyrinthe();
    htmlElements.choixLabyrinthe!.dispatchEvent(new Event("change"));
  });
}

function onSelectLabyrintheChange($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const labyrinthe = labyrinthes[target.value];
  populateCasesHTMLMap(labyrinthe.cases);
  displayLabyrinthe(labyrinthe);
}

function treeSolver() {
  /**
   * Convertir le labyrinth en graphe
   * Partir de la première node
   * Si la node est la sortie, finir et remonter nombre de pas 
   * Si la node a déjà été visitée, remonter 0
   * Si la node est un cul de sac, remonter 0
   * Passer à la node suivante
   */

}
function treeSolverRecursive() {

}
// Change background color of the clicked case
function onCaseClick($event: Event) {
  const target = $event.target as HTMLElement;
  target.classList.toggle("red");
}

async function main() {
  const sizes = 25;
  htmlElements.selectTaille!.addEventListener("change", onSelectTailleChange);
  // Trigger the event (select size 3 by default)
  htmlElements.choixLabyrinthe!.addEventListener("change", onSelectLabyrintheChange);
  for (let i = 2; i < sizes; i++) {
    const option = document.createElement("option");
    option.value = (i + 1).toString();
    option.innerText = (i + 1).toString();
    htmlElements.selectTaille!.appendChild(option);
  }
  htmlElements.selectTaille!.dispatchEvent(new Event("change"));
}


main();
