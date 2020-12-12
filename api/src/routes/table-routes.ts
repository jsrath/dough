import { Application, Request, Response } from "express";
import { Data, MonthsCategories, TableData, Year } from "../models/api-model";
import * as util from "../util/util";

export class TableRoutes {
  constructor(server: Application, data: Data) {
    this.returnRoutes(server, data);
  }

  private returnRoutes(server: Application, data: Data) {
    server.get("/table", (request, response) => this.generateTable(request, response, data));
  }

  private generateTable(request: Request, response: Response, data: Data) {
    const currentYear = data[util.processQueryParam(request.query.year, util.getCurrentYear)];
    const formattedData = this.formatDataByCategory(currentYear, this.extractMonthsAndCategories(currentYear));
    const filtered = this.filterCategories(formattedData);
    return response.status(200).json(filtered);
  }

  private extractMonthsAndCategories(currentYear: Year): MonthsCategories {
    const months = Object.keys(currentYear);
    const categories = Object.keys(currentYear[months[0]]);
    return { months, categories };
  }

  private formatDataByCategory(currentYear: Year, monthsCategories: MonthsCategories): TableData {
    const allCategories: TableData = {};
    monthsCategories.months.forEach(month => {
      monthsCategories.categories.map(category => {
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

  private filterCategories(data: TableData): TableData {
    return Object.keys(data)
      .filter(key => data[key].some(Boolean))
      .reduce((previousResult, key) => ({ ...previousResult, [key]: data[key] }), {});
  }
}
