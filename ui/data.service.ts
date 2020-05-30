import { DataType } from "./model"
import * as d3 from "d3";
import "regenerator-runtime/runtime"

export class DataService {
  dates: string[];
  properties: string[];

  constructor(dates: string[], properties: string[]) {
    this.dates = dates;
    this.properties = properties;
  }

  async fetchData() {
    const params = this.properties.join(",");
    const data: DataType[] = await d3.json(`http://localhost:4001/visual?startYear=${this.dates[0]}&endYear=${this.dates[1]}&properties=${params}`);
    return data;
  }

}