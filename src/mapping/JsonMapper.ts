import { Square } from '../model/Square';
import { Labyrinth } from '../model/Labyrinth';
export class JsonMapper {

  public toLabyrinth(json: any, size: number, id: string) {
    const _size = {
      width: size,
      height: size,
    };
    const cases: Square[] = [];
    for (let i = 0; i < json.length; i++) {
      cases.push(this.toSquare(json[i]));
    }
    return new Labyrinth(id, _size, cases);
  }

  toSquare(json: any) {
    const entrance = json.entrance ? true : false;
    const exit = json.exit ? true : false;
    const walls = {
      top: json.walls[0],
      right: json.walls[1],
      bottom: json.walls[2],
      left: json.walls[3],
    };
    return new Square(json.posX, json.posY, walls, exit, entrance);
  }
}
