import { Case } from '../model/Case';
import { NodeCase } from "../model/NodeCase";
import { Position } from '../model/Position';
import { Logger } from '../utils/Logger';

export class NodeCaseMapper{

    constructor(){}

    findAdjacentCasesTo(case_ : Case, casesList: Case[]) : Case[] {
        Logger.info(case_);
        Logger.info(casesList);
        // Trouver la case dans la liste par rapport à sa position (pas forcément, on s'en fout de sa position)
        // Définir la taille du tableau en prenant l'index maximal de chaque côtés (ou passer carrément la taille du labyrinthe)
        const labXLength = casesList.map((c) => c.posX).reduce((a, b) => Math.max(a, b)) + 1;
        const labYLength = casesList.map((c) => c.posY).reduce((a, b) => Math.max(a, b)) + 1;
        const offsets = {
            top : (((case_.posY+1) % labYLength) + labYLength) % labYLength,
            right : (((case_.posX+1) % labXLength) + labXLength) % labXLength,
            bottom : (((case_.posY-1) % labYLength) + labYLength) % labYLength,
            left : (((case_.posX-1) % labXLength) + labXLength) % labXLength
        }
        const positions ={
            top : new Position(case_.posX, offsets.top),
            bottom : new Position(case_.posX, offsets.bottom),
            right : new Position(offsets.right, case_.posY),
            left : new Position(offsets.left, case_.posY),
        }
        Logger.info(offsets);
        Logger.info(positions);
        // Trouver les cases ayant un index vertical et horizontal de +1 -1 % tailleDuTableau pour loop
        const adjacentCases: Case[] = casesList.filter((c) => {
            return (
                c.getPosition().equals(positions.top) ||
                c.getPosition().equals(positions.right) ||
                c.getPosition().equals(positions.bottom) ||
                c.getPosition().equals(positions.left)
            )
        });
        Logger.info('adjacentCases:',adjacentCases);

        // Retour
        return adjacentCases;
    }

    /* mapCasesToNodeCases(cases: Case[]): NodeCase[]{
        return;
    } */
}