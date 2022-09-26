import { AppDataSource } from "../../config/database";
import { Contact } from "../entities/Contact";

export const contactRepository = AppDataSource.getRepository(Contact);