import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthenticateController {

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(404).json({ message: "Email or password is required" });
        }

        const user = await userRepository.findOne({
            where: { email }
        })

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, "secret", {
            expiresIn: "1d"
        });

        return res.json({ user, token });

    }

    async verify(req: Request, res: Response) {
        
        try {
            await this.getByEmail(req, res, ); 
            return res.status(200).json({ message: "Email already exists" });
        } catch {
            return res.status(404).json({ message: "Email not found" });
        }

    }

    async getByEmail(req: Request, res: Response, ) {

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
}

export default new AuthenticateController;