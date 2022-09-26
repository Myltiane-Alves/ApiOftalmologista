import express from "express";
import routes from './routes'
import bodyParser from "body-parser";
import "../src/config/database";
import authMiddleware from "./app/middlewares/authMiddleware";
import { cors } from './app/middlewares/cors';

class App {
    server: express.Application;
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.server.use(routes);
    }

    middlewares() {
        this.server.use(cors)
        this.server.use(authMiddleware);
        this.server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
        this.server.use(bodyParser.json({ limit: "50mb" }))
    }
}

export default App;