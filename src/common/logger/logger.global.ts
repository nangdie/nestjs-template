import { Request, Response } from 'express';

export function logger(req: Request, res: Response, next: Function) {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
};