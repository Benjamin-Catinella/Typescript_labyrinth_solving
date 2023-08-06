import { Square } from '../model/Square';
import { Labyrinth } from '../model/Labyrinth';
export class JsonMapper {

  private static instance: JsonMapper;

  public static getInstance(): JsonMapper {
    if (!JsonMapper.instance) {
      JsonMapper.instance = new JsonMapper();
    }
    return JsonMapper.instance;
  }

  public toLabyrinth(json: any, size: number, id: string) {
    const _size = {
      width: size,
      height: size,
    };
    const squares: Square[] = [];
    const entrances: Square[] = [];
    const exits: Square[] = [];
    for (let i = 0; i < json.length; i++) {
      const square = this.toSquare(json[i]);
      if(square.entrance) {
        entrances.push(square);
      }
      if(square.exit) {
        exits.push(square);
      }
      squares.push(square);
    }
    return new Labyrinth(id, _size, squares, entrances, exits);
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
