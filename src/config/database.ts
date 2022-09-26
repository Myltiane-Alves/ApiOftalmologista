import 'dotenv/config';
import 'reflect-metadata';

import {  DataSource } from "typeorm";
import { Contact } from '../app/entities/Contact';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: Number("3306"),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    migrations: ["src/database/migrations/*.ts"],
    database: "oftalmologia",
    entities: [Contact],
    synchronize: true,
    logging: true,
    logger: "file",
    
})

