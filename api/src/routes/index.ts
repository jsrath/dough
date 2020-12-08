import { Application } from "express";
import { Category, CategoryProperty, CategoryType, Data } from "../models/api-model";
import { TableRoutes } from "./table-routes";
import { VisualRoutes } from "./visual-routes";

export class Routes {

  constructor(server: Application, data: Data) {
    this.calculateTotals(data);
    this.getRoutes(server, data);
  }

  private calculateTotals(data: Data) {
    const years = Object.keys(data);
    years.forEach(year => {
      const months = Object.keys(data[year]);
      this.getValuesFromMonths(data, months, year);
    });
  }

  private getValuesFromMonths(data: Data, months: (keyof Data)[], year: keyof Data) {
    months.forEach(month => {
      Object.values(CategoryType).forEach(category => {
        const categoryValues = data[year][month][category];
        categoryValues[CategoryProperty.Total] = this.sumValues(categoryValues);
      });
    });
  }

  private sumValues(category: Category): number {
    return Object.values(category).map(category => +category).reduce((sum, currentValue) => sum + currentValue);
  }

  private getRoutes(server: Application, data: Data) {
    const routes = [
      TableRoutes,
      VisualRoutes
    ];
    routes.forEach(route => new route(server, data));
  }

}
