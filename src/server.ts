import "reflect-metadata"
import App from "./app";
import { AppDataSource } from "./config/database";

AppDataSource.initialize().then(() => {
const app = new App().server;
app.listen(6001, () => console.log("Server running "));


})