import {  ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions  = {
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ["./src/app/models/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    
}

export = connectionOptions;
