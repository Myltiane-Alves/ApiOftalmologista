import { Router } from "express";
import AuthenticateController from "./app/controllers/AuthenticateController";
import ContactController from "./app/controllers/ContactController";
import UserController from "./app/controllers/UserController";
import ScheduleController from "./app/controllers/ScheduleController";
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
        this.routes.post('/verify', UserController.getByEmail);
        // this.routes.get('/email', AuthenticateController.getByEmail);


        this.routes.get('/users', UserController.getAll);
        this.routes.put('/users/resetPassword', UserController.resetPassword);
        this.routes.get('/users/:id', UserController.getById);
        this.routes.post('/users', UserController.store);
        this.routes.delete('/users/:id', UserController.delete);

        this.routes.post('/contacts', ContactController.store);
        this.routes.get('/contacts', ContactController.getAll);
        this.routes.delete('/contacts/:id', ContactController.delete);

        this.routes.post('/schedules', ScheduleController.store);
        this.routes.get('/schedules', ScheduleController.getAll);
        this.routes.get('/schedules/:id', ScheduleController.getById);
        this.routes.get('/schedules/:date', ScheduleController.getByDate);
        this.routes.delete('/schedules/:id', ScheduleController.delete);

    }   

}

export default new Routes().routes;