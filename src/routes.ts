import { Router } from "express";
import AuthenticateController from "./app/controllers/AuthenticateController";
import ContactController from "./app/controllers/ContactController";
import UserController from "./app/controllers/UserController";

class Routes {
    routes: Router;
    constructor() {
        this.routes = Router();
        this.init();
    }

    init() {
        this.routes.get("/ping", (req, res) => {
            res.status(200).json({ pong: new Date() });
        });

        this.routes.post('/login', AuthenticateController.login)
        this.routes.post('/verify', AuthenticateController.getByEmail);
        // this.routes.get('/email', AuthenticateController.getByEmail);


        this.routes.get('/users', UserController.getAll);
        this.routes.put('/users/resetPassword', UserController.resetPassword);
        this.routes.get('/users/:id', UserController.getById);
        this.routes.post('/users', UserController.store);
        this.routes.delete('/users/:id', UserController.delete);

        this.routes.post('/contacts', ContactController.store);
        this.routes.get('/contacts', ContactController.getAll);
        this.routes.delete('/contacts/:id', ContactController.delete);
    }

}

export default new Routes().routes;