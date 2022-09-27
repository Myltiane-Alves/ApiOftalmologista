import { Request, Response } from "express";
import { AppDataSource } from "../../config/database";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
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
            where: { id: Number(req.params.id) }
        });

        if (!userUpdated) {
            return res.status(404).json({ message: "User not found" });
        }

        let data = req.body;

        await userRepository.update(req.params.id, data);

        return res.json(
            await userRepository.findOne({ where: { id: Number(req.params.id) } })
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

    
    async getById(req: Request, res: Response,) {
        const user = await userRepository.findOne({
            where: { id: Number(req.params.id) },
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

    async delete(req: Request, res: Response) {

        const user = await userRepository.findOne({
            where: { id: Number(req.params.id) }
        })

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userRepository.delete(user.id);

        return res.status(200).json({ message: "User deleted" });
    }

    async resetPassword(req: Request, res: Response) {
        let authSecret = 'redefinicaoSenha';
        let data = req.body;

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {
            let openToken = jwt.verify(data.token, authSecret);

            const { id } = openToken as TokenPayload;
            let user = await userRepository.findOne({
                where: { id: id }
            })
            
            if(!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let passwordHash = await bcrypt.hash(data.password.user_passwordHash, 8);
            let userUpdated = await userRepository.update(id, {
                password: passwordHash
            });


            await queryRunner.commitTransaction()

            return res.json(userUpdated);
        } catch (error) {
            await queryRunner.commitTransaction()
            return res.status(404).json({
                erro:"error ao atualizar senha"
            })
        } finally {
            await queryRunner.release()
        }
    }
}

export default new UserController;