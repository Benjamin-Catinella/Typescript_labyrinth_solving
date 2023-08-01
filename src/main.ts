/**
 * Projet de parcours de labyrinthes
 */

import { Labyrinthe } from "./model/Labyrinthe";
import { LabyrintheService } from "./service/LabyrintheService";
import { CssMapper } from "./mapping/CssMapper";

// Services

const labyrintheService = new LabyrintheService();
const cssMapper = new CssMapper();

// Variables

let labyrinthes : {[key: string]: Labyrinthe;};

// Constants

const htmlElements = {
  tableau: document.getElementById("tableauLabyrinthe"),
  selectTaille: document.getElementById("tailleLabyrinthe"),
  choixLabyrinthe: document.getElementById("choixLabyrinthe"),
};

const labyrintheElementsTemplates = {
  case: '<td class="case box %class%"></td>',
};

// Dom manipulation functions

function displayLabyrinthe(labyrinthe: Labyrinthe) {
  const size = labyrinthe.size;
  const cases = labyrinthe.cases;
  let html = "<table>";
  for (let i = 0; i < size.height; i++) {
    html += "<tr>";
    for (let j = 0; j < size.width; j++) {
      const index = i * size.width + j;
      const case_ = cases[index];
      html += labyrintheElementsTemplates.case.replace(
        "%class%",
        cssMapper.getClassesFromCase(case_)
      );
    }
    html += "</tr>";
  }
  html += "</table>";
  htmlElements.tableau!.innerHTML = html;
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
  displayLabyrinthe(labyrinthes[keys[0]]);
}

// Event handlers

function onSelectTailleChange($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const size = parseInt(target.value);
  labyrintheService.getAllLabyrinthesOfSize(size).then((labs) => {
    labyrinthes = labs;
    fillSelectLabyrinthe();
  });
}function onSelectLabyrintheChange($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const labyrinthe = labyrinthes[target.value];
  displayLabyrinthe(labyrinthe);
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
  htmlElements.choixLabyrinthe!.dispatchEvent(new Event("change"));
}

main();
