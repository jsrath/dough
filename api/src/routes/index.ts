import { Application } from "express";
import { Category, CategoryProperty, CategoryType, Data, Year } from "../models/api-model";
import { TableRoutes } from "./table-routes";
import { VisualRoutes } from "./visual-routes";

export class Routes {

  constructor(server: Application, private data: Data) {
    this.calculateTotals();
    this.getRoutes(server, this.data);
  }

  private calculateTotals() {
    const years = Object.keys(this.data);
    years.forEach(year => {
      const months = Object.keys(this.data[year]);
      this.getMonthlyTotals(months, year);
    });
  }

  private getMonthlyTotals(months: (keyof Year)[], year: keyof Data) {
    months.forEach(month => {
      Object.values(CategoryType).forEach(category => {
        const categoryValues = this.data[year][month][category];
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
