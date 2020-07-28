import { Application, Request, Response } from "express";
import { Data, TableData, Year } from "../model";
import * as util from "../util/util";

export class TableRoutes {
  constructor(server: Application, data: Data) {
    this.returnRoutes(server, data);
  }

  returnRoutes(server: Application, data: Data) {
    server.get("/table", (req, res) => this.generateTable(req, res, data));
  }

  generateTable(req: Request, res: Response, data: Data) {
    const { year = util.getCurrentYear() } = req.query;
    const currentYear = data[year as string];
    const months = Object.keys(currentYear);
    const categories = Object.keys(currentYear[months[0]]);

    const formattedData = this.formatDataByCategory(currentYear, months, categories);
    const filtered = this.filterCategories(formattedData);

    return res.status(200).json(filtered);
  }

  formatDataByCategory(currentYear: Year, months: string[], categories: string[]): TableData {
    const allCategories: TableData = {};
    months.forEach(month => {
      categories.map(category => {
        Object.keys(currentYear[month][category])
          .map(entry => {
            const key = `${category}-${entry}`;
            const value = currentYear[month][category][entry];
            allCategories[key] ? allCategories[key].push(value) : allCategories[key] = [value];
          });
      });
    });
    return allCategories;
  }

  filterCategories(data: TableData): TableData {
    return Object.keys(data)
      .filter(key => data[key].some(Boolean))
      .reduce((previousResult, key) => ({ ...previousResult, [key]: data[key] }), {});
  }
}
