import { z } from 'zod';

export const statusEnum = z.enum(['todo', 'in_progress', 'done']);

export const createTaskSchema = z.object({
  title: z.string().min(4, 'Title must be at least 4 characters long').max(255),
  description: z.string().max(255).optional(),
  status: statusEnum.optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;