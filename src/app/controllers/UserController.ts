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

        const userExists = await userRepository.findOne({
            where: { email: req.body.email },
        });

        if(userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

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
                        
        } catch (error) {
            return res.status(500).json(error);
        }

        return res.status(201).json({ message: "User created" });
       
    }

    async getByEmail(req: Request, res: Response) {

        const user = await userRepository.findOne({
            where: { email: req.body.email },
            select: [
                "email"
            ]
        })

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.json({ message: "Email already exists" });
    }

    async verify(req: Request, res: Response) {
        
        try {
           const emailExist =  await userRepository.findOne({
                where: { email: req.body.email },
           }); 

              if(emailExist) {
                return res.status(409).json({ message: "Email already exists" });
              }
        } catch {
            return res.status(404).json({ message: "Email not found" });
        }

    }

    async checkPassword(req: Request, res: Response) {
        const user = await userRepository.findOne({
            where: { email: req.body.email },
            select: [
                "password"
            ]
        });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);

        if(!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Password is valid" });

    }

    async changePassword(req: Request, res: Response) {

        const user = await userRepository.findOne({
            where: { email: req.body.email },
            select: [
                "password"

            ]
        })

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let passwordHash = await bcrypt.hash(req.body.password, 8);
        let userUpdated = await userRepository.update(user.id, {
            password: passwordHash
        });

        return res.json(userUpdated);
       
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

    async getAll(req: Request, res: Response,) {
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