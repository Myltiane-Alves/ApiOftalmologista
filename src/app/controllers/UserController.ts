import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

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
}

export default new UserController;