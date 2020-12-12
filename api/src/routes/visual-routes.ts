import { Application, Request, Response } from "express";
import { Category, CategoryType, Data, Total, VisualData } from "../models/api-model";
import * as util from "../util/util";

export class VisualRoutes {

  constructor(server: Application, data: Data) {
    this.returnRoutes(server, data);
  }

  private returnRoutes(server: Application, data: Data) {
    server.get("/visual", (request, response) => this.visualGraph(request, response, data));
    server.get("/visual/:year", (request, response) => response.status(200).json(data[request.params.year]));
    server.get("/properties", (request, response) => this.propertiesList(request, response, data));
    server.get("/years", (request, response) => this.getDataYears(response, data));
  }

  private visualGraph(request: Request, response: Response, data: Data): Response {
    const { startYear = util.getCurrentYear(), endYear = startYear, properties } = request.query;
    const propertiesGroup = (properties as string)?.split(",") ?? [];
    const years = this.filterYearRange(data, startYear as string, endYear as string);
    const yearsRange = this.filterProperties(data, years) as Data;
    return response.status(200).json(this.filterResponse(yearsRange, propertiesGroup));
  }

  private propertiesList(request: Request, response: Response, data: Data): Response {
    const { startYear = util.getCurrentYear(), endYear = startYear, category = CategoryType.Assets } = request.query;
    const years = this.filterYearRange(data, startYear as string, endYear as string);
    const filteredProperties = this.getAllProperties(data, years, category as CategoryType);
    return response.status(200).json(filteredProperties);
  }

  private filterResponse(yearsRange: Data, propertiesGroup: string[], category: CategoryType = CategoryType.Assets): VisualData[] {
    return Object.keys(yearsRange)
      .flatMap((year => Object.keys(yearsRange[year])
        .map(month => ({
          date: `${year}-${month}-01`,
          ...this.filterProperties(yearsRange[year][month][category], propertiesGroup)
        }))
      )).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  }

  private getAllProperties(data: Data, yearsRange: string[], category: CategoryType): string[] {
    return [...new Set(
      yearsRange.flatMap(year => Object.keys(data[year]).flatMap(month => Object.keys(data[year][month][category])))
    )];
  }

  private filterProperties(data: Data | Category, filterKeys: string[]): Data | VisualData | Total {
    return filterKeys.length
      ? filterKeys.reduce((result, key) => ({ ...result, [key]: data[key] }), {})
      : { total: Math.round(Object.values(data).reduce((prev, curr) => Number(prev) + Number(curr)) as number) };
  }

  private filterYearRange(data: Data, startYear: string, endYear: string): string[] {
    return Object.keys(data)
      .filter(year => Number(year) >= Number(startYear) && Number(year) <= Number(endYear));
  }

  private getDataYears(response: Response, data: Data): Response<string[]> {
    const years = Object.keys(data);
    return response.status(200).json(years);
  }
}