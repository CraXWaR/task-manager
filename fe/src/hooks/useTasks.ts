import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/task.service';
import type { Task } from '../types/task';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const removeTask = async (id: number) => {
        try {
            await taskService.deleteTask(id);
            await loadTasks();
        } catch {
            setError('Failed to delete task');
        }
    };

    return { tasks, loading, error, removeTask, reload: loadTasks };
}