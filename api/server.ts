import bodyParser from "body-parser";
import { config as dotEnvConfig } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { ConfigService } from "./config-service";
import { DataService } from "./data-service";
import { Data } from "./model";
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

  private initializeEnvironment() {
    dotEnvConfig();
    const { PORT, SOURCE } = process.env;
    this.port = Number(PORT);
    this.data = this.initializeData(SOURCE);
  }

  private initializeData(source: string): Data {
    return this.config.useLocalData()
      ? this.dataService.fromLocalFile(source)
      : this.dataService.fromApi(source);
  }

  private configureExpress() {
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
  }

  private startServer() {
    this.server.listen(this.port, () => console.log(`Server is running on ${this.port}`));
  }

  private configureRoutes(): Routes {
    return new Routes(this.server, this.data);
  }

  private initializeServer() {
    this.initializeEnvironment();
    this.configureExpress();
    this.configureRoutes();
    this.startServer();
  }
}

const dataServer = new DataServer();
