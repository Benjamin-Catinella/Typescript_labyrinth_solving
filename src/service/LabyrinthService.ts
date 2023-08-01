import { JsonMapper } from "../mapping/JsonMapper";
import { Labyrinth } from "../model/Labyrinth";
export class LabyrinthService {
  jsonMapper = new JsonMapper();

  private async getListOfLabyrinthsOfSizeFromAPI(size: number): Promise<any> {
    const url = `http://localhost:3000/${size}`;
    return fetch(url).then((response) => response.json());
  }

  public async getLabyrinthOfSize(size: number): Promise<Labyrinth> {
    const json = await this.getListOfLabyrinthsOfSizeFromAPI(size);
    return this.jsonMapper.toLabyrinth(json["ex-0"], size);
  }

  public async getAllLabyrinthsOfSize(size: number): Promise<{[key: string]: Labyrinth;}> {
    const json = await this.getListOfLabyrinthsOfSizeFromAPI(size);
    const labyrinthes: {[key: string]: Labyrinth;} = {};
    for (const key in json) {
      labyrinthes[key] = this.jsonMapper.toLabyrinth(json[key], size);
    }
    return labyrinthes;
  }
}

