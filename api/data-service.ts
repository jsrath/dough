import * as fs from "fs";
import * as path from "path";
import { Data, Month, Year } from "./model";

export class DataService {

  fromLocalFile(file: string): Data {
    return JSON.parse(fs.readFileSync(`${path.resolve(__dirname, "../../data")}/${file}`, "utf-8"));
  }

  fromApi(url: string): Data {
    return;
  }
}
