import { DataType } from "../models/model";
import * as d3 from "d3";
import "regenerator-runtime/runtime";
import { EndpointConfigService } from "./endpoint-config.service";

export class DataService {
  dates: string[];
  properties: string[];
  enpointConfigService: EndpointConfigService;
  baseEndpoint: string;
  currentYear = new Date().getFullYear().toString();

  constructor(dates?: string[], properties?: string[]) {
    this.dates = dates ?? this.setDefaultDates();
    this.properties = properties;
    this.enpointConfigService = new EndpointConfigService();
    this.baseEndpoint = this.enpointConfigService.getBaseEndpoint(true);
  }

  async fetchVisualData() {
    const data: DataType[] = await d3.json(`${this.baseEndpoint}/visual?startYear=${this.dates[0]}&endYear=${this.dates[1]}&properties=${this.properties}`);
    return data;
  }

  async fetchTableData() {
    return await this.fetchData(`table?year=${this.currentYear}`);
  }

  async fetchDataYears() {
    return await this.fetchData("years");
  }

  setDefaultDates(): string[] {
    return ["2013", this.currentYear];
  }

  async fetchProperties() {
    return await this.fetchData("properties");
  }

  async fetchData(endpoint: string) {
    const url = `${this.baseEndpoint}/${endpoint}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

}