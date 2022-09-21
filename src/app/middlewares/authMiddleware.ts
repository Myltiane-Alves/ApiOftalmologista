import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return next();
}