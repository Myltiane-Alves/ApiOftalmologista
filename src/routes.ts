import { Router } from "express";

class Routes {
    routes: Router;
    constructor() {
        this.routes = Router();
        this.init();
    }

    init() {
        
    }
}

export default new Routes().routes;