import { Application } from "express";
import { Data } from "../model";
import { TableRoutes } from "./table-routes";
import { VisualRoutes } from "./visual-routes";

export class Routes {

  constructor(server: Application, data: Data) {
    this.getRoutes(server, data);
  }

  getRoutes(server: Application, data: Data) {
    const routes = [
      TableRoutes,
      VisualRoutes
    ];
    routes.forEach(route => new route(server, data));
  }

}
