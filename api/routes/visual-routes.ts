import { Application, Request, Response } from "express";
import { Category, Data, VisualData, Year } from "../model";

export class VisualRoutes {

  constructor(server: Application, data: Data) {
    this.returnRoutes(server, data);
  }

  returnRoutes(server: Application, data: Data) {
    server.get("/visual", (req, res) => this.visualGraph(req, res, data));
    server.get("/visual/:year", (req, res) => res.status(200).json(data[req.params.year]));
  }

  visualGraph(req: Request, res: Response, data: Data): Response {
    const { startYear = this.getCurrentYear(), endYear = startYear, properties } = req.query;
    const propertiesGroup = (properties as string).split(",");
    const years = this.filterYearRange(data, (startYear) as string, (endYear) as string);
    const yearsRange = this.filterProperties(data, years) as Data;

    return res.status(200).json(this.filterResponse(yearsRange, propertiesGroup));
  }

  filterResponse(yearsRange: Data, propertiesGroup: string[]): VisualData[] {
    return Object.keys(yearsRange)
      .flatMap((year => Object.keys(yearsRange[year])
        .map(month => (
          {
            date: `${year}-${month}-01`, ...this.filterProperties(yearsRange[year][month].assets, propertiesGroup)
          }
        ))
      )).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  }

  getCurrentYear() {
    return new Date().getFullYear().toString();
  }

  filterProperties(data: Data | Category, filterKeys: string[]): Data | VisualData {
    return filterKeys.reduce((result, key) => ({ ...result, [key]: data[key] }), {});
  }

  filterYearRange(data: Data, startYear: string, endYear: string): string[] {
    return Object.keys(data)
      .filter(year => Number(year) >= Number(startYear) && Number(year) <= Number(endYear));
  }
}
