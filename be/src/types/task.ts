export type Status = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
}