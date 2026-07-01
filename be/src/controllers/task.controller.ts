import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';
import { z } from "zod";

export async function getTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const { status, search, sort } = req.query;
        const tasks = await taskService.findAll({
            status: status as any,
            search: search as string | undefined,
            sort: sort as 'asc' | 'desc' | undefined,
        });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
}

export async function getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await taskService.findById(Number(req.params.id));
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = createTaskSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: z.flattenError(parsed.error) });
        }
        const task = await taskService.create(parsed.data);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = updateTaskSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: z.flattenError(parsed.error) });
        }
        const task = await taskService.update(Number(req.params.id), parsed.data);
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        await taskService.remove(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}