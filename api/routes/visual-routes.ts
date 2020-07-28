import { Application, Request, Response } from "express";
import { Category, CategoryType, Data, Total, VisualData } from "../model";
import * as util from "../util/util";

export class VisualRoutes {

  constructor(server: Application, data: Data) {
    this.returnRoutes(server, data);
  }

  returnRoutes(server: Application, data: Data) {
    server.get("/visual", (req, res) => this.visualGraph(req, res, data));
    server.get("/visual/:year", (req, res) => res.status(200).json(data[req.params.year]));
    server.get("/properties", (req, res) => this.propertiesList(req, res, data));
  }

  visualGraph(req: Request, res: Response, data: Data): Response {
    const { startYear = util.getCurrentYear(), endYear = startYear, properties } = req.query;
    const propertiesGroup = (properties as string)?.split(",") ?? [];
    const years = this.filterYearRange(data, startYear as string, endYear as string);
    const yearsRange = this.filterProperties(data, years) as Data;
    return res.status(200).json(this.filterResponse(yearsRange, propertiesGroup));
  }

  propertiesList(req: Request, res: Response, data: Data): Response {
    const { startYear = util.getCurrentYear(), endYear = startYear, category = CategoryType.Assets } = req.query;
    const years = this.filterYearRange(data, startYear as string, endYear as string);
    const filteredProperties = this.getAllProperties(data, years, category as CategoryType);
    return res.status(200).json(filteredProperties);
  }

  filterResponse(yearsRange: Data, propertiesGroup: string[], category: CategoryType = CategoryType.Assets): VisualData[] {
    return Object.keys(yearsRange)
      .flatMap((year => Object.keys(yearsRange[year])
        .map(month => ({
          date: `${year}-${month}-01`,
          ...this.filterProperties(yearsRange[year][month][category], propertiesGroup)
        }))
      )).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  }

  getAllProperties(data: Data, yearsRange: string[], category: CategoryType): string[] {
    return [...new Set(
      yearsRange.flatMap(year => Object.keys(data[year]).flatMap(month => Object.keys(data[year][month][category])))
    )];
  }

  filterProperties(data: Data | Category, filterKeys: string[]): Data | VisualData | Total {
    return filterKeys.length
      ? filterKeys.reduce((result, key) => ({ ...result, [key]: data[key] }), {})
      : { total: Math.round(Object.values(data).reduce((prev, curr) => Number(prev) + Number(curr)) as number) };
  }

  filterYearRange(data: Data, startYear: string, endYear: string): string[] {
    return Object.keys(data)
      .filter(year => Number(year) >= Number(startYear) && Number(year) <= Number(endYear));
  }
}
