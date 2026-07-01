import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    status: number;
    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal server error' });
}