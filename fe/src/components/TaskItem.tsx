import { Link } from "react-router-dom";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
}

const statusLabels: Record<string, string> = {
  todo: "Pending",
  in_progress: "In Progress",
  done: "Filed",
};

export default function TaskItem({ task, onDelete }: Props) {
  const ticketNo = String(task.id).padStart(4, "0");
  const date = new Date(task.created_at);

  const formatted = `${date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })} · ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  return (
    <article className="ticket">
      <div className="ticket-head">
        <span className="ticket-no">No. {ticketNo}</span>
        <span className="ticket-date">Created on: {formatted}</span>
        <span className={`stamp stamp-${task.status}`}>
          {statusLabels[task.status]}
        </span>
      </div>

      <h3 className="ticket-title">{task.title}</h3>
      {task.description && <p className="ticket-desc">{task.description}</p>}

      <div className="ticket-tear" aria-hidden="true" />

      <div className="ticket-actions">
        <Link to={`/tasks/${task.id}/edit`} className="btn">
          Edit ticket
        </Link>
        <button className="btn-danger" onClick={() => onDelete(task.id)}>
          Void
        </button>
      </div>
    </article>
  );
}
