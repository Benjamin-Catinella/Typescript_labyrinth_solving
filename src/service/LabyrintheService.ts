import { JsonMapper } from "../mapping/JsonMapper";
import { Labyrinthe } from "../model/Labyrinthe";
export class LabyrintheService {
  jsonMapper = new JsonMapper();

  private async getListOfLabyrintheOfSizeFromAPI(size: number): Promise<any> {
    const url = `http://localhost:3000/${size}`;
    return fetch(url).then((response) => response.json());
  }

  public async getLabyrintheOfSize(size: number): Promise<Labyrinthe> {
    const json = await this.getListOfLabyrintheOfSizeFromAPI(size);
    return this.jsonMapper.toLabyrinthe(json["ex-1"], size);
  }

  public async getAllLabyrinthesOfSize(size: number): Promise<{[key: string]: Labyrinthe;}> {
    const json = await this.getListOfLabyrintheOfSizeFromAPI(size);
    const labyrinthes: {[key: string]: Labyrinthe;} = {};
    for (const key in json) {
      labyrinthes[key] = this.jsonMapper.toLabyrinthe(json[key], size);
    }
    return labyrinthes;
  }
}

