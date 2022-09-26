import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

interface TokenPayload {
    id: number;
}

class UserController {

    async store(req: Request, res: Response) {
        const {
            name,
            cpf,
            cep,
            street,
            uf,
            city,
            district,
            state,
            email,
            phone,
            password
        } = req.body;

        try {
            const newUser = userRepository.create({
                name,
                cpf,
                cep,
                street,
                uf,
                city,
                district,
                state,
                email,
                phone,
                password
            });

            await userRepository.save(newUser);

            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updated(req: Request, res: Response) {

        const userUpdated = await userRepository.findOne({
            where: { id: req.params.id }
        });

        if (!userUpdated) {
            return res.status(404).json({ message: "User not found" });
        }

        let data = req.body;

        await userRepository.update(req.params.id, data);

        return res.json(
            await userRepository.findOne({ where: { id: req.params.id } })
        )
    }

    async getAll(req: Request, res: Response) {
        const users = await userRepository.find({
            select: [
                'id',
                'name',
                'cpf',
                'street',
                'uf',
                'city',
                'district',
                'state',
                'email',
                'phone',
            ]
        })
        return res.json(users);
    }

    async getById(req: Request, res: Response) {
        const user = await userRepository.findOne({
            where: { id: req.params.id },
            select: [
                'id',
                'name',
                'cpf',
                'street',
                'uf',
                'city',
                'district',
                'state',
                'email',
                'phone',

            ]
            
        })

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    }
}

export default new UserController;