import express, { Application, Request, Response } from "express";
import cors from "cors";
import routesFanClub from "../routes/fanClub";
import routesEventClub from "../routes/eventClub";
import db from "../db/connection";
import "../models/associations";
class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT as string;
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ msg: "API working" });
    });
    this.app.use("/api/fan-club", routesFanClub);
    this.app.use("/api/events", routesEventClub);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Database connected");
    } catch (error) {
      console.log(error);
      console.log("Error to connect database");
    }
  }
}

export default Server;
