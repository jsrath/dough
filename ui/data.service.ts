import { DataType } from "./model";
import * as d3 from "d3";
import "regenerator-runtime/runtime";
import { EndpointConfigService } from "./endpoint-config.service";

export class DataService {
  dates: string[];
  properties: string[];
  enpointConfigService: EndpointConfigService;
  baseEndpoint: string;

  constructor(dates?: string[], properties?: string[]) {
    this.dates = dates;
    this.properties = properties;
    this.enpointConfigService = new EndpointConfigService();
    this.baseEndpoint = this.enpointConfigService.getBaseEndpoint(true);
  }

  async fetchVisualData() {
    const data: DataType[] = await d3.json(`${this.baseEndpoint}/visual?startYear=${this.dates[0]}&endYear=${this.dates[1]}&properties=${this.properties}`);
    return data;
  }

  async fetchTableData() {
    const url = `${this.baseEndpoint}/table?year=2020`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  async fetchDataYears() {
    const url = `${this.baseEndpoint}/years`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

}