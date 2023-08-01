import { Case } from "../model/Case";

export class CssMapper{

    getClassesFromCase(case_: Case): string {
        const classes: string[] = [];
        classes.push(case_.walls.top ? "mur-haut" : "");
        classes.push(case_.walls.right ? "mur-droit" : "");
        classes.push(case_.walls.bottom ? "mur-bas" : "");
        classes.push(case_.walls.left ? "mur-gauche" : "");
        classes.push(case_.exit ? "sortie" : "");
        classes.push(case_.entrance ? "entree" : "");
        return classes.join(" ");
    }      

}