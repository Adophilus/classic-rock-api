import SongController from "@/controllers/song";
import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { Logger } from "tslog";
import Database from "@/config/sequelize"
import APIError from "./utils/api-error";
import { NextFunction, Request, Response } from "express";
import { Sequelize } from 'sequelize-typescript'

export default class AppServer extends Server {
  private readonly logger = new Logger<ILogMessage>({ name: "ClassicRock" });
  private db!: Sequelize;

  constructor() {
    super();

    this.init();
    this.setupMiddleWare();
    this.setupControllers();
    this.setupErrorHandler();
  }

  public setupMiddleWare() {
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public setupControllers() {
    const props = {
      logger: this.logger.getSubLogger({ name: "controller" }),
    };
    super.addControllers([new SongController(props)]);
  }

  public setupErrorHandler() {
    this.app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (!(err instanceof APIError))
        return next(err)
      this.logger.error(err)
      return res.status(err.statusCode).json(err)
    })
  }

  public async init() {
    this.db = Database.init(this.logger.getSubLogger({ name: "database" }))
    await this.db.authenticate()
    await this.db.sync()
  }

  public async start(port: number) {
    try {
      this.init()
      this.app.listen(port, () => {
        this.logger.info(`Server started on port ${port}`);
      });
    } catch (err) {
      this.logger.fatal(err)
    }
  }
}

export const { app } = new AppServer();
