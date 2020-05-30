import { Application } from "express";
import { Data } from "../model";

export class TableRoutes {
  constructor(server: Application, data: Data) {
    this.returnRoutes(server, data);
  }

  returnRoutes(server: Application, data: Data): Application {
    return server.get("/tables", (req, res) => res.status(200).json(data));
  }
}
