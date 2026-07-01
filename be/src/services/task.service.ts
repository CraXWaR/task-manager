import { pool } from '../config/db';
import { NotFoundError } from '../middlewares/errorHandler';
import { Task, Status } from '../types/task';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface GetTasksFilters {
    status?: Status;
    search?: string;
    sort?: 'asc' | 'desc';
}

interface CreateTaskInput {
    title: string;
    description?: string;
    status?: Status;
}

interface UpdateTaskInput {
    title?: string;
    description?: string;
    status?: Status;
}

export const taskService = {
    async findAll(filters: GetTasksFilters): Promise<Task[]> {
        let sql = 'SELECT * FROM tasks WHERE 1=1';
        const params: any[] = [];

        if (filters.status) {
            sql += ' AND status = ?';
            params.push(filters.status);
        }
        if (filters.search) {
            sql += ' AND title LIKE ?';
            params.push(`%${filters.search}%`);
        }
        sql += ` ORDER BY created_at ${filters.sort === 'asc' ? 'ASC' : 'DESC'}`;

        const [rows] = await pool.query<RowDataPacket[]>(sql, params);
        return rows as Task[];
    },

    async findById(id: number | string): Promise<Task> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tasks WHERE id = ?', [id]);
        if (rows.length === 0) throw new NotFoundError('Task not found');
        return rows[0] as Task;
    },

    async create(data: CreateTaskInput): Promise<Task> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
            [data.title, data.description ?? null, data.status ?? 'todo']
        );
        return this.findById(result.insertId);
    },

    async update(id: number | string, data: UpdateTaskInput): Promise<Task> {
        const current = await this.findById(id);

        await pool.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [
                data.title ?? current.title,
                data.description ?? current.description,
                data.status ?? current.status,
                id,
            ]
        );

        return this.findById(id);
    },

    async remove(id: number | string): Promise<void> {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows === 0) throw new NotFoundError('Task not found');
    },
};