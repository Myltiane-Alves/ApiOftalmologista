import { AppDataSource } from "../../config/database";
import { Schedule } from "../entities/Schedule";

export const scheduleRepository = AppDataSource.getRepository(Schedule);