import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onDelete }: Props) {
  if (tasks.length === 0)
    return (
      <div className="ticket-empty">
        <span className="ticket-empty-mark">—</span>
        <p>No tickets on the board.</p>
        <p className="ticket-empty-sub">File your first one to get started.</p>
      </div>
    );
  return (
    <div className="ticket-board">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}