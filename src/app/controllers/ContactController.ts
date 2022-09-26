import { Request, Response } from "express";
import { contactRepository } from "../repositories/contactRepository";
class ContactController {
    
    async store(req: Request, res: Response) {
        const { name, email, phone, message  } = req.body;

        try {
            const newContact = contactRepository.create({
                name,
                email,
                phone,
                message,
            });
    
            await contactRepository.save(newContact);

            return res.status(201).json(newContact);
        } catch (error) {
            return res.status(500).json(error);
        }
        
    }

    async getAll(req: Request, res: Response) {
        
        const contacts = await contactRepository.find({
            select: ["id", "name", "email", "phone", "message"]   
        })

        return res.json(contacts);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await contactRepository.delete(id);
            return res.status(200).json({ message: "Contact deleted" });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new ContactController;