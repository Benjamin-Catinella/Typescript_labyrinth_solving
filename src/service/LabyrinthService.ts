import { JsonMapper } from "../mapping/JsonMapper";
import { Labyrinth } from "../model/Labyrinth";
import { Logger } from "../utils/Logger";
export class LabyrinthService {
  private static instance: LabyrinthService;
  private readonly jsonMapper: JsonMapper;

  public static getInstance(): LabyrinthService {
    if (!LabyrinthService.instance) {
      LabyrinthService.instance = new LabyrinthService();
    }
    return LabyrinthService.instance;
  }

  private constructor() {
    this.jsonMapper = JsonMapper.getInstance();
  }
    

  private async getListOfLabyrinthsOfSizeFromAPI(size: number): Promise<any> {
    const url = `http://localhost:3000/${size}`;
    return fetch(url).then((response) => response.json());
  }

  private getListOfLabyrinthsOfSizeFromFile(size: number): any {
    return require(`../../data/labyrinths.json`)[size.toString()];
  }

  public getAvailableSizes(): number[] {
    const number = Object.keys(require(`../../data/labyrinths.json`)).map((size) => parseInt(size));
    Logger.debug(`Available sizes: ${number}`);
    return number;
  }

  public async getAllLabyrinthsOfSize(size: number): Promise<{[key: string]: Labyrinth;}> {
    const json = await this.getListOfLabyrinthsOfSizeFromFile(size);
    const labyrinthes: {[key: string]: Labyrinth;} = {};
    for (const key in json) {
      labyrinthes[key] = this.jsonMapper.toLabyrinth(json[key], size, key);
    }
    return labyrinthes;
  }

}

