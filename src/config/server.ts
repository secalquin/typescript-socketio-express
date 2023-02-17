import express, { Application } from "express";
import http from "http";
import { Server as WebSocketServer } from "socket.io";
import morgan from "morgan";
import Sockets from "./sockets";

type ServerConstructorType = {
  server_port: string | number;
};

class Server {
  private app: Application;
  private port: string | number;

  constructor({ server_port }: ServerConstructorType) {
    this.app = express();
    this.port = server_port;

    this.middlewares();
    this.logHttpMorgan();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private logHttpMorgan() {
    this.app.use(morgan("dev"));
  }

  start(callback: () => void) {
    const server = http.createServer(this.app);
    const httpServer = server.listen(this.port, callback);

    const io = new WebSocketServer(httpServer, {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
      },
    });
    Sockets(io);
  }
}

export default Server;
