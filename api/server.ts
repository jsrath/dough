import bodyParser from "body-parser";
import { config as dotEnvConfig } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { ConfigService } from "./config-service";
import { DataService } from "./data-service";
import { Data, Month, Year } from "./model";
import { Routes } from "./routes";

class DataServer {
  dataService = new DataService();
  config = new ConfigService();
  data: Data;
  port: number;
  server = express();

  constructor() {
    this.initializeServer();
  }

  initializeEnvironment() {
    dotEnvConfig();
    const { PORT, SOURCE } = process.env;
    this.port = Number(PORT);
    this.data = this.initializeData(SOURCE);
  }

  initializeData(source: string): Data {
    return this.config.useLocalData()
      ? this.dataService.fromLocalFile(source)
      : this.dataService.fromApi(source);
  }

  configureExpress() {
    this.server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
  }

  startServer() {
    this.server.listen(this.port, () => console.log(`Server is running on ${this.port}`));
  }

  configureRoutes(): Routes {
    return new Routes(this.server, this.data);
  }

  initializeServer() {
    this.initializeEnvironment();
    this.configureExpress();
    this.configureRoutes();
    this.startServer();
  }
}

const app = new DataServer();
