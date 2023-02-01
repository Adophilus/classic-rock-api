import SongController from "@/controllers/song";
import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { Logger } from "tslog";
import Database from "@/config/sequelize"

export default class AppServer extends Server {
  private readonly logger = new Logger<ILogMessage>({ name: "ClassicRock" });

  constructor() {
    super();

    this.setupControllers();
  }

  public setupMiddleWare() {
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public setupControllers() {
    const props = {
      logger: this.logger.getSubLogger(),
    };
    super.addControllers([new SongController(props)]);
  }

  public async start(port: number) {
    try {
      const db = Database.init(this.logger.getSubLogger({ name: "database" }))
      await db.authenticate()
      await db.sync()
      this.app.listen(port, () => {
        this.logger.info(`Server started on port ${port}`);
      });
    } catch (err) {
      this.logger.fatal(err)
    }
  }
}

export const { app } = new AppServer();
