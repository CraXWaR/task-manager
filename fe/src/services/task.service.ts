import type { Status, Task } from "../types/task";

const API_URL = 'http://localhost:3000/api/tasks';

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));

        if (typeof body.error === "string") {
            throw new Error(body.error);
        }

        if (body.error?.fieldErrors) {
            const message = Object.values(body.error.fieldErrors)
                .flat()
                .join("\n");

            throw new Error(message);
        }

        throw new Error(`Request failed with status ${res.status}`);
    }

    if (res.status === 204) return undefined as T;

    return res.json();
}

export const taskService = {
    getTasks: (): Promise<Task[]> =>
        fetch(API_URL).then(res => handleResponse<Task[]>(res)),

    getTask: (id: number): Promise<Task> =>
        fetch(`${API_URL}/${id}`).then(res => handleResponse<Task>(res)),

    createTask: (data: { title: string; description?: string; status?: Status }): Promise<Task> =>
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<Task>(res)),

    updateTask: (id: number, data: Partial<{ title: string; description: string; status: Status }>): Promise<Task> =>
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<Task>(res)),

    deleteTask: (id: number): Promise<void> =>
        fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(res => handleResponse<void>(res)),
};