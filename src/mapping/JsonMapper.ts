import { Case } from '../model/Case';
import { Labyrinthe } from '../model/Labyrinthe';
export class JsonMapper {

  public toLabyrinthe(json: any, size: number) {
    const _size = {
      width: size,
      height: size,
    };
    const cases: Case[] = [];
    for (let i = 0; i < json.length; i++) {
      cases.push(this.toCase(json[i]));
    }
    return new Labyrinthe(_size, cases);
  }

  toCase(json: any) {
    const entrance = json.entrance ? true : false;
    const exit = json.exit ? true : false;
    const walls = {
      top: json.walls[0],
      right: json.walls[1],
      bottom: json.walls[2],
      left: json.walls[3],
    };
    return new Case(json.posX, json.posY, walls, exit, entrance);
  }
}
