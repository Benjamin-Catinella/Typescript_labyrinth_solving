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

const jsonMapper = new JsonMapper();

const htmlElements = {
  tableau: document.getElementById("tableauLabyrinthe"),
};

const labyrintheElementsTemplates = {
  case: '<td class="case %class%"></td>',
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


function getJsonDataFromAPI(): Promise<any> {
  return fetch("http://localhost:3000/15")
    .then((response) => response.json())
    .then((json) => json);
}

function main() {
  const data = getJsonDataFromAPI();
  data.then((json) => {
    const labyrinthe = jsonMapper.toLabyrinthe(json["ex-0"], 15);
    displayLabyrinthe(labyrinthe);
  });
}

main();
