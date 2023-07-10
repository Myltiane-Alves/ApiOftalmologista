import { Request, Response } from "express";
import { scheduleRepository } from "../repositories/scheduleRepository";

class ScheduleController {

    async store(req: Request, res: Response) {
        const  {
            name,
            service,
            email,
            phone,
            date,
            message
        } = req.body;
        
        try {

            const newSchedule = scheduleRepository.create({
                name,
                service,
                email,
                phone,
                date,
                message

            });

            await scheduleRepository.save(newSchedule);
        } catch (error) {
            return res.status(500).json(error);
        }

        return res.status(201).json({
            message: "Agendamento realizado com sucesso"
        });
    }

    async getByDate(req: Request, res: Response) {  
        const schedule = await scheduleRepository.findOne({
            where: { date: req.body.date },
            select: [
                "date"
            ]
        })
        return res.json(schedule);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        
        const schedule = await scheduleRepository.findOne({
            where: { id: Number(req.params.id) },
            select: [
                "id",
                "name",
                "email",
                "phone",
                "date",
                "message"
            ]
        })

        return res.json(schedule);
    }

    async getAll(req: Request, res: Response) {
        const schedules = await scheduleRepository.find();
        return res.json(schedules);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const schedule = await scheduleRepository.findOne({

            where: {id: Number(req.params.id) }
        });

        if(!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        await scheduleRepository.delete(id);

        return res.status(200).json({
            message: "Agendamento cancelado com sucesso"
        });
    }

}

export default new ScheduleController;