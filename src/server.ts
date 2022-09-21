import "reflect-metadata"
import App from "./app";

const app = new App().server;
app.listen(6001, () => console.log("Server running "));