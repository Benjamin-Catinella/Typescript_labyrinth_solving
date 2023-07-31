/**
 * Programme de génération et completion de labyrinthe
 *
 * Notes:
 *
 * Quelques idées pour le type de data structure à utiliser pour les cases du labyrinthe:
 *
 */

import { Case } from "./model/Case";
import { Labyrinthe } from "./model/Labyrinthe";
import { JsonMapper } from "./mapping/JsonMapper";
import { LabyrintheService } from "./service/LabyrintheService";

const labyrintheService = new LabyrintheService();
let labyrinthes : {[key: string]: Labyrinthe;};

const htmlElements = {
  tableau: document.getElementById("tableauLabyrinthe"),
  selectTaille: document.getElementById("tailleLabyrinthe"),
  choixLabyrinthe: document.getElementById("choixLabyrinthe"),
};

const labyrintheElementsTemplates = {
  case: '<td class="case box %class%"></td>',
};

function getClassesFromCase(case_: Case): string {
  const classes: string[] = [];
  classes.push(case_.walls.top ? "mur-haut" : "");
  classes.push(case_.walls.right ? "mur-droit" : "");
  classes.push(case_.walls.bottom ? "mur-bas" : "");
  classes.push(case_.walls.left ? "mur-gauche" : "");
  classes.push(case_.exit ? "sortie" : "");
  classes.push(case_.entrance ? "entree" : "");
  return classes.join(" ");
}

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
        getClassesFromCase(case_)
      );
    }
    html += "</tr>";
  }
  html += "</table>";
  htmlElements.tableau!.innerHTML = html;
}

function onSelectLabyrintheChange($event: Event) {

}


function onSelectTailleChange($event: Event) {
  const target = $event.target as HTMLSelectElement;
  const size = parseInt(target.value);
  labyrintheService.getAllLabyrinthesOfSize(size).then((labs) => {
    labyrinthes = labs;
    displayLabyrinthe(labyrinthes["ex-1"]);
  });
}

async function main() {
  const sizes = 25;
  htmlElements.selectTaille!.addEventListener("change", onSelectTailleChange);
  htmlElements.choixLabyrinthe!.addEventListener("change", onSelectLabyrintheChange);
  for (let i = 2; i < sizes; i++) {
    const option = document.createElement("option");
    option.value = (i + 1).toString();
    option.innerText = (i + 1).toString();
    htmlElements.selectTaille!.appendChild(option);
  }
  labyrintheService.getLabyrintheOfSize(25).then((labyrinthe) => {
    displayLabyrinthe(labyrinthe);
  });
}

main();
